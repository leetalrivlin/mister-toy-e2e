<template>
  <div class="app-container main-layout height-container">
    <toyHeader class="main-layout full"/>
    <router-view />
    <toyFooter class="full"/>
  </div>
</template>

<script>
import toyHeader from './cmps/toyHeader';
import toyFooter from './cmps/toyFooter';

export default {
  name: 'app',
  components: {
    toyHeader,
    toyFooter,
  },
  created() {
    this.$store.dispatch('loadToys');
    // this.$store.dispatch({type: 'loadReviews'});
  },
};
</script>
