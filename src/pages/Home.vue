<template>
  <v-container fluid>
    <v-app-bar dark color='primary' app>
      <label>LOGO</label>
      <v-spacer />
      <app-bar-signin />
    </v-app-bar>
  </v-container>
</template>

<script>
  export default {
    name: 'Home',
    components: {
      AppBarSignin: () => import('../components/Core/AppBarSignin'),
    },
  };
</script>
