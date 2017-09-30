
<template>
  <div class="col-sm-4 col-sm-offset-4" id="addquestion">
      <h2>Profile</h2>
      <div class="alert alert-danger" v-if="error">
        <p>{{ error }}</p>
      </div>
      <div>
        <input type="text"  placeholder="Edit your nickname" v-model="credentials.nickname">
        <button type="submit" class="btn btn-primary" v-on:click="submit()">Submit</button>
      </div>
      <button >Wrong Questions</button>
      <button>Starred Questions</button>
      <button>Ranking</button>
  </div>
</template>

<script>
import axios from 'axios';
import auth from '../auth/index';

export default {
  data () {
    return {
      credentials: {
        nickname: ''
      },
      showModal: false,
      error: '',
      user: ['']
    }
  },
  methods: {
    submit() {
        console.log(this.user._id);
      var credentials = {
        id: this.user._id,
        nickname: this.credentials.nickname
      }
      auth.update(this, credentials)
    }
  },
  created: function() {
    auth.getUserData(this);
  }
}

</script>


<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;

}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
