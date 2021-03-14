import Vue from 'vue';
import Vuex from 'vuex';
import { userService } from '../services/user.service.js';

export const userStore =({
  state: {
    loggedInUser: {},
  },

  getters: {
    loggedInUser(state) {
      return state.loggedInUser;
    },
  },

  mutations: {
    setUser(state, { user }) {
        state.loggedInUser = user;
      },
    logoutUser(state, payload) {
      state.loggedInUser = null;
    },
  },

  actions: {
    async login({ commit }, { user }) {
      try {
        const loggedUser = await userService.login(user);
        commit({ type: 'setUser', user: loggedUser });
      } catch (err) {
        console.log('cannot login user', err);
      }
    },
    async signup({ commit }, { user }) {
      try {
        const signedUpUser = await userService.signup(user);
        commit({ type: 'setUser', user: signedUpUser });
      } catch (error) {
        commit({ type: 'setError', error });
      }
    },
    async logout({ commit }, payload) {
      try {
        await userService.logout();
        commit({ type: 'logoutUser' });
      } catch (err) {
        console.log('cannot logout', err);
      }
    },
  },
});
