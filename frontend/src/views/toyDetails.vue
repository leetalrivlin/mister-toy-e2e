<template>
    <section v-if="toy" class="details-container">
        <router-link to="/toy" class="back-btn">&#8592; Back</router-link>
        <div class="toy-details flex ">
            <img src="~@/assets/imgs/home-2.jpg">
            <div class="details-info flex column justify-center">
                <h2>{{toy.name}}</h2>
                <h4>{{toy.price}}$</h4>
                <p>Type: {{toy.type}}</p>
                <p>Created: {{toy.createdAt | moment('from', 'now')}}</p>
                <p>{{isInStock}}</p>
            </div>
        </div>
    </section>
</template>

<script>

import { toyService } from '../services/toy.service.js';

export default {
  name: 'toyDetails',
   data() {
        return {
            toy: null,
        }
    },
    computed: {
        isInStock() {
            return (this.toy.inStock) ? 'In Stock!' : 'Not in Stock';
        }
    },
    created() {
        const id = this.$route.params.toyId
        toyService.getById(id)
        .then(toy => {
            this.toy = toy;
        }); 
    },
}
</script>