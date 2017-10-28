<template>
<div class="container">
  <link rel="stylesheet" href="/game/css">
  <div class="well" v-show="sel === 0">
    <h4>Categories</h4>
    <select class="form-control" v-model="catNum">
        <option v-for="category in categories" v-bind:value="category._id">{{category.name}} </option>
      </select>
    <br>
    <select class="form-control" v-model="subCat">
      <option v-for="subcategory in filteredSubCats">{{subcategory.name}} </option>
    </select>
    <button class="button" v-on:click="select">Select</button>
  </div>
  <h2 id="disclaimer">Please make your browser bigger!</h2>
  <div class="buttons-row" v-show="sel !== 0">
    <h2 id="question">Do you want to play with a friend or with the ultra unbeatable computer?</h2>
    <button id="two-players-btn">With a Friend</button>
    <button id="one-player-btn">Bring on the Computer</button>
    <h2 id="pick-color"></h2>
    <button id="red-btn">Hotter than the Sun</button>
    <button id="blue-btn">Ice Cold</button>
  </div>
  <div id="dialog">
    <div id="questions">
      {{sortByDiff}}
    </div>
    <div id="question">
    </div>
  </div>
  <div class="row">
    <script2 src="/game/jquery"></script2>
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
      sel: 0,
      subCat: 0,
      categories: [''],
      subcategories: [''],
      catNum: 0,
      num: 0,
      questions: [''],
      subcategories: [''],
      categories: [''],
      sorted: [''],
      incorrect: ['']
    }
  },
  methods: {
    select: function() {
      this.sel = 1;
    },
    randomNumber: function() {
      return Math.floor((Math.random() * this.filteredQs.length) + 1);
    },
    diffList: function() {
      this.num = this.num + 1;
      return "{{this.filteredQs[this.num].text}}|this.filteredQs[this.num].answer_type|this.filteredQs[this.num].multiple_choice|this.filteredQs[this.num].multiple_choice.ans|this.filteredQs[this.num].true_false"
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

    axios.get('http://localhost:3000/subcategory/getAll')
      .then((response) => {
        //console.log(response)
        this.subcategories = response.data;
      })
      .catch((error) => {
        console.log(error)
      })
    axios.get('http://localhost:3000/category/get')
      .then((response) => {
        //console.log(response.data)
        this.categories = response.data;
      })
      .catch((error) => {
        console.log(error)
      })
  }, //need another get for the subcategory questions are in
  computed: {
    filteredSubCats: function() {
      //console.log(this.categories)
      this.subCat = -1
      return this.subcategories.filter((subcategory) => {
        return subcategory.parentId === this.catNum;
      });
    },
    filteredQs: function() {
      return this.questions.filter((question) => {
        return question.subcategory_type === this.subCat;
      });
    },
    sortByDiff: function() {
      function compare(a, b) {
        if (a.diff < b.diff)
          return -1;
        if (a.diff > b.diff)
          return 1;
        return 0;
      }
      return this.filteredQs.sort(compare)
    }
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
