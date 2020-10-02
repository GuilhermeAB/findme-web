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
      localStorage.setItem('user', JSON.stringify(user || ''));
      state.user = user;
    },
  },
  actions: {
    loadLocalStorageUser: function ({ commit }) {
      const user = localStorage.getItem('user');

      if (user && user.length) {
        commit('setUser', JSON.parse(user));
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
