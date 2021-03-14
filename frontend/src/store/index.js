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

  },

  mutations: {
    setReviews(state, { reviews }) {
      state.reviews = reviews;
    },
    postReview(state, { review }) {
      state.reviews.push(review);
    },
  },

  actions: {
    async loadReviews({ commit }, { filterBy }) {
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
  },
  modules: {
    toyStore,
    userStore,
  },
});
