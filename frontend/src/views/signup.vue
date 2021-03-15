<template>
  <section class="signup-container flex column justify-center align-center">
    <p>{{ msg }}</p>
     <el-form
      @submit.prevent="signup"
      :label-position="labelPosition"
      label-width="100px"
    >
      <el-form-item label="Fullname">
        <el-input
          type="text"
        placeholder="Your fullname"
        v-model="signupCredentials.fullname"
        required
        ></el-input>
      </el-form-item>

      <el-form-item label="Username">
        <el-input
          type="text"
        placeholder="Your username"
        v-model="signupCredentials.username"
        required
        ></el-input>
      </el-form-item>

      <el-form-item label="Password">
        <el-input type="password" placeholder="password" v-model="signupCredentials.password"></el-input>
      </el-form-item>

      <div class="flex justify-end align-center">
        <el-button type="primary" @click="signup">Sign Up</el-button>
        <p class="or">or</p>
        <el-button><router-link to="/login">Login</router-link></el-button>
      </div>
    </el-form>
    <!-- <form @submit.prevent="signup" class="flex column">
      <h2>Signup</h2>
      <input
        type="text"
        placeholder="Your fullname"
        v-model="signupCredentials.fullname"
      />
      <input
        type="text"
        placeholder="Your username"
        v-model="signupCredentials.username"
      />
      <input type="password" v-model="signupCredentials.password" />
      <button>Sign Up</button>
    </form>
    <p>OR</p>
    <router-link to="/login" tag="button">Login</router-link> -->
  </section>
</template>

<script>
export default {
  data() {
    return {
      msg: "",
      labelPosition: 'right',
      signupCredentials: {
        fullname: '',
        username: '',
        password: '',
        isAdmin: false,
      },
    };
  },
  methods: {
    async signup() {
      if (!this.signupCredentials.fullname || !this.signupCredentials.password || !this.signupCredentials.username) {
        this.msg = "Please fill up the form"
        return
      }
      try {
      await this.$store.dispatch({
        type: 'signup',
        user: this.signupCredentials,
      });
      this.$router.push('/toy');
      } catch(err) {
          console.log(err)
          this.msg = "Failed to signup"
      }
    },
  },
};
</script>

<style></style>
