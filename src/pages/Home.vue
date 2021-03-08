<template>
  <v-container fluid class='pa-0'>
    <v-app-bar fixed color='#fff' elevation='2' app>
      <v-avatar size='170'>
        <v-img :src='require("../assets/logo.svg")' />
      </v-avatar>
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
