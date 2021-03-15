<template>
  <section v-if="toy" class="details-container">
    <router-link to="/toy" class="back-btn">&#8592; Back</router-link>
    <div class="toy-details flex ">
      <img :src="require(`@/assets/imgs/${toy.img}`)" />
      <div class="details-info flex column justify-center">
        <h2>{{ toy.name }}</h2>
        <h4>{{ toy.price }}$</h4>
        <p>Type: {{ toy.type }}</p>
        <p>Created: {{ toy.createdAt | moment('from', 'now') }}</p>
        <p>{{ isInStock }}</p>
      </div>
    </div>

    <addReview @reviewSaved="saveReview" />
    <reviewList :reviews="toyReviews" @deleteReview="removeReview"/>
  </section>
</template>

<script>
import { toyService } from '../services/toy.service.js';
import addReview from '../cmps/addReview';
import reviewList from '../cmps/reviewList';

export default {
  name: 'toyDetails',
  data() {
    return {
      toy: null,
      toyReviews: null,
    };
  },
  computed: {
    isInStock() {
      return this.toy.inStock ? 'In Stock!' : 'Not in Stock';
    },
  },
  methods: {
    saveReview(review) {
        review.toyId = this.$route.params.toyId
        console.log('review in toydetails',review);
        this.$store.dispatch({type: 'addReview', review});
    },
    async loadReviews() {
      try {
        const id = this.$route.params.toyId;
        await this.$store.dispatch({
          type: 'loadReviews',
          filterBy: { toyId: id },
        });
        this.toyReviews = this.$store.getters.reviewsToShow;
      } catch (err) {
        console.log(err);
      }
    },
    removeReview(id) {
      this.$store.dispatch({type: 'removeReview', id});
    }
  },
  async created() {
    try {
    const id = this.$route.params.toyId;
    const toy = await toyService.getById(id)
    this.toy = toy;
    } catch(err) {
      console.log('could not get toy and reviews',err);
    }

  },
  mounted() {
    this.loadReviews();
  },
  components: {
    addReview,
    reviewList
  },
};
</script>
