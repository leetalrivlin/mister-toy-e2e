import Vue from 'vue';
import Vuex from 'vuex';
import { toyService } from '../services/toy.service.js';
import { userService } from '../services/user.service.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    toys: [],
    filterBy: {},
    loggedInUser: {},
  },

  getters: {
    toys(state) {
      return state.toys;
    },
    loggedInUser(state) {
      return state.loggedInUser;
    },
  },

  mutations: {
    setToys(state, { toys }) {
      state.toys = toys;
    },
    setFilter(state, { filterBy }) {
      state.filterBy = filterBy;
    },
    setUser(state, { user }) {
      state.loggedInUser = user;
    },
    logoutUser(state, payload) {
      state.loggedInUser = null;
    },
    removeToy(state, { toyId }) {
      const idx = state.toys.findIndex((t) => t._id === toyId);
      state.toys.splice(idx, 1);
    },
    addToy(state, { toy }) {
      state.toys.push(toy);
    },
    updateToy(state, { toy }) {
      const idx = state.toys.findIndex((t) => t._id === toy._id);
      state.toys.splice(idx, 1, toy);
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
    async loadToys(context) {
      try {
        // toyService.query(context.state.filterBy)
        const toys = await toyService.query();
        context.commit({ type: 'setToys', toys });
      } catch (err) {
        console.log('Store: Cannot load Toys', err);
        throw new Error('Cannot load Toys');
      }
    },
    async removeToy({ commit }, payload) {
      try {
        // commit({type: 'userRemoveAction', payload})
        await toyService.remove(payload.toyId);
        commit({ type: 'removeToy', toyId: payload.toyId });
      } catch (err) {
        console.log('Store: Cannot remove toy', err);
        throw new Error('Cannot remove toy');
      }
    },
    async saveToy({ commit }, { toy }) {
      console.log('toy in saveToy store:', toy);
      try {
        // commit({type: 'userSaveAction', todo})
        const type = toy._id ? 'updateToy' : 'addToy';
        const savedToy = await toyService.save(toy);
        commit({ type, toy: savedToy });
      } catch (err) {
        console.log('Store: Cannot save toy', err);
        throw new Error('Cannot save toy');
      }
    },
    async filterToy({ commit }, { filterBy }) {
      try {
        // toyService.query(filterBy)
        await toyService.query();
        commit({ type: 'setFilter', filterBy });
        commit({ type: 'setToys', toys });
      } catch (err) {
        console.log('Store: Cannot load Todos', err);
        throw new Error('Cannot load Todos');
      }
    },
  },
  modules: {},
});
