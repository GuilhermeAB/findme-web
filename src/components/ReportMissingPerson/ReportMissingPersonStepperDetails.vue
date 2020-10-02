<template>
  <v-container>
    <v-row justify='center' align='center'>
      <v-col sm='12' md='8'>
        <v-form v-model='formIsValid'>
          <v-text-field
            v-model='person.name'
            :label='$t("NAME")'
            append-icon='mdi-account'
            clearable
            :rules='[rules.required]'
          />

          <v-menu
            ref='menuBirthDateRef'
            v-model='menuBirthDateModel'
            :close-on-content-click='false'
            transition='scale-transition'
            offset-y
            min-width='290px'
          >
            <template v-slot:activator='{ on, attrs }'>
              <v-text-field
                v-model='person.birthDate'
                :label='$t("BIRTH_DATE")'
                append-icon='mdi-calendar'
                readonly
                v-bind='attrs'
                :rules='[rules.required]'
                v-on='on'
              />
            </template>
            <v-date-picker
              ref='birthDatePickerRef'
              v-model='person.birthDate'
              :max='new Date().toISOString().substr(0, 10)'
              min='1930-01-01'
              @change='saveBirthDate'
            />
          </v-menu>

          <v-menu
            ref='menuDisappearanceDateRef'
            v-model='menuDisappearanceDateModel'
            :disabled='!person.birthDate'
            :close-on-content-click='false'
            transition='scale-transition'
            offset-y
            min-width='290px'
          >
            <template v-slot:activator='{ on, attrs }'>
              <v-text-field
                v-model='person.disappearanceDate'
                :label='$t("DISAPPEARANCE_DATE")'
                append-icon='mdi-calendar'
                :disabled='!person.birthDate'
                readonly
                v-bind='attrs'
                :rules='[rules.required]'
                v-on='on'
              />
            </template>
            <v-date-picker
              ref='disappearanceDatePickerRef'
              v-model='person.disappearanceDate'
              :disabled='!person.birthDate'
              :max='new Date().toISOString().substr(0, 10)'
              :min='person.birthDate ? person.birthDate : "1930-01-01"'
              @change='saveDisappearanceDate'
            />
          </v-menu>

          <v-select
            v-model='person.gender'
            :items='genderList'
            item-text='description'
            item-value='id'
            :label='$t("GENDER")'
            clearable
            :rules='[rules.required]'
          />

          <v-textarea
            v-model='person.details'
            outlined
            no-resize
            :label='$t("PERSON_DETAILS")'
            clearable
          />
        </v-form>

        <v-row justify='end' class='mr-0'>
          <v-btn :disabled='!formIsValid' depressed color='primary' @click='nextStep'>
            {{$t('NEXT')}}
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'ReportMissingPersonStepperDetails',
    data: function () {
      return {
        // Form (text-fields/textarea/select)
        formIsValid: true,
        // Menus - datePicker
        menuBirthDateModel: false,
        menuDisappearanceDateModel: false,
        // Person
        person: {
          name: undefined,
          birthDate: undefined,
          disappearanceDate: undefined,
          gender: undefined,
          details: undefined,
        },
        // Gender List => Select Box
        genderList: [],
        rules: {
          required: (value) => !!value || this.$t('REQUIRED'),
        },
      };
    },
    watch: {
      person: {
        handler: function () {
          this.$emit('change-details', this.person);
        },
        deep: true,
      },
      formIsValid: function () {
        this.$emit('changed-validation', this.formIsValid);
      },
      menuBirthDateModel: function (val) {
        // eslint-disable-next-line
        val && setTimeout(() => (this.$refs.birthDatePickerRef.activePicker = 'YEAR'));
      },
      menuDisappearanceDateModel: function (val) {
        // eslint-disable-next-line
        val && setTimeout(() => (this.$refs.menuDisappearanceDateRef.activePicker = 'YEAR'));
      },
    },
    mounted: function () {
      this.getGenderList();
    },
    methods: {
      saveBirthDate: function (date) {
        this.$refs.menuBirthDateRef.save(date);
      },
      saveDisappearanceDate: function (date) {
        this.$refs.menuDisappearanceDateRef.save(date);
      },
      getGenderList: async function () {
        try {
          const { data } = await axios({
            url: '/get-genders',
            baseURL: process.env.VUE_APP_REQUEST_BASE_URL,
            method: 'GET',
            responseType: 'json',
            withCredentials: true,
          });

          this.genderList = data.list;
        } catch (e) {
          console.log(e);
        }
      },
      nextStep: function () {
        this.$emit('next-step');
      },
    },
  };
</script>
