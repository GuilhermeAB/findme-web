<template>
  <v-card flat width='400'>
    <v-card-title>{{$t('WELCOME_BACK')}}</v-card-title>

    <v-card-text>
      <v-form v-model='formIsValid'>
        <v-text-field
          v-model='user.email'
          :rules='[rules.required]'
          :label='$t("EMAIL")'
        />
        <v-text-field
          v-model='user.password'
          :rules='[rules.required]'
          :type='showPassword ? "text" : "password"'
          :append-icon='showPassword ? "mdi-eye" : "mdi-eye-off"'
          :label='$t("PASSWORD")'
          @click:append='togglePasswordVisibility'
        />
      </v-form>

      <v-btn :disabled='!formIsValid' block color='primary' class='mt-3'>
        {{$t('SIGNIN')}}
      </v-btn>
    </v-card-text>

    <v-card-actions class='mt-5'>
      <v-container>
        <v-row>
          <v-divider />
        </v-row>
        <v-row justify='center' class='mt-3'>
          <span>
            {{$t('DONT_HAVE_AN_ACCOUNT')}}
            <v-btn text @click='toggleNewAccount'>
              {{$t('NEW_ACCOUNT')}}
            </v-btn>
          </span>
        </v-row>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    name: 'SignIn',
    data: function () {
      return {
        showPassword: false,
        rules: {
          required: (value) => !!value || this.$t('REQUIRED'),
        },
        formIsValid: true,
        user: {
          email: undefined,
          password: undefined,
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
    },
  };
</script>
