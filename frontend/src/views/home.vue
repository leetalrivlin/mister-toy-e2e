<template>
  <section class="home-container">
    <!-- <img alt="toy" src="../assets/imgs/home-1.jpg" class="main-layout" /> -->

    <section v-if="loggedInUser" class="logout-container">
      Hello {{ loggedInUser.fullname }}
      <button @click="logout" class="logout-btn">Logout</button>
    </section>

    <div class="flex">
      <router-link to="/login" tag="button">Login</router-link> |
      <router-link to="/signup" tag="button">Sign Up</router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      
    };
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
  },
  methods: {
    async logout() {
      try {
        await this.$store.dispatch({type: 'logout'})
      } catch(err) {
        console.log('error in signout:',err);
      }

    },
  },
};
</script>
