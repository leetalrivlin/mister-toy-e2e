import Vue from 'vue';
import Vuex from 'vuex';
import { toyService } from '../services/toy.service.js';

Vue.use(Vuex);

export const toyStore = ({
  state: {
    toys: [],
    filterBy: {
      name: '',
      isInStock: 'all',
      type: 'all',
      sortBy: 'name',
    },
  },

  getters: {
    toys(state) {
      return state.toys;
    },
  },

  mutations: {
    setToys(state, { toys }) {
      state.toys = toys;
    },
    setFilter(state, { filterBy }) {
      state.filterBy = filterBy;
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
    async loadToys({commit, state}) {
      try {
        // toyService.query(context.state.filterBy)
        const toys = await toyService.query(state.filterBy);
        commit({ type: 'setToys', toys });
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
    // async filterToy({ commit }, { filterBy }) {
    //   try {
    //     // toyService.query(filterBy)
    //     await toyService.query();
    //     commit({ type: 'setFilter', filterBy });
    //     commit({ type: 'setToys', toys });
    //   } catch (err) {
    //     console.log('Store: Cannot load Toys', err);
    //     throw new Error('Cannot load Toys');
    //   }
    // },
  },
});
