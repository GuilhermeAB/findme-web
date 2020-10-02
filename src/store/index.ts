import Vue from 'vue';
import Vuex from 'vuex';
import Auth from './modules/auth';
import MissingPerson from './modules/missingPerson';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: Auth,
    missingPerson: MissingPerson,
  },
});
