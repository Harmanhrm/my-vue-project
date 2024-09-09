import { createStore } from 'vuex';

export default createStore({
  state: {
    isAuthenticated: false,
    user: null,
    token: localStorage.getItem('token') || null,
  },
  mutations: {
    SET_AUTHENTICATED(state, payload) {
      state.isAuthenticated = true;
      state.user = payload.user;
      state.token = payload.token;
    },
    LOGOUT(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  actions: {
    loginUser({ commit }, payload) {
      commit('SET_AUTHENTICATED', payload);
    },
    logoutUser({ commit }) {
      commit('LOGOUT');
    },
  },
  getters: {
    isAuthenticated: state => !!state.token,
  },
});
