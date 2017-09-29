
<template>
  <div class="container" id="addquestion">
      <div class="well">
        <h4>Profile</h4>
      </div>

      <button type="button" class = "btn btn-large btn-block btn-success full-width" v-on:click="showNick = true">Edit Nickname</button>

      <form>
      <input type="answer" class="form-control" placeholder="Nickname" v-model="nickname" v-if="showNick === true">
      <button type="button" class = "btn btn-large btn-block btn-success full-width" v-if= "showNick === true" v-on:click="submitNick">Submit</button> </br></br>
    </form>

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
      <!-- use the modal component, pass in the prop
      <modal v-if="showModal" @close="showModal = false">

        <h3 slot="header">custom header</h3>
      </modal>
    -->
  </div>
</template>

<script>


import axios from 'axios';

export default {
  data () {
    return {
      Wbody: '',
      Sbody: '',
      Rbody: '',
      showNick: false,
      nickname: '',
      showModal1: false,
      showModal2: false,
      showModal3: false
    }
  },
  methods: {
    getW () {
      let newUser = { //what to send?
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
    },
    getS() {
      //get info, store into Sbody
    },

    getR() {

    },

    submitNick() {
      this.showNick = false
    }
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
