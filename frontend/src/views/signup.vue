<template>
  <form @submit.prevent="signup" class="flex column">
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
</template>

<script>
export default {
    data() {
        return {
            signupCredentials: {fullname: '', username: '', password: '', isAdmin: false}
        }
    },
    methods: {
        async signup() {
            await this.$store.dispatch({type: 'signup', user: this.signupCredentials})
            this.$router.push('/toy');    
        }
    }
};
</script>

<style></style>
