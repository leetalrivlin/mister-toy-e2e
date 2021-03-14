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

<style>
/* .card {
  max-width: 150px;
  margin: 20px;
  text-align: left;
}
.time {
  font-size: 13px;
  color: #999;
}

.info {
  font-size: 13px;
  color: rgb(54, 54, 54);
  margin-bottom: 5px;
}
.btns-container > * {
  font-size: 0.8rem;
  color: #409eff;
  padding: 0;
  background: none;
  border: none;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.el-button {
  font-size: 0.8rem;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
} */
</style>
