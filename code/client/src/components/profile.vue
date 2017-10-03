
<template>
  <div class="col-sm-4 col-sm-offset-4" id="addquestion">
      <h2>Profile</h2>
      <div class="alert alert-danger" v-if="error">
        <p>{{ error }}</p>
      </div>
      <div>
        <button type="button" v-on:click="showNick = true">Edit Nickname</button>
        <input type="text"  placeholder="Edit your nickname" v-model="credentials.nickname" v-if="showNick === true">
        <button type="submit" class="btn btn-primary" v-if= "showNick === true" v-on:click="submit()">Submit</button>
      </div>
      <button @click="showModal1 = true">Wrong Questions</button></br></br>
      <div v-if="showModal1">
        <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-container">

                <div class="modal-header">
                  <slot name="header">
                    Wrong Questions
                  </slot>
                </div>

                <div class="modal-body">
                  <slot name="body">
                    {{Wbody}}
                  </slot>
                </div>

                <div class="modal-footer">
                  <slot name="footer">
                    <button class="modal-default-button" @click="showModal1 = false">
                      OK
                    </button>
                  </slot>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <button @click="showModal2 = true">Starred Questions</button></br></br>
      <div v-if="showModal2">
        <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-container">

                <div class="modal-header">
                  <slot name="header">
                    Starred Questions
                  </slot>
                </div>

                <div class="modal-body">
                  <slot name="body">
                    <p> hi: {{SBody}} </p>
                  </slot>
                </div>

                <div class="modal-footer">
                  <slot name="footer">
                    <button class="modal-default-button" @click="showModal2 = false">
                      OK
                    </button>
                  </slot>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <button @click="showModal3 = true">Ranking</button>
      <div v-if="showModal3">
        <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-container">

                <div class="modal-header">
                  <slot name="header">
                    Ranking
                  </slot>
                </div>

                <div class="modal-body">
                  <slot name="body">
                    {{RBody}}
                  </slot>
                </div>

                <div class="modal-footer">
                  <slot name="footer">
                    <button class="modal-default-button" @click="showModal3 = false">
                      OK
                    </button>
                  </slot>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
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
      Wbody: '',
      Sbody: '',
      Rbody: '',
      showNick: false,
      nickname: '',
      showModal1: false,
      showModal2: false,
      showModal3: false,
      error: '',
      user: ['']
    }
  },
  methods: {
    submit() {
      this.showNick=false
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
