<template>
  <v-card>
    <v-app-bar flat color='primary'>
      <v-btn icon color='#fff' @click='close'>
        <v-icon>mdi-close</v-icon>
      </v-btn>

      <v-spacer />

      <v-btn depressed color='#fff' @click='save'>
        {{$t('SAVE')}}
      </v-btn>
    </v-app-bar>

    <v-container fluid class='pt-1'>
      <v-row>
        <v-col sm='12' md='6' justify='center' align='center' class='pt-1'>
          <v-container class='pt-1'>
            <v-row justify='center' align='center'>
              <v-col sm='12' md='10'>
                <v-avatar class='profile mb-3' size='200'>
                  <v-img :src='getRandomPersonImage' />
                </v-avatar>
                <v-row justify='center' align='center'>
                  <label class='caption'>Imagem randômica temporária (<a href='https://github.com/marak/Faker.js/' target='_blank'>Faker</a>)</label>
                </v-row>

                <v-text-field
                  v-model='person.name'
                  :label='$t("NAME")'
                  append-icon='mdi-account'
                  clearable
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
                />
              </v-col>
            </v-row>
          </v-container>
        </v-col>

        <v-col sm='12' md='6' class='pt-1'>
          <v-container class='pt-1'>
            <v-row justify='center' align='center'>
              <v-row>
                <v-alert dense dark color='success' width='100%' class='text-center mb-1'>
                  {{$t('LAST_SEEN_PLACE')}}
                </v-alert>

                <GmapMap
                  ref='mapRef'
                  :center='mapCenter'
                  :zoom='14'
                  map-type-id='roadmap'
                  :style='{ width: "100%", height: windowMaxHeight + "px" }'
                  @click='mapClick'
                >
                  <GmapMarker
                    v-for='(m, index) in markers'
                    :key='index'
                    :position='m.position'
                    :clickable='true'
                    :draggable='true'
                    @click='center=m.position'
                  />
                </GmapMap>
              </v-row>
            </v-row>
          </v-container>
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
    data: function () {
      return {
        person: {
          name: undefined,
          birthDate: undefined,
          disappearanceDate: undefined,
          gender: undefined,
          details: undefined,
        },
        menuBirthDateModel: false,
        menuDisappearanceDateModel: false,
        markers: [],
        center: undefined,
        windowMaxHeight: window.innerHeight - 170,
        mapCenter: { lat: -25.389391, lng: -49.238710 },
        genderList: [],
      };
    },
    watch: {
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
    computed: {
      getRandomPersonImage: function () {
        return faker.image.avatar();
      },
    },
    methods: {
      close: function () {
        this.$emit('close');
      },
      saveBirthDate: function (date) {
        this.$refs.menuBirthDateRef.save(date);
      },
      saveDisappearanceDate: function (date) {
        this.$refs.menuDisappearanceDateRef.save(date);
      },
      save: async function () {
        try {
          console.log(this.person);
          console.log(JSON.stringify(this.markers[0].position));

          try {
            await axios({
              url: '/save-missing-person',
              baseURL: process.env.VUE_APP_REQUEST_BASE_URL,
              method: 'POST',
              responseType: 'json',
              withCredentials: true,
              data: {
                name: this.person.name,
                birthDate: this.person.birthDate,
                disappearanceDate: this.person.disappearanceDate,
                genderId: this.person.gender,
                details: this.person.details,
                latLong: this.markers && this.markers[0] ? JSON.stringify(this.markers[0].position || '') : undefined,
              },
            });

            this.close();
          } catch (e) {
            console.log(e);
          }
        } catch (e) {
          console.log(e);
        }
      },
      mapClick: function (event) {
        this.mapCenter = event.latLng;
        this.markers[0] = { position: event.latLng };
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
    },
  };
</script>
