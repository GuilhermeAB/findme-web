<template>
  <div>
    <v-btn color='primary' @click='goToLogin'>
      Entrar
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
