import Vue from 'vue';
import Vuex from 'vuex';
import { reviewService } from '../services/review.service.js';
import { toyStore } from './toy.store.js';
import { userStore } from './user.store.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    reviews: null,
  },

  getters: {
    reviewsToShow(state){
      return state.reviews;
    }
  },

  mutations: {
    setReviews(state, { reviews }) {
      state.reviews = reviews;
    },
    postReview(state, { review }) {
      state.reviews.push(review);
    },
    removeReview(state, { id }) {
      const idx = state.reviews.findIndex((rev) => rev._id === id);
      state.reviews.splice(idx, 1);
    },
  },

  actions: {
    async loadReviews({ commit }, { filterBy = {} }) {
      console.log('filterBy',filterBy);
      try {
        const reviews = await reviewService.query(filterBy);
        commit({ type: 'setReviews', reviews });
        console.log(reviews);
      } catch (err) {
        console.log('couldnt get reviews', err);
      }
    },
    async addReview({ commit }, { review }) {
      try {
        const savedReview = await reviewService.addReview(review);
        commit({ type: 'postReview', review: savedReview });
      } catch (err) {
        console.log('couldnt post review', err);
      }
    },
    async removeReview({ commit }, { id }) {
      try {
       const res = await reviewService.removeReview(id);
       console.log(res);
        commit({ type: 'removeReview', id });
      } catch (err) {
        console.log('cannot remove review', err);
      }
    },
  },
  modules: {
    toyStore,
    userStore,
  },
});
