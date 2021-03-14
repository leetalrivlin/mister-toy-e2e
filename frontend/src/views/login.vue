<template>
    <form @submit.prevent="login">
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
    </form>
</template>

<script>
export default {
  data() {
    return {
      credentials: { username: 'leetal', password: '1234' },
    };
  },
  computed: {
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch({ type: "login", user: this.credentials })
        this.$router.push("/toy");
      } catch(err) {
        console.log('error in user login:',err);
      }
    },
  },
};
</script>
