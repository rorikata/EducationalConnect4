<template>

  <div class="col-sm-4 col-sm-offset-4" id="sign-up">
    <h2>Sign Up</h2>
    <p>Log in to your account to get some fun</p>
    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
    </div>
    <div class="alert alert-success" v-if="success">
      <p>{{ success }}</p>
    </div>
    <div class="form-group">
      <input type="email" class="form-control" placeholder="Enter your email" v-model="credentials.email">
    </div>
    <div class="form-group">
      <input type="text" class="form-control" placeholder="Enter your nickname" v-model="credentials.nickname">
    </div>
    <div class="form-group">
      <input type="password" class="form-control" placeholder="Enter your password" v-model="credentials.password">
    </div>
    <div class="form-group">
      <input type="password" class="form-control" placeholder="Enter your password again" v-model="credentials.confPW">
    </div>
    <button type="submit" class="btn btn-large btn-block btn-primary full-width" v-on:click="submit()">Submit</button>
  </div>
</template>

<script>
import auth from '../auth/index';
import axios from 'axios';

export default {
  data () {
    return {
      credentials: {
        email: '',
        nickname: '',
        password: '',
        confPW: ''
      },
      error: '',
      success: ''
    }
  },
  methods: {
    submit() {
      if(this.credentials.password === this.credentials.confPW) {
          var credentials = {
            email: this.credentials.email,
            password: this.credentials.password,
            nickname: this.credentials.nickname
          }
          auth.signup(this, credentials)
      } else {
        this.error = "Password and confirmation password does not match.";
      }
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
