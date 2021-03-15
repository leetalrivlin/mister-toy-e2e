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

    <el-button class="add-review-btn flex justify-center" @click="addReview = !addReview" type="primary" plain>Add review</el-button>
    <addReview v-if="addReview" @reviewSaved="saveReview" />
    <reviewList :reviews="toyReviews" @deleteReview="removeReview"/>
    <chatRoom v-if="isChatOn" :toy="toy" :user="user" @closeChat="isChatOn = false"></chatRoom>
      <el-button class="chat-btn" @click="isChatOn = true" size="default" v-else icon="el-icon-chat-dot-round" circle></el-button>
  </section>
</template>

<script>
import { toyService } from '../services/toy.service.js';
import addReview from '../cmps/addReview';
import reviewList from '../cmps/reviewList';
import chatRoom from '../cmps/chatRoom';

export default {
  name: 'toyDetails',
  data() {
    return {
      toy: null,
      toyReviews: null,
      isChatOn: null,
      addReview: false,
    };
  },
  computed: {
    isInStock() {
      return this.toy.inStock ? 'In Stock!' : 'Not in Stock';
    },
    user() {
      return this.$store.getters.loggedInUser;
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
    reviewList,
    chatRoom
  },
};
</script>
