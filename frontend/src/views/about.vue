<template>
  <section class="about flex column justify-center align-center">
    <googleMap :pos="pos" class="map"/>
    <div class="map-btns flex">
      <el-button type="primary" @click="setPos('tel-aviv')">Tel-Aviv</el-button>
      <el-button type="primary" @click="setPos('jerusalem')">Jerusalem</el-button>
      <el-button type="primary" @click="setPos('ashkelon')">Ashkelon</el-button>
    </div>
    <p>Take a look at our Mister Toy branches, check out how close they are from your house, and drop on by.</p>
  </section>
</template>

<script>
import googleMap from '../cmps/googleMap';

export default {
  components: {
    googleMap,
  },
  data() {
    return {
      pos: { lat: 32.109333, lng: 34.855499 },
    };
  },
  methods: {
    setPos(name) {
      if (name === 'tel-aviv') this.pos = { lat: 32.109333, lng: 34.855499 };
      if (name === 'ashkelon') this.pos = { lat: 31.66926, lng: 34.57149 };
      if (name === 'jerusalem') this.pos = { lat: 31.771959, lng: 35.217018 };
    },
  },
};
</script>

<style></style>
