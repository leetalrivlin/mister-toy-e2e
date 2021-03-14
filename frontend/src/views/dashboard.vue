<template>
  <section class="dashboard-container app-main">
    <h3>Price avarage by toy type</h3>
    <doughnutChart class="doughnut-container" :toys="toys"/>
  </section>
</template>

<script>
import doughnutChart from '../cmps/doughnutChart';
export default {
  data() {
    return {};
  },
  components: {
    doughnutChart,
  },
  computed: {
    toys() {
      return this.$store.getters.toys;
    },
  },
};
</script>

<style scoped></style>
