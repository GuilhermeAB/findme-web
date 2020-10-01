<template>
  <v-container fluid class='pa-0'>
    <v-row>
      <v-col class='hidden-sm-and-down pa-0' md='6'>
        <v-card flat>
          <v-btn
            fab
            depressed
            small
            absolute
            color='primary'
            class='ma-5'
            style='z-index: 999'
            @click='goToHome'
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>

          <v-overlay
            absolute
            color='primary'
          />

          <v-img :max-height='imageMaxHeight' src='https://images.unsplash.com/photo-1546209228-9c8dc7680f87?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1901&q=80'>
            <template v-slot:placeholder>
              <v-row
                class='fill-height ma-0'
                align='center'
                justify='center'
              >
                <v-progress-circular
                  indeterminate
                  color='grey lighten-5'
                />
              </v-row>
            </template>
          </v-img>
        </v-card>
      </v-col>

      <v-col align-self='center' md='6'>
        <v-row align='center' justify='center'>
          <sign-in v-if='!isNewAccount' @toggle-new-account='toggleNewAccount' @signin-in-success='goToHome' />
          <sign-up v-else @toggle-new-account='toggleNewAccount' />
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Auth',
    components: {
      SignIn: () => import('./SignIn/SignIn.vue'),
      SignUp: () => import('./SignUp/SignUp.vue'),
    },
    data: function () {
      return {
        imageMaxHeight: window.innerHeight,
        isNewAccount: false,
      };
    },
    methods: {
      toggleNewAccount: function () {
        this.isNewAccount = !this.isNewAccount;
      },
      goToHome: function () {
        this.$router.replace({ name: 'Home' });
      },
    },
  };
</script>
