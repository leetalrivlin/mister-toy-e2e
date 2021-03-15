<template>
  <section class="login-container flex column justify-center align-center">
    <el-form
      @submit.prevent="login"
      :label-position="labelPosition"
      label-width="100px"
    >
      <el-form-item label="Name">
        <el-input type="text" placeholder="Your username" v-model="credentials.username"></el-input>
      </el-form-item>

      <el-form-item label="Password">
        <el-input type="password" placeholder="password" v-model="credentials.password"></el-input>
      </el-form-item>

      <div class="flex justify-end align-center">
        <el-button type="primary" @click="login">Login</el-button>
        <p class="or">or</p>
        <el-button><router-link to="/signup">Sign Up</router-link></el-button>
      </div>
    </el-form>
    <!-- <form @submit.prevent="login">
      <h2>Login</h2>
      <div class="flex align-center">
        <input
          type="text"
          placeholder="Your username"
          v-model="credentials.username"
        />
        <input type="password" v-model="credentials.password" />
        <button class="login-btn">Login</button>
      </div>
    </form> -->
    <!-- <p>Or</p>
    <router-link to="/signup" tag="button">Sign Up</router-link> -->
  </section>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: 'right',
      credentials: { username: 'lili', password: '0000' },
    };
  },
  computed: {},
  methods: {
    async login() {
      if (!this.credentials.username) {
        this.msg = "Please enter username/password"
        return;
      }
      try {
        await this.$store.dispatch({ type: 'login', user: this.credentials });
        this.$router.push('/toy');
      } catch (err) {
        console.log('error in user login:', err);
      }
    },
  },
};
</script>