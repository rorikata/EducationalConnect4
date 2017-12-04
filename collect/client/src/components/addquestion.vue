<template>
  <div class="container" id="addquestion">
      <div class="well">
        <h4>Add a Question</h4>
        <div class="form-group">
          <label class="pull-left">Question</label>
          <input type="question" class="form-control" placeholder="Question" v-model="Question.text">
          <h5>Question Category</h5>
          <select v-model="catNum">
            <option v-for="category in categories" v-bind:value="category._id">{{category.name}}</option>
          </select>
          <select v-model="subCat">
            <option v-for="subcategory in filterSubcategory">{{subcategory.name}}</option>
          </select>
        </div>
        <div class="form-group">
          <!-- checkMul is boolean: 0 => true 1 => false  -->
          <button type="button" v-on:click="Question.checkMul = false">T/F</button>
          <button type="button"  v-on:click="Question.checkMul = true">M/C</button> </br></br>
          <label class="pull-left">Answer</label>
          <br>
          <div v-if="Question.checkMul === false">
          <table>
            <tr>
              <td>
                <button v-if="Question.true_false !== true" v-on:click="Question.true_false = true">True</button>
                <button class ="btn disabled" v-if="Question.true_false === true">True</button>
              </td>
              <td>
                <button v-if="Question.true_false !== false" v-on:click="Question.true_false = false">False</button>
                <button class ="btn disabled" v-if="Question.true_false === false">False</button>
              </td>
            </tr>
          </table>
        </div>
          <div v-if="Question.checkMul === true">
            <input type="answer" class="form-control" placeholder="Fake Answer 1" v-model="Question.multiple_choice.fake1">
            <input type="answer" class="form-control" placeholder="Fake Answer 2" v-model="Question.multiple_choice.fake2">
            <input type="answer" class="form-control" placeholder="Fake Answer 3" v-model="Question.multiple_choice.fake3">
            <input type="answer" class="form-control" placeholder="Real Answer" v-model="Question.multiple_choice.ans">
          </div>
        </div>
      </div>
      <div v-if="this.Question.checkMul === true">
        <div v-if="this.Question.multiple_choice.ans !== ''">
          <div v-if="this.subCat !== ''">
            <div v-if="this.Question.multiple_choice.fake1 !== ''">
              <div v-if="this.Question.multiple_choice.fake2 !== ''">
                <div v-if="this.Question.multiple_choice.fake3 !== ''">
                  <div v-if="this.Question.text !== ''">
                    <button type="submit" v-on:click="submit()">Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="this.Question.checkMul === false">
        <div v-if="this.Question.true_false !== ''">
          <div v-if="this.Question.text !== ''">
            <div v-if="this.subCat !== ''">
              <button type="submit" v-on:click="submit()">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
export default {
  data () {
    return {
      Question: {
        text: '',
        checkMul: true,
        multiple_choice: {
          fake1: '',
          fake2: '',
          fake3: '',
          ans: ''
        },
        true_false: ''
      },
      categories: [''],
      subcategories: [''],
      catNum: '0',
      subCat: ''
    }
  },
  methods: {
    submit() {
      let newQ = {
        text: this.Question.text,
        checkMul: this.Question.checkMul,
        fake1: this.Question.multiple_choice.fake1,
        fake2: this.Question.multiple_choice.fake2,
        fake3: this.Question.multiple_choice.fake3,
        ans: this.Question.multiple_choice.ans,
        true_false: this.Question.true_false,
        category_type: this.catNum,
        subcategory_type: this.subCat,
        ansRight: 0,
        totalAns: 0,
        diff: 0
      }
      console.log(newQ)
      axios.post('http://localhost:3000/question/add', newQ)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  computed: {
    filterQuestion: function() {
      return this.questions.filter((question) => {
        return question.subcategory_type === this.subCat;
      });
    },
    filterSubcategory: function() {
      if(this.catNum == 0){
        return this.subcategories
      }
      console.log(this.catNum);
      return this.subcategories.filter((subcategory) => {
        return subcategory.parentId == this.catNum;
      });
    }
  },
  created:function() {
    axios.get('http://localhost:3000/category/get')
      .then((response) => {
        console.log(response)
        this.categories = response.data;
      })
      .catch((error) => {
        console.log(error)
      })
      console.log(this.categories)
    axios.get('http://localhost:3000/subcategory/getAll')
        .then((response) => {
          console.log(response)
          this.subcategories = response.data;
        })
        .catch((error) => {
          console.log(error)
        })
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
  font-size: 1em;
  color: #fff;
  background-color: #3DC4A7;
  padding: 10px 10px;
  border: none;
  border-radius: 5px;
  margin: 5px 0 5px 0;
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
</style>
