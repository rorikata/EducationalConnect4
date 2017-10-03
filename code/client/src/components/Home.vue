<template>
    <div id="app-home">
      <h1 v-if="!user.authenticated">Need to Login</h1>
      <h1 v-if="user.authenticated">Welcome to Sugar World</h1>
    </div>
</template>

<script>
import auth from '../auth/index'
export default {
  data() {
    return {
      user: auth.user
    }
  },
  methods: {

  }
}
</script>

<style>

</style>
