<script>
import { Doughnut } from 'vue-chartjs';

export default {
  extends: Doughnut,
  props: {
    toys: { type: Array },
  },
  data() {
    return {
      types: ['Funny', 'Educational', 'Adult'],
      pricesAvg: [],
    };
  },
  methods: {
    sumToyType(type) {
      const toysByType = this.toys.filter((toy) => {
        return toy.type === type;
      });
      const toyPriceSum = toysByType.reduce((sum, currToy) => (sum += +currToy.price),0);
      const pricesAvg = Math.floor(toyPriceSum / toysByType.length);
      return pricesAvg;
    },
  },
  mounted() {
    this.pricesAvg = this.types.map((type) => {
      return this.sumToyType(type);
    });
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: this.types,
      datasets: [
        {
          label: 'GitHub Commits',
          backgroundColor: ['#4a47a3', '#709fb0', '#a7c5eb'],
          data: this.pricesAvg,
        },
      ],
    });
  },
};
</script>

<style></style>
