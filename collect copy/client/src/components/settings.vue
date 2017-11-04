<template>
  <div>

    <section id="one" class="wrapper special">
      <div class="inner">
        <header class="major">
          <h2>Rules</h2>
        </header>
        <div class="features">
          <div class="feature">
            <h3>Rule 1</h3>
            <p>Select a Category and SubCategory</p>
          </div>
          <div class="feature">
            <h3>Rule 2</h3>
            <p>Pick an opponent, your friend or computer</p>
          </div>
          <div class="feature">
            <h3>Rule 3</h3>
            <p>Write your name(s) and start the game</p>
          </div>
          <div class="feature">
            <h3>Rule 4</h3>
            <p>Click to place a block, and answer correctly for the block to be placed</p>
          </div>
          <div class="feature">
            <h3>Rule 5</h3>
            <p>When someone wins, the opponent gets an extra question so both players get the same number of questions</p>
          </div>
        </div>
      </div>
    </section>
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
      success: '',
      msg1: '',
      msg2: '',
      error1: false,
      error2: false
    }
  },
  computed: {
    wrongGrid() {
      return (this.gridSize > 7 || this.gridSize < 2 || this.isNumeric(this.gridSize) === false)
    },
    wrongWin() {
      return (this.winNum > 5 || this.winNum < 2 || this.isNumeric(this.winNum) === false)
    }
  },
  methods: {
    submitGrid () {
      this.showGrid = false;
      if (this.wrongGrid) {
        this.error1 = true;
        this.msg1 = 'Grid Size incorrect format or size!'
        this.gridSize = '';
        //error
      }
      else {
        this.error1 = false;
      }
    },
    isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    },
    submitWin () {
      this.showWin = false;
      if (this.wrongWin) {
        this.error2 = true;
        this.msg2 = 'The number of blocks to win is too large, too small, or the wrong format'
        this.winNum = '';
        //error
      }
      else {
        this.error2 = false;
      }
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
