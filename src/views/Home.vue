<template>
  <div v-if="!loggedIn">
    <h1>Welcome to the App!</h1>
    To use this app you'll need to<router-link to="/login">Login</router-link
    >or<router-link to="/register">
      Register
    </router-link>
  </div>
</template>

<script>
import { authComputed } from "../vuex/helpers.js";

export default {
  computed: {
    ...authComputed,
  },
};
</script>
