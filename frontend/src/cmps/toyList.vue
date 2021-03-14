<template>
  <ul class="list-container card-grid clean-list">
    <toyPreview v-for="toy in toys" :key="toy._id" :toy="toy" @remove="onRemove"/>
  </ul>
</template>

<script>
import toyPreview from '../cmps/toyPreview.vue';

export default {
  name: 'toyList',
  props: {
    toys: { type: Array, default: 'Toys' },
  },
  methods: {
    onRemove(toyId) {
      this.$emit('onRemoveToy', toyId);
    },
  },
  components: {
    toyPreview,
  },
};
</script>
