
<template>
<div class="container" id="addquestion">
  <div class="well">
    <h4>Profile</h4>
  </div>
  <div class="container">
    <div class="row profile">
      <div class="col-md-3">
        <div class="profile-sidebar">
          <div class="profile-userbuttons">
            <button type="button" class="btn btn-large btn-success" v-on:click="showNick = true">Edit Nickname</button>
            <form>
              <input type="answer" class="form-control" placeholder="Nickname" v-model="nickname" v-if="showNick === true">
              <button type="button" class="btn btn-large btn-block btn-success " v-if="showNick === true" v-on:click="submitNick">Submit</button> </br>
              </br>
            </form>

            <button class="btn btn-large btn-success" @click="showModal1 = true">Wrong Questions</button></br>
            </br>
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
                          <li v-for="question in filteredQs">
                            {{ question.text }}
                          </li>
                        </slot>
                      </div>

                      <div class="modal-footer">
                        <slot name="footer">
                          <button class="btn btn-large btn-success" @click="showModal1 = false">
                        OK
                      </button>
                        </slot>
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
            <!--
        <button  class="btn btn-large btn-block btn-success full-width" @click="showModal2 = true">Starred Questions</button></br></br>
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
      </div> -->
            <!--
        <button  class="btn btn-large btn-block btn-success full-width" @click="showModal3 = true">Ranking</button>
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
        </div>-->
          </div>
        </div>
      </div>
    </div>
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
import auth from '../auth/index';
export default {
  data() {
    return {
      showNick: false,
      nickname: '',
      showModal1: false,
      user: '',
      question: ['']
    }
  },
  methods: {
    getW() {
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
    getR() {},
    submitNick() {
      this.showNick = false
    }
  },
  computed: {
    filteredQs: function() {
      return this.questions.filter((question) => {
        //console.log(this.user.reviews);
        if (this.user.reviews !== undefined) {
          for (var i = 0; i < this.user.reviews.length; i++) {
            if (String(this.user.reviews[i]) === String(question._id)) {
              return true;
            }
          }
        }
        return false;
      });
    }
  },
  created: function() {
    axios.get('http://localhost:3000/question/get')
      .then((response) => {
        console.log(response.data)
        this.questions = response.data;
      })
      .catch((error) => {
        console.log(error)
      });
    auth.getUserData(this);
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
  margin: 0 10px;
}

a {
  color: #42b983;
}

.btn-up {
  text-decoration: none;
  display: block;
  transition: 0.1s
}

.btn-down {
  text-decoration: none;
  display: block;
  transition: 0.1s
}

.margin {
  margin-right: 16px;
  margin-left: 12px
}

button {
  font-family: "Montserrat", Futura, Helvetica, sans-serif;
  ;
  font-size: 1em;
  color: #fff;
  background-color: #3DC4A7;
  padding: 10px 10px;
  border: none;
  border-radius: 5px;
  margin: 0px 0 0px 0;
  transition: all .2s ease;
}

button:hover {
  background-color: #FFDF00;
}

button:focus {
  outline: 0;
}

#submit {
  margin-left: 10px;
}

#red-btn,
#blue-btn {
  display: none;
}

input {
  font-family: "Montserrat", Futura, Helvetica, sans-serif;
  ;
  font-size: 1.25em;
  padding: 15px 30px;
  background-color: #f4f4f4;
  border: 1px solid #B3B3B3;
  border-radius: 5px;
  margin: 10px auto;
  transition: all .25s ease;
}

input:focus {
  outline: 0;
  border: 1px solid #333;
}

h1 {
  font-size: 4em;
  margin-top: 7vh;
}

#disclaimer {
  display: none;
}

#pick-color {
  display: none;
}

h2 {
  font-size: 1.5em;
  margin: 2px 0;
  line-height: 1.5;
}

.circle {
  position: relative;
  display: inherit;
  width: 30px;
  height: 30px;
  display: inline-block;
  margin: 3px 5px;
  border: 3px solid #b3b3b3;
  border-radius: 50%;
  background-color: #fff;
  vertical-align: center;
  transition: all .1s ease;
}

.circle:hover,
.circle:active {
  border: 3px solid #797979;
}

.circle>p {
  font-family: 'Inconsolata', Helvetica, Arial, sans-serif;
  position: absolute;
  font-size: 4em;
  color: #fff;
  top: 0px;
  left: 15px;
  display: block;
  margin: 0 auto;
  text-align: center;
}

.circle-background-color-blue {
  background-color: #4189C7;
  border: 3px solid #4189C7;
}

.circle-background-color-blue:hover {
  border: 3px solid #4189C7;
}

.circle-background-color-red {
  background-color: #C73D47;
  border: 3px solid #C73D47;
}

.circle-background-color-red:hover {
  border: 3px solid #C73D47;
}

@media (max-width: 785px) {
  #disclaimer {
    display: inline;
  }
  .container {
    padding-top: 5vh;
  }
  #title {
    display: none;
  }
  .row {
    display: none;
  }
  .buttons-row {
    display: none;
  }
}

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
