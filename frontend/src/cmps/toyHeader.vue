<template>
  <section class="toy-header-container full">
    <section class="toy-header">

      <div class="flex align-center">
        <h1 class="toy-logo">
          Mister Toy
        </h1>
        <div v-if="loggedInUser" class="logout-container">
          Hello {{ loggedInUser.fullname }}
          <el-button type="primary" size="small" @click="logout" class="logout-btn">Logout</el-button>
        </div>
      </div>

      <nav class="header-nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/toy">Toys</router-link> |
        <router-link to="/dashboard">Dashboard</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/login">Login</router-link>
      </nav>

    </section>
  </section>
</template>

<script>
export default {
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
  },
  methods: {
    async logout() {
      console.log('logging out...');
      try {
        await this.$store.dispatch({type: 'logout'})
      } catch(err) {
        console.log('error in signout:',err);
      }

    },
  },
};
</script>
