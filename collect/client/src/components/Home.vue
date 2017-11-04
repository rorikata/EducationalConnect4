<template>
<div id="app-home">
  <h1 v-if="!auth.authenticated">Need to Login</h1>
  <div v-if="auth.authenticated" class="container" id="addquestion">
    <div class="well">
      <h4>Categories</h4>
      <select class="form-control" v-model="catNum">
                    <option v-for="category in categories" v-bind:value="category._id">{{category.name}} </option>
              </select>
      <button class="btn btn-b btn-success" v-on:click="showAddCat = true">Add Category</button>
      <form>
        <br>
        <input type="answer" class="form-control" placeholder="Add Category" v-model="addCat" v-if="showAddCat === true">
        <button class="btn btn-large btn-block btn-success full-width" type="button" v-if="showAddCat === true" v-on:click="submitCat">Submit</button>
      </form>
      <br>

      <select class="form-control" v-model="subCat">

                  <option v-for="subcategory in filterSubcategory">{{subcategory.name}} </option>
                </select>
      <button class="btn btn-b btn-success" v-on:click="showAddSub = true, addSub.parentId = catNum" v-if="catNum != 0">Add Subcategory</button>
      <form>
        <br>
        <input type="answer" class="form-control" placeholder="Add Subcategory" v-model="addSub.name" v-if="showAddSub === true">
        <button class="btn btn-large btn-block btn-success full-width" type="button" v-if="showAddSub === true" v-on:click="submitSub">Submit</button>
      </form>
    </div>
    <!--<button type="submit" class="btn btn-large btn-block btn-primary full-width" @click="addToAPI()" >Submit</button> -->
    <div>
      <table>
        <tr>
          <td>
            <h4>Questions&nbsp</h4>
          </td>

          <td>
            <select class="form-control" v-model="temp">
                  <option>Popularity</option>
                  <option>Date Oldest</option>
                  <option>Date Newest</option>
                </select>
          </td>
          <td>
            <button class="btn btn-large btn-block btn-success full-width" v-if="temp === 'Popularity'" v-on:click="popUpdate(sortByPop)"> OK </button>
            <button class="btn btn-large btn-block btn-success full-width" v-if="temp === 'Date Oldest'" v-on:click="oldUpdate(sortByDateLate)"> OK </button>
            <button class="btn btn-large btn-block btn-success full-width" v-if="temp === 'Date Newest'" v-on:click="newUpdate(sortByDateEarly)"> OK </button>
          </td>
        </tr>
      </table>

      <ul v-if="cond === 'Popularity'" class="list-group">
        <li v-for="question in sortByPop">

          <table>
            <tr>
              <td>
                <div class="margin"> {{question.popular}} </div>
              </td>
              <td>
                <div> Category: {{categories[question.category_type].name}} <br>Sub-category: {{question.subcategory_type}} </div>
              </td>
            </tr>
          </table>
          <table>
            <tr>
              <td>
                <button v-if="question.clickedUp ===0 && question.clickedDown ===1" class="btn btn-success btn-up" v-on:click="submitUp(question), question.clickedDown = 0">↑</button>
                <button v-else-if="question.clickedUp ===0" class="btn btn-success btn-up" v-on:click="submitUp(question),question.clickedUp = 0">↑</button>
                <button v-else-if="question.clickedUp ===1" class="btn btn-success btn-up disabled">↑</button>
              </td>
              <td>
                <div class="list-group-item full-width"> Question: {{question.text}} </div>
              </td>
            </tr>
            <tr>
              <td>
                <button v-if="question.clickedDown ===0 && question.clickedUp ===1" class="btn btn-danger btn-down" v-on:click="submitDown(question), question.clickedUp = 0">↓</button>
                <button v-else-if="question.clickedDown ===0" class="btn btn-danger btn-down" v-on:click="submitDown(question), question.clickedDown = 0">↓</button>
                <button v-else-if="question.clickedDown ===1" class="btn btn-danger btn-down disabled">↓</button>
              </td>
              <td>
                <div v-if="question.checkMul === true" class="list-group-item full-width"> Answer: {{question.multiple_choice.ans}}</div>
                <div v-if="question.checkMul === false" class="list-group-item full-width"> Answer: {{question.true_false}} </div>
              </td>
            </tr>
          </table>
          <br>
        </li>
      </ul>
      <ul v-if="cond === 'Date Oldest'" class="list-group">
        <li v-for="question in sortByDateLate">
          <table>
            <tr>
              <td>
                <div class="margin"> {{question.popular}} </div>
              </td>
              <td>
                <div> Category: {{categories[question.category_type].name}} <br>Sub-category: {{question.subcategory_type}} </div>
              </td>
            </tr>
          </table>
          <table>
            <tr>
              <td>
                <button v-if="question.clickedUp ===0 && question.clickedDown ===1" class="btn btn-success btn-up" v-on:click="submitUp(question), question.clickedDown = 0">↑</button>
                <button v-else-if="question.clickedUp ===0" class="btn btn-success btn-up" v-on:click="submitUp(question),question.clickedUp = 0">↑</button>
                <button v-else-if="question.clickedUp ===1" class="btn btn-success btn-up disabled">↑</button>
              </td>
              <td>
                <div class="list-group-item full-width"> Question: {{question.text}} </div>
              </td>
            </tr>
            <tr>
              <td>
                <button v-if="question.clickedDown ===0 && question.clickedUp ===1" class="btn btn-danger btn-down" v-on:click="submitDown(question), question.clickedUp = 0">↓</button>
                <button v-else-if="question.clickedDown ===0" class="btn btn-danger btn-down" v-on:click="submitDown(question), question.clickedDown = 0">↓</button>
                <button v-else-if="question.clickedDown ===1" class="btn btn-danger btn-down disabled">↓</button>
              </td>
              <td>
                <div v-if="question.checkMul === true" class="list-group-item full-width"> Answer: {{question.multiple_choice.ans}}</div>
                <div v-if="question.checkMul === false" class="list-group-item full-width"> Answer: {{question.true_false}} </div>
              </td>
            </tr>
          </table>
          <br>
        </li>
      </ul>
      <ul v-if="cond === 'Date Newest'" class="list-group">
        <li v-for="question in sortByDateEarly">
          <table>
            <tr>
              <td>
                <div class="margin"> {{question.popular}} </div>
              </td>
              <td>
                <div> Category: {{categories[question.category_type].name}} <br>Sub-category: {{question.subcategory_type}} </div>
              </td>
            </tr>
          </table>
          <table>
            <tr>
              <td>
                <button v-if="question.clickedUp ===0 && question.clickedDown ===1" class="btn btn-success btn-up" v-on:click="submitUp(question), question.clickedDown = 0">↑</button>
                <button v-else-if="question.clickedUp ===0" class="btn btn-success btn-up" v-on:click="submitUp(question),question.clickedUp = 0">↑</button>
                <button v-else-if="question.clickedUp ===1" class="btn btn-success btn-up disabled">↑</button>
              </td>
              <td>
                <div class="list-group-item full-width"> Question: {{question.text}} </div>
              </td>
            </tr>
            <tr>
              <td>
                <button v-if="question.clickedDown ===0 && question.clickedUp ===1" class="btn btn-danger btn-down" v-on:click="submitDown(question), question.clickedUp = 0">↓</button>
                <button v-else-if="question.clickedDown ===0" class="btn btn-danger btn-down" v-on:click="submitDown(question), question.clickedDown = 0">↓</button>
                <button v-else-if="question.clickedDown ===1" class="btn btn-danger btn-down disabled">↓</button>
              </td>
              <td>
                <div v-if="question.checkMul === true" class="list-group-item full-width"> Answer: {{question.multiple_choice.ans}}</div>
                <div v-if="question.checkMul === false" class="list-group-item full-width"> Answer: {{question.true_false}} </div>
              </td>
            </tr>
          </table>
          <br>
        </li>
      </ul>
      <ul v-if="cond === 'Title'" class="list-group">
        <li v-for="question in sortByAlphabet">
          <table>
            <tr>
              <td>
                <div class="margin"> {{question.popular}} </div>
              </td>
              <td>
                <div> Category: {{categories[question.category_type].name}} <br>Sub-category: {{question.subcategory_type}} </div>
              </td>
            </tr>
          </table>
          <table>
            <tr>
              <td>
                <button v-if="question.clickedUp ===0 && question.clickedDown ===1" class="btn btn-success btn-up" v-on:click="submitUp(question), question.clickedDown = 0">↑</button>
                <button v-else-if="question.clickedUp ===0" class="btn btn-success btn-up" v-on:click="submitUp(question),question.clickedUp = 0">↑</button>
                <button v-else-if="question.clickedUp ===1" class="btn btn-success btn-up disabled">↑</button>
              </td>
              <td>
                <div class="list-group-item full-width"> Question: {{question.text}} </div>
              </td>
            </tr>
            <tr>
              <td>
                <button v-if="question.clickedDown ===0 && question.clickedUp ===1" class="btn btn-danger btn-down" v-on:click="submitDown(question), question.clickedUp = 0">↓</button>
                <button v-else-if="question.clickedDown ===0" class="btn btn-danger btn-down" v-on:click="submitDown(question), question.clickedDown = 0">↓</button>
                <button v-else-if="question.clickedDown ===1" class="btn btn-danger btn-down disabled">↓</button>
              </td>
              <td>
                <div v-if="question.checkMul === true" class="list-group-item full-width"> Answer: {{question.multiple_choice.ans}}</div>
                <div v-if="question.checkMul === false" class="list-group-item full-width"> Answer: {{question.true_false}} </div>
              </td>
            </tr>
          </table>
          <br>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import auth from '../auth/index'
import axios from 'axios';
export default {
  data() {
    return {
      auth: auth.user,
      catNum: 0,
      subCat: '',
      categories: [''],
      subcategories: [''],
      questions: [''],
      true_false: true,
      temp: 'Popularity',
      cat: '',
      cond: 'Popularity',
      addCat: '',
      addSub: [{
        name: '',
        parentId: ''
      }],
      showAddCat: false,
      showAddSub: false,
      errorCategory: '',
      errorSubcategory: '',
      user: ''
    }
  },
  methods: {
    submitCat() {
      var addCat = {
        name: this.addCat
      }
      this.showAddCat = false
      //console.log(name);
      axios.post('http://localhost:3000/category/add', addCat)
        .then((response) => {
          //console.log(response);
          axios.get('http://localhost:3000/category/get')
            .then((response) => {
              //console.log(response)
              this.errorCategory = '';
              this.categories = response.data;
            })
            .catch((error) => {
              //console.log(error)
              this.errorCategory = error;
            })

        })
        .catch((error) => {
          this.errorCategory = error;
          //console.log(error);
        });

    },
    submitSub() {
      if (true) {
        console.log(this.addSub.parentId);
        var newSub = {
          name: this.addSub.name,
          parentId: this.addSub.parentId
        }
        this.showAddSub = false
        //console.log("here");
        //console.log(this.subcategories[0]);
        //console.log(newSub);
        axios.post('http://localhost:3000/subcategory/add', newSub)
          .then((response) => {

            //console.log(response);
            // BUG POINT
            axios.get('http://localhost:3000/subcategory/getAll')
              .then((response) => {
                //console.log(response)
                this.errorSubcategory = '';
                this.subcategories = response.data;
              })
              .catch((error) => {
                this.errorSubcategory = error;
                //console.log(error)
              })

          })
          .catch((error) => {
            //console.log(error);
            this.errorSubcategory = error;
          });

      } else {
        this.errorSubcategory = "empty string";
      }
    },
    submitUp(question) {
      question.popular = question.popular - 1;
      //console.log(this.user);
      //console.log(newVote);
      axios.post('http://localhost:3000/question/update', question)
        .then((response) => {
          //console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    update() {
      console.log("update")
      vm.$forceUpdate();
    },

    popUpdate(question) {
      this.cond = this.temp;
      var i;
      for (i = 0; i < question.length; i++) {
        question[i].popular = question[i].popular + 1;
        question[i].popular = question[i].popular - 1;
      }
      console.log("update pop")
    },

    alpUpdate(question) {
      this.cond = this.temp;
      var i;
      var a;
      for (i = 0; i < question.length; i++) {
        a = question[i].text;
        question[i].text = 'a';
        question[i].text = a;
      }
      console.log("update title")
    },

    oldUpdate(question) {
      this.cond = this.temp;
      var i;
      var a;
      for (i = 0; i < question.length; i++) {
        a = question[i].popular;
        question[i].created_at = 'a';
        question[i].created_at = a;
      }
      console.log("update old")
    },

    newUpdate(question) {
      this.cond = this.temp;
      var i;
      var a;
      for (i = 0; i < question.length; i++) {
        a = question[i].popular;
        question[i].created_at = 'a';
        question[i].created_at = a;
      }
      console.log("update new")
    },
    submitDown(question) {
      question.popular = question.popular + 1;
      console.log(question.popular);
      //console.log(newVote);
      axios.post('http://localhost:3000/question/update', question)
        .then((response) => {
          //console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  computed: {
    filterQuestion: function() {
      return this.questions.filter((question) => {
        return question.subcategory_type === this.subCat;
      });
    },
    filterSubcategory: function() {
      return this.subcategories
    },
    sortByPop: function() {
      function compare(a, b) {
        if (a.popular < b.popular)
          return -1;
        if (a.popular > b.popular)
          return 1;
        return 0;
      }
      return this.filterQuestion.sort(compare)
    },
    sortByDateEarly: function() {
      function compare(a, b) {
        if (a.created_at > b.created_at)
          return -1;
        if (a.created_at < b.created_at)
          return 1;
        return 0;
      }
      return this.sortByPop.sort(compare)
    },
    sortByDateLate: function() {
      function compare(a, b) {
        console.log(a)
        console.log(b)
        if (a.created_at < b.created_at)
          return -1;
        if (a.created_at > b.created_at)
          return 1;
        return 0;
      }
      return this.sortByPop.sort(compare)
    }
  },
  created: function() {
    auth.checkAuth();
    //console.log(this.user.authenticated);
    //if(this.user.authenticated === true) {
    //console.log("yoyo" + this.user);
    axios.get('http://localhost:3000/category/get')
      .then((response) => {
        //console.log(response)
        this.categories = response.data;
      })
      .catch((error) => {
        console.log(error)
      })
    console.log(this.categories)
    axios.get('http://localhost:3000/subcategory/getAll')
      .then((response) => {
        //console.log(response)
        this.subcategories = response.data;
      })
      .catch((error) => {
        console.log(error)
      })
    axios.get('http://localhost:3000/question/get')
      .then((response) => {
        console.log(response.data)
        this.questions = response.data;
        //console.log(this.user);
      })
      .catch((error) => {
        console.log(error)
      })
      //auth.getUserData(this);
    //console.log("hello");

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
</style>
