
<template>
  <div class="container" id="addquestion">
      <div class="well">
        <h4>Settings</h4>
      </div>

      <button class="btn btn-large btn-block btn-primary full-width" v-on:click="grid">Grid Size</button></br></br>
      <button class="btn btn-large btn-block btn-success full-width" v-on:click="win">Amount of blocks connected to win</button> </br></br>
      <button @click="showModal = true">Rules Page</button>

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
                    default footer
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
      <modal v-if="showModal" @close="showModal = false">

        <h3 slot="header">custom header</h3>
      </modal>
  </div>
</template>

<script>


export default {
  data () {
    return {
      showModal: false,
      gridSize: '',
      winNum: '',
    }
  },
  methods: {
    grid () {
      let newGrid = {
        gridSize = this.gridSize
      }
      console.log(newGrid)
      axios.post('http://localhost:3000/users', newGrid)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    win() {
      let newWin = {
        winNum = this.winNum
      }
      console.log(newWin)
      axios.post('http://localhost:3000/users', newWin)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    },
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
