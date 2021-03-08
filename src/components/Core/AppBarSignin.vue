<template>
  <div>
    <v-btn v-if='!hasUser' text color='primary' @click='goToLogin'>
      {{$t('SIGNIN')}}
    </v-btn>

    <div>
      <v-menu
        v-model='menu'
        :close-on-content-click='false'
        :nudge-width='200'
        offset-y
      >
        <template v-slot:activator='{ on, attrs }'>
          <v-btn
            icon
            v-bind='attrs'
            color='primary'
            v-on='on'
          >
            <v-icon>
              mdi-account
            </v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-list dense>
            <v-list-item>
              <v-list-item-avatar>
                <v-icon>
                  mdi-account
                </v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>
                  <v-tooltip bottom>
                    <template v-slot:activator='{ on }'>
                      <span v-on='on'>
                        {{getUser.person.name && getUser.person.name.split(' ')[0] && getUser.person.name.split(' ')[0].substr(0, 20)}}
                      </span>
                    </template>
                    <span>{{getUser.person.name}}</span>
                  </v-tooltip>
                </v-list-item-title>
                <v-list-item-subtitle>{{getUser.account.email}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider />

          <v-list dense class='pa-0'>
            <v-list-item @click='signOut'>
              <v-list-item-content>
                <v-list-item-title class='red--text'>
                  {{$t('SIGNOUT')}}
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-avatar>
                <v-icon color='error'>
                  mdi-logout
                </v-icon>
              </v-list-item-avatar>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'AppBarSigninVue',
    data: function () {
      return {
        menu: false,
      };
    },
    computed: {
      ...mapGetters([
        'hasUser',
        'getUser',
      ]),
    },
    methods: {
      goToLogin: function () {
        this.$router.push({ name: 'SignIn' });
      },
      signOut: function () {
      },
    },
  };
</script>
