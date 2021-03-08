import axios from 'axios';

const authModule = {
  state: () => ({
    user: {
      account: {
        id: undefined,
        email: undefined,
        creationDate: undefined,
        lastLogin: undefined,
        updateDate: undefined,
      },
      person: {
        id: undefined,
        name: undefined,
      },
    },
  }),
  mutations: {
    setUser: function (state, user) {
      state.user = user;
    },
  },
  actions: {
    getLoggedUser: async function ({ commit }) {
      try {
        const { data } = await axios({
          url: '/get-logged-user',
          baseURL: process.env.VUE_APP_REQUEST_BASE_URL,
          method: 'GET',
          responseType: 'json',
          withCredentials: true,
        });

        if (data && data.account && data.person) {
          commit('setUser', {
            account: data.account,
            person: data.person,
          });
        } else {
          commit('setUser', {
            account: {
              id: undefined,
              email: undefined,
              creationDate: undefined,
              lastLogin: undefined,
              updateDate: undefined,
            },
            person: {
              id: undefined,
              name: undefined,
            },
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  getters: {
    hasUser: function (state) {
      return !!(state.user && state.user.account.id);
    },
    getUser: function (state) {
      return state.user;
    },
  },
};

export default authModule;
