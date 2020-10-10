<template>
  <div>
    <v-btn text color='primary' @click='goToLogin'>
      {{$t('SIGNIN')}}
    </v-btn>
  </div>
</template>

<script>
  export default {
    name: 'AppBarSigninVue',
    methods: {
      goToLogin: function () {
        this.$router.push({ name: 'SignIn' });
      },
    },
  };
</script>
