<template>
  <v-container fluid>
    <v-app-bar dark color='primary' app>
      <label>LOGO</label>
      <v-spacer />
      <app-bar-sign-in />
    </v-app-bar>
    <report-missing-person />

    <dashboard-map />
  </v-container>
</template>

<script>
  export default {
    name: 'Home',
    components: {
      AppBarSignIn: () => import('../components/Core/AppBarSignin'),
      ReportMissingPerson: () => import('../components/ReportMissingPerson/ReportMissingPerson'),
      DashboardMap: () => import('../components/Dashboard/DashboardMap'),
    },
    methods: {
    },
  };
</script>
