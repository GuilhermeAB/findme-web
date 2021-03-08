<template>
  <v-app>
    <v-main>
      <v-container fluid class='pa-0'>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    mounted: function () {
      this.$store.dispatch('getLoggedUser');
    },
  };
</script>
