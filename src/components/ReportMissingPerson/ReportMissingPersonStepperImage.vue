<template>
  <v-container>
    <v-row justify='center' align='center'>
      <v-col sm='12' md='8'>
        <v-row justify='center' class='mb-5'>
          <v-avatar size='200'>
            <v-img :src='personImage || dummyPersonImage' />
          </v-avatar>
        </v-row>

        <v-file-input
          v-model='file'
          outlined
          dense
          show-size
          counter
          :label='$t("SELECT_IMAGE")'
          accept='image/*'
          class='mt-5'
          :rules='[value => !value || value.size < 3000000 || "Tamanho da imagem não deve ultrapassar 3 MB!"]'
        />

        <v-row class='mr-0'>
          <v-col sm='12' md='6'>
            <v-btn depressed color='primary' @click='previousStep'>
              {{$t('PREVIOUS_STEP')}}
            </v-btn>
          </v-col>
          <v-col align='right' sm='12' md='6' class='pr-0'>
            <v-btn :disabled='!file' depressed color='primary' @click='nextStep'>
              {{$t('NEXT')}}
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import dummyPersonImage from '../../assets/dummy-person-image.jpg';

  export default {
    name: 'ReportMissingPersonStepperImage',
    data: function () {
      return {
        file: undefined,
        personImage: undefined,
        dummyPersonImage: dummyPersonImage,
      };
    },
    watch: {
      file: function () {
        this.personImage = this.file ? URL.createObjectURL(this.file) : undefined;

        this.$emit('image-change', this.file);
      },
    },
    methods: {
      nextStep: function () {
        this.$emit('next-step');
      },
      previousStep: function () {
        this.$emit('previous-step');
      },
    },
  };
</script>
