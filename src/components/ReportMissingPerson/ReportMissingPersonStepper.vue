<template>
  <v-card>
    <v-app-bar flat>
      <v-btn icon color='primary' class='ml-5 mt-5' @click='close'>
        <v-icon>mdi-close</v-icon>
      </v-btn>

      <v-spacer />
    </v-app-bar>

    <v-container fluid class='pt-1'>
      <v-row justify='center' align='center'>
        <v-col sm='12' md='8' class='pt-1'>
          <v-stepper v-model='currentStep' alt-labels style='box-shadow: none'>
            <v-stepper-header style='box-shadow: none'>
              <v-stepper-step step='1' :editable='true'>
                <label class='text-center'>{{$t('PERSON_DETAILS')}}</label>
              </v-stepper-step>

              <v-divider />

              <v-stepper-step step='2' :editable='personDetailsIsValid'>
                <label class='text-center'>{{$t('PERSON_IMAGE')}}</label>
              </v-stepper-step>

              <v-divider />

              <v-stepper-step step='3' :editable='personImageIsValid'>
                <label class='text-center'>{{$t('LOCATION')}}</label>
              </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step='1'>
                <report-missing-person-stepper-details @next-step='nextStep' @change-details='changePersonDetails' />
              </v-stepper-content>

              <v-stepper-content step='2'>
                <report-missing-person-stepper-image @previous-step='previousStep' @next-step='nextStep' @image-change='changeImage' />
              </v-stepper-content>

              <v-stepper-content step='3'>
                <report-missing-person-stepper-location :marker-icon='fileObjectUrl' @previous-step='previousStep' @location-change='changeLocation' @save='save' />
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  import faker from 'faker';
  import axios from 'axios';

  export default {
    name: 'ReportMissingPersonDetails',
    components: {
      ReportMissingPersonStepperDetails: () => import('./ReportMissingPersonStepperDetails'),
      ReportMissingPersonStepperImage: () => import('./ReportMissingPersonStepperImage'),
      ReportMissingPersonStepperLocation: () => import('./ReportMissingPersonStepperLocation'),
    },
    data: function () {
      return {
        // Stepper
        currentStep: 1,
        // Person details
        person: {
          name: undefined,
          birthDate: undefined,
          disappearanceDate: undefined,
          gender: undefined,
          details: undefined,
        },
        personImage: undefined,
        location: undefined,
      };
    },
    computed: {
      getRandomPersonImage: function () {
        return faker.image.avatar();
      },
      personDetailsIsValid: function () {
        return !!(this.person && this.person.name && this.person.birthDate && this.person.disappearanceDate && this.person.gender);
      },
      personImageIsValid: function () {
        return !!this.personImage;
      },
      fileObjectUrl: function () {
        return this.personImage ? URL.createObjectURL(this.personImage) : undefined;
      },
    },
    methods: {
      close: function () {
        this.$emit('close');
      },
      nextStep: function () {
        if (this.currentStep < 3) {
          this.currentStep++;
        }
      },
      previousStep: function () {
        if (this.currentStep > 1) {
          this.currentStep--;
        }
      },
      changePersonDetails: function (value) {
        this.person = value;
      },
      changeImage: function (value) {
        this.personImage = value;
      },
      changeLocation: function (value) {
        this.location = value;
      },
      save: async function () {
        try {
          try {
            await axios({
              url: '/save-missing-person',
              baseURL: process.env.VUE_APP_REQUEST_BASE_URL,
              method: 'POST',
              responseType: 'json',
              withCredentials: true,
              data: this.personImage,
              params: {
                name: this.person.name,
                birthDate: this.person.birthDate,
                disappearanceDate: this.person.disappearanceDate,
                genderId: this.person.gender,
                details: this.person.details,
                latLong: JSON.stringify(this.location.position || ''),
              },
            });

            this.close();
            this.$store.dispatch('loadMissingPersonList');
          } catch (e) {
            console.log(e);
          }
        } catch (e) {
          console.log(e);
        }
      },
    },
  };
</script>
