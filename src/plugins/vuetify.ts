import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      light: {
        primary: '#036358',
        // secondary: colors.red.lighten4, // #FFCDD2
        // accent: colors.indigo.base, // #3F51B5
      },
    },
  },
  lang: {
    locales: {
      // eslint-disable-next-line
      pt: require('vuetify/lib/locale/pt').default,
    },
    current: 'pt',
  },
});
