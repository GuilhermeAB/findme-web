import axios from 'axios';

const authModule = {
  state: () => ({
    list: [],
  }),
  mutations: {
    setMissingPersonList: function (state, list) {
      state.list = list;
    },
  },
  actions: {
    loadMissingPersonList: async function ({ commit }) {
      try {
        const { data } = await axios({
          url: '/get-all-missing-person',
          baseURL: process.env.VUE_APP_REQUEST_BASE_URL,
          method: 'GET',
          responseType: 'json',
        });

        commit('setMissingPersonList', data.list || []);
      } catch (e) {
        console.log(e);
      }
    },
  },
  getters: {
    getMissingPersonList: function (state) {
      return state.list;
    },
  },
};

export default authModule;
