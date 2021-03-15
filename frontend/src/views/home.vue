<template>
  <section class="home-container flex column justify-center align-center">
    <div class="login-btns flex justify-center align-center">
      <el-button type="primary"><router-link to="/login">Login</router-link></el-button> 
      <p class="or">|</p>
      <el-button><router-link to="/signup">Sign Up</router-link></el-button>
    </div>
    <img alt="toy" src="../assets/imgs/home-1.jpg" class="home-img" />

    <!-- <section v-if="loggedInUser" class="logout-container">
      Hello {{ loggedInUser.fullname }}
      <button @click="logout" class="logout-btn">Logout</button>
    </section> -->

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
};
</script>
