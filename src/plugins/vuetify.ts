import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
  },
  lang: {
    locales: {
      // eslint-disable-next-line
      pt: require('vuetify/lib/locale/pt').default,
    },
    current: 'pt',
  },
});
