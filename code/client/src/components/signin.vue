<template>
  <div class="container" id="sign-up">
    <form>
      <div class="well">
        <h4>Add User</h4>
        <div class="form-group">
          <label class="pull-left">Email</label>
          <input type="email" class="form-control" placeholder="Email" v-model="User.email">
        </div>
        <div class="form-group">
          <label class="pull-left">Password</label>
          <input type="password" class="form-control" placeholder="Password" v-model="User.password">
        </div>
      </div>
      <button type="submit" class="btn btn-large btn-block btn-primary full-width" v-on:click="addToAPI">Submit</button>
      <button class="btn btn-large btn-block btn-success full-width">Go User</button>
    </form>
  </div>
</template>

<script>

export default {
  data () {
    return {
      User: {
        email: '',
        nickname: '',
        password: '',
        confirmation_password: ''
      }
    }
  },
  methods: {
    addToAPI () {
      let newUser = {
        email: this.User.email,
        nickname: this.User.nickname,
        password: this.User.password,
        confirmation_password: this.User.confirmation_password
      }
      console.log(newUser)
      axios.post('http://localhost:3000/users', newUser)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
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
