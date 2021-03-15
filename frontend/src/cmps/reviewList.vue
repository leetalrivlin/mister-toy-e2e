<template>
  <ul class="review-list">
    <li v-for="rev in reviews" :key="rev._id" class="review-item">
      <ul class="stars">
        <li v-for="(star, idx) in rev.rate" :key="idx"></li>
      </ul>
      <h2>{{ rev.user.username }}</h2>
      <p>{{ rev.content }}</p>
      <button @click="removeReview(rev._id)">X</button>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'reviewList',
  props: {
    reviews: {
      type: Array,
    },
  },
  methods: {
    removeReview(id) {
      this.$emit('deleteReview', id)
    }
  }
};
</script>