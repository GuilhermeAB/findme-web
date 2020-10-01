<template>
  <v-card flat width='400'>
    <v-card-title>{{$t('NEW_ACCOUNT')}}</v-card-title>

    <v-card-text>
      <v-form v-model='formIsValid'>
        <v-text-field
          v-model='user.name'
          :rules='[rules.required]'
          :label='$t("NAME")'
        />
        <v-text-field
          v-model='user.email'
          :rules='[rules.required]'
          :label='$t("EMAIL")'
        />
        <v-text-field
          v-model='user.password'
          type='password'
          :rules='[rules.required]'
          :label='$t("PASSWORD")'
        />
        <v-text-field
          v-model='user.confirmPassword'
          :rules='[rules.required, rules.passwordMatch]'
          type='password'
          :label='$t("CONFIRM_PASSWORD")'
        />
      </v-form>

      <v-btn :disabled='!formIsValid' block color='primary' class='mt-2' @click='signup'>
        {{$t('SIGNUP')}}
      </v-btn>
    </v-card-text>

    <v-card-actions class='mt-5'>
      <v-container>
        <v-row>
          <v-divider />
        </v-row>
        <v-row justify='center' class='mt-3'>
          <span>
            {{$t('ALREADY_HAVE_AN_ACCOUNT')}}
            <v-btn text @click='toggleNewAccount'>
              {{$t('SIGNIN')}}
            </v-btn>
          </span>
        </v-row>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'SignUp',
    data: function () {
      return {
        formIsValid: true,
        showPassword: false,
        rules: {
          required: (value) => !!value || this.$t('REQUIRED'),
          passwordMatch: (value) => (value === this.user.password) || this.$t('PASSWORDS_ENTERED_DO_NOT_MATCH'),
        },
        user: {
          name: undefined,
          email: undefined,
          password: undefined,
          confirmPassword: undefined,
        },
      };
    },
    methods: {
      toggleNewAccount: function () {
        this.$emit('toggle-new-account');
      },
      togglePasswordVisibility: function () {
        this.showPassword = !this.showPassword;
      },
      signup: async function () {
        try {
          await axios({
            url: '/register',
            baseURL: process.env.VUE_APP_REQUEST_BASE_URL,
            method: 'POST',
            responseType: 'json',
            data: {
              name: this.user.name,
              email: this.user.email,
              password: this.user.password,
              confirmPassword: this.user.confirmPassword,
            },
          });

          this.toggleNewAccount();
        } catch (e) {
          console.log(e);
        }
      },
    },
  };
</script>
