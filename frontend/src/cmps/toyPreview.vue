<template>
  <li class="preview-container" @mouseover="hover=true" @mouseleave="hover=false" @click="hover=true">

    <img :src="require(`@/assets/imgs/${toy.img}`)" class="image" />

    <section v-if="hover" class="details-screen flex column justify-center align-center">
      <div class="toy-info">
        <h1>{{ toy.name }}</h1>
        <h4>{{ toy.price }}$</h4>
      </div>
      <div class="btn-container flex">
        <router-link :to="'/toy/' + toy._id" tag="button" class="btn-details"><i class="el-icon-zoom-in"></i></router-link>
        <router-link :to="'/toy/edit/' + toy._id" tag="button" class="btn-edit"><i class="el-icon-edit"></i></router-link>
        <button @click="onRemove(toy._id)" class="btn-delete"><i class="el-icon-delete"></i></button>
      </div>
    </section>
  </li>
</template>

<script>
export default {
  name: 'toyPreview',
  props: {
    toy: { type: Object, default: 'Toy' },
  },
  data() {
    return {
      hover: false,
    }
  },
  computed: {
  },
  methods: {
    onRemove(toyId) {
      this.$emit('remove', toyId);
    },
  },
};
</script>
