<template>
<div class="container">
  <link rel="stylesheet" href="/game/css">
  <h1 id="disclaimer">Please make your browser bigger!</h1>
  <div class="buttons-row">
    <h2 id="question">Do you want to play with a friend or with the ultra unbeatable computer?</h2>
    <button id="two-players-btn">With a Friend</button>
    <button id="one-player-btn">Bring on the Computer</button>
    <h2 id="pick-color"></h2>
    <button id="red-btn">Hotter than the Sun</button>
    <button id="blue-btn">Ice Cold</button>
  </div>
  <div id="dialog">
    <button >ok</button>
    <div v-view>{{filteredQs[randomNumber()].text}}</div>
    <div>{{filteredQs[randomNumber()]}}</div>
  </div>
  <div class="row">
    <script2 src="/game/jquery"></script2>
    <script2 src="/game/jquery_ui"></script2>
    <script2 src="/game/setupGame"></script2>
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'hello',
  data() {
    return {
      questions: [''],
    }
  },
    methods: {
        randomNumber: function() {
          return Math.floor((Math.random() * this.filteredQs.length) + 1);
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
          })
      }, //need another get for the subcategory questions are in
      computed: {
        filteredQs: function() {
          return this.questions.filter((question) => {
            this.count = this.count + 1
            return question.catS === this.subCat;
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
          })

      }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html {
  font-family: "Montserrat", Futura, Helvetica, sans-serif;
  text-align: center;
  -webkit-font-smoothing: subpixel-antialiased;
  color: #333;
}

#title {
  cursor: pointer;
}

.container {
  width: 670px;
  margin: 0 auto;
  text-align: center;
}

.buttons-row {
  width: 100%;
  margin: 0 auto;
}

.row {
  margin: 30px auto 7vh auto;
  padding: 20px 10px;
  -webkit-user-select: none;
  /* Chrome/Safari */
  -moz-user-select: none;
  /* Firefox */
  -ms-user-select: none;
  /* IE10+ */
}

button {
  font-family: "Montserrat", Futura, Helvetica, sans-serif;
  ;
  font-size: 1.25em;
  color: #fff;
  background-color: #3DC4A7;
  padding: 15px 40px;
  border: none;
  border-radius: 5px;
  margin: 20px 0 30px 0;
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
  margin: 10px 0;
  line-height: 1.5;
}

.circle {
  position: relative;
  display: inherit;
  width: 75px;
  height: 75px;
  display: inline-block;
  margin: 3px 5px;
  border: 3px solid #b3b3b3;
  border-radius: 50%;
  background-color: #fff;
  vertical-align: center;
  transition: all .25s ease;
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
  top: 15px;
  left: 35px;
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
    padding-top: 20vh;
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
</style>
