<template>
<div class="col-sm-4 col-sm-offset-4" id="sign-in">
  <h2>Log In</h2>
  <p>Log in to your account to get some fun</p>
  <div class="alert alert-danger" v-if="error">
    <p>{{ error }}</p>
  </div>
  <div class="form-group">
    <input type="email" class="form-control" placeholder="Enter your email" v-model="credentials.email">
  </div>
  <div class="form-group">
    <input type="password" class="form-control" placeholder="Enter your password" v-model="credentials.password">
  </div>
  <button type="submit" class="btn btn-large btn-block btn-primary full-width" v-on:click="submit()">Submit</button>
</div>
</template>

<script>
import axios from 'axios';
import auth from '../auth/index'

export default {
  data() {
    return {
      credentials: {
        email: '',
        password: ''
      },
      error: ''
    }
  },
  methods: {
    submit() {
      var credentials = {
        email: this.credentials.email,
        password: this.credentials.password
      }
      auth.login(this, credentials, '/')
    }
  }
}
</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
