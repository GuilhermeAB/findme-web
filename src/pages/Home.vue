<template>
  <v-container fluid>
    <v-app-bar dark color='primary' app>
      <label>LOGO</label>
      <v-spacer />
      <app-bar-sign-in />
      <report-missing-person />
    </v-app-bar>
  </v-container>
</template>

<script>
  export default {
    name: 'Home',
    components: {
      AppBarSignIn: () => import('../components/Core/AppBarSignin'),
      ReportMissingPerson: () => import('../components/ReportMissingPerson/ReportMissingPerson'),
    },
    methods: {
    },
  };
</script>
