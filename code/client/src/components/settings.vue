

<template>
  <div class="container" id="addquestion">
      <div class="well">
        <h4>Settings</h4>
      </div>

      <button type="button" class = "btn btn-large btn-block btn-success" v-on:click="showGrid = true">Change Grid Size</button>

      <form>
      <input type="answer" class="form-control" placeholder="Grid Size" v-model="gridSize" v-if="showGrid === true">
      <button type="button" class = "btn btn-large btn-block btn-success" v-if= "showGrid === true" v-on:click="submitGrid">Submit</button> </br></br>
    </form>

    <p> Grid Size : {{gridSize}} </p>

    <button type="button" class = "btn btn-large btn-block btn-success" v-on:click="showWin = true">Set Amount of blocks to connect to Win</button>

    <form>
    <input type="answer" class="form-control" placeholder="Win Number" v-model="winNum" v-if="showWin === true">
    <button type="button" class = "btn btn-large btn-block btn-success" v-if= "showWin === true" v-on:click="submitWin">Submit</button> </br></br>
  </form>

  <p> Blocks to connect to win: {{winNum}} </p>

      <button @click="showModal = true">Rules Page</button> </br></br>

      <div v-if="showModal">
        <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-container">

                <div class="modal-header">
                  <slot name="header">
                    default header
                  </slot>
                </div>

                <div class="modal-body">
                  <slot name="body">
                    default body
                  </slot>
                </div>

                <div class="modal-footer">
                  <slot name="footer">
                    <button class="modal-default-button" @click="showModal = false">
                      OK
                    </button>
                  </slot>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <!-- use the modal component, pass in the prop -->
      <button class="btn btn-large btn-block btn-success" v-on:click="start">Start Game</button> </br></br>
      <div class="alert alert-success" v-if="success">
        <p>{{ success }}</p>
      </div>

  </div>
</template>

<script>
import axios from 'axios';
export default {
  data () {
    return {
      showModal: false,
      gridSize: '',
      winNum: '',
      showGrid: false,
      showWin: false,
      success: ''
    }
  },
  methods: {
    submitGrid () {
      this.showGrid = false;
    },
    submitWin () {
      this.showWin = false;
    },
    start() {
      this.success = 'Game Started!';
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
