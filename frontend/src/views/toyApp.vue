<template>
  <section class="toy-app-container app-main">
    <toyFilter @filtered="setFiltered" />

    <el-button type="primary" id="compose-btn" size="small">
      <router-link to="/toy/edit">
        <i class="el-icon-plus"></i> Add Toy
      </router-link>
    </el-button>

    <toyList :toys="toys" @onRemoveToy="removeToy" />
  </section>
</template>

<script>
import toyList from '../cmps/toyList.vue';
import toyFilter from '../cmps/toyFilter.vue';

export default {
  name: 'toyApp',
  data() {
    return {};
  },
  computed: {
    toys() {
      const toys = this.$store.getters.toys;
      return toys;
    },
  },
  methods: {
    async removeToy(toyId) {
      try {
        await this.$store.dispatch({ type: 'removeToy', toyId });
        //   showMsg('The Todo was removed!');
        this.$store.dispatch('loadToys');
      } catch (err) {
        console.log('error:', err);
        //   showMsg('Cannot remove todo!', 'danger');
      }
    },
    setFiltered(filterBy) {
      this.$store.dispatch({
        type: 'filterToy',
        filterBy: JSON.parse(JSON.stringify(filterBy)),
      });
      this.$store.dispatch('loadToys');
    },
  },
  components: {
    toyList,
    toyFilter,
  },
};
</script>
