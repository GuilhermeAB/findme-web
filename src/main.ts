import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import axios, { AxiosResponse, AxiosError } from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import i18n from './i18n';
import 'toastr/toastr.scss';
import { showError, showWarning, showSuccess } from './util/notification';

Vue.config.productionTip = false;

function handleRequestResponseMessages (messages: Record<string, any>): void {
  if (messages.errors) {
    messages.errors.forEach((m: string) => {
      showError({ message: m });
    });
  }
  if (messages.warnings) {
    messages.warnings.forEach((m: string) => {
      showWarning({ message: m });
    });
  }
  if (messages.informations) {
    messages.informations.forEach((m: string) => {
      showSuccess({ message: m });
    });
  }
}

axios.interceptors.response.use((response: AxiosResponse) => {
  if (response.data?.messages) {
    handleRequestResponseMessages(response.data.messages);
  }

  return response;
}, (error: AxiosError) => {
  if (error.response?.data?.messages) {
    handleRequestResponseMessages(error.response.data.messages);
  }
  throw new Error(error.message);
});

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
    libraries: 'places',
  },
  installComponents: true,
});

new Vue({
  router: router,
  store: store,
  vuetify: vuetify,
  i18n: i18n,

  // eslint-disable-next-line
  render: (h: any) => h(App)
}).$mount('#app');
