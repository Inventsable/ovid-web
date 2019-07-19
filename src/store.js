import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Hold data
    currentUser: null
  },
  mutations: {
    // Update state data
    SET_USER(state, user) {
      state.currentUser = user;
    },
    UNSET_USER(state) {
      state.currentUser = null;
    }
  },
  actions: {
    // Actions for mutations
    setUser({ commit }, user) {
      commit("SET_USER", user);
    },
    unsetUser({ commit }) {
      commit("UNSET_USER");
    }
  },
  getters: {
    currentUser: state => state.currentUser
  }
});
