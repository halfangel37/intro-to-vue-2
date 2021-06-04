<template>
  <div  v-if="!this.$store.state.user">
    To use this app you'll need to
    <router-link to="/login">
      Login
    </router-link>
    or
    <router-link to="/register">
      Register
    </router-link>
  </div>
</template>

<script>
export default {};
</script>
