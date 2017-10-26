<template>
  <div class="container" id="addquestion">
      <div class="well">
        <h4>Categories</h4>
        <select class="form-control" v-model="catNum">
          <option v-for="category in categories" v-bind:value="category._id">{{category.name}} </option>
        </select>
        <button class="btn btn-b btn-success" v-on:click="showAddCat = true">Add Category</button>
        <form>
          <br>
          <input type="answer" class="form-control" placeholder="Add Category"v-model="addCat" v-if="showAddCat === true">
          <button class="btn btn-large btn-block btn-success full-width" type="button" v-if="showAddCat === true" v-on:click="submitCat">Submit</button>
        </form>
        <br>

      <select class="form-control" v-model="subCat">
        <option v-for="subcategory in filteredSubCats">{{subcategory.name}} </option>
      </select>
      <button class="btn btn-b btn-success" v-on:click="showAddSub = true, addSub.numP = catNum" v-if="catNum != -1">Add Subcategory</button>
      <form>
        <br>
        <input type="answer" class="form-control" placeholder="Add Subcategory"v-model="addSub.name" v-if="showAddSub === true">
        <button class="btn btn-large btn-block btn-success full-width" type="button" v-if="showAddSub === true" v-on:click="submitSub">Submit</button>
      </form>
      </div>
    <!--<button type="submit" class="btn btn-large btn-block btn-primary full-width" @click="addToAPI()" >Submit</button> -->
    <table>
      <tr>
        <td>
        <h4>Questions&nbsp</h4>
      </td>

    <td>
      <select class="form-control" v-model="cond">
        <option>Popularity</option>
        <option>Title</option>
        <option>Date Oldest</option>
        <option>Date Newest</option>
      </select>
    </td>
    </tr>
    </table>
    <ul v-if="cond === 'Title'" class="list-group">
      <li  v-for="question in sortByAlphabet">
        <table>
          <tr>
            <td>
              <div class = "margin"> {{question.popular}} </div>
            </td>
            <td>
              <div> Category: {{question.catP}} <br>Sub-category: {{question.catS}} </div>
            </td>
          </tr>
        </table>
        <table>
          <tr>
            <td>
              <button v-if="question.clickedUp ===0 && question.clickedDown ===1"  class="btn btn-success btn-up" v-on:click="submitUp(question), question.clickedDown = 0">↑</button>
              <button v-else-if="question.clickedUp ===0" class="btn btn-success btn-up" v-on:click="submitUp(question),question.clickedUp = 1">↑</button>
              <button v-else-if="question.clickedUp ===1" class="btn btn-success btn-up disabled">↑</button>
            </td>
            <td>
              <div class="list-group-item full-width"> Question: {{question.question}} </div>
            </td>
          </tr>
          <tr>
            <td>
              <button v-if="question.clickedDown ===0 && question.clickedUp ===1"  class="btn btn-danger btn-down" v-on:click="submitDown(question), question.clickedUp = 0">↓</button>
              <button v-else-if="question.clickedDown ===0" class="btn btn-danger btn-down" v-on:click="submitDown(question), question.clickedDown = 1">↓</button>
              <button v-else-if="question.clickedDown ===1" class="btn btn-danger btn-down disabled">↓</button>
            </td>
            <td>
              <div v-if="question.answer_type === '0'" class="list-group-item full-width"> Answer: {{question.multiple_choice[3].ans}}</div>
              <div v-if="question.answer_type === '1'" class="list-group-item full-width"> Answer: {{question.true_false}} </div>
            </td>
          </tr>
        </table>
        <br>
      </li>
    </ul>
    <ul v-if="cond === 'Date Oldest'" class="list-group">
      <li  v-for="question in sortByDateLate">
        <table>
          <tr>
            <td>
              <div class = "margin"> {{question.popular}} </div>
            </td>
            <td>
              <div> Category: {{question.catP}} <br>Sub-category: {{question.catS}} </div>
            </td>
          </tr>
        </table>
        <table>
          <tr>
            <td>
              <button v-if="question.clickedUp ===0 && question.clickedDown ===1"  class="btn btn-success btn-up" v-on:click="submitUp(question), question.clickedDown = 0">↑</button>
              <button v-else-if="question.clickedUp ===0" class="btn btn-success btn-up" v-on:click="submitUp(question),question.clickedUp = 1">↑</button>
              <button v-else-if="question.clickedUp ===1" class="btn btn-success btn-up disabled">↑</button>
            </td>
            <td>
              <div class="list-group-item full-width"> Question: {{question.question}} </div>
            </td>
          </tr>
          <tr>
            <td>
              <button v-if="question.clickedDown ===0 && question.clickedUp ===1"  class="btn btn-danger btn-down" v-on:click="submitDown(question), question.clickedUp = 0">↓</button>
              <button v-else-if="question.clickedDown ===0" class="btn btn-danger btn-down" v-on:click="submitDown(question), question.clickedDown = 1">↓</button>
              <button v-else-if="question.clickedDown ===1" class="btn btn-danger btn-down disabled">↓</button>
            </td>
            <td>
              <div v-if="question.answer_type === '0'" class="list-group-item full-width"> Answer: {{question.multiple_choice[3].ans}}</div>
              <div v-if="question.answer_type === '1'" class="list-group-item full-width"> Answer: {{question.true_false}} </div>
            </td>
          </tr>
        </table>
        <br>
      </li>
    </ul>
    <ul v-if="cond === 'Date Newest'" class="list-group">
      <li  v-for="question in sortByDateEarly">
        <table>
          <tr>
            <td>
              <div class = "margin"> {{question.popular}} </div>
            </td>
            <td>
              <div> Category: {{question.catP}} <br>Sub-category: {{question.catS}} </div>
            </td>
          </tr>
        </table>
        <table>
          <tr>
            <td>
              <button v-if="question.clickedUp ===0 && question.clickedDown ===1"  class="btn btn-success btn-up" v-on:click="submitUp(question), question.clickedDown = 0">↑</button>
              <button v-else-if="question.clickedUp ===0" class="btn btn-success btn-up" v-on:click="submitUp(question),question.clickedUp = 1">↑</button>
              <button v-else-if="question.clickedUp ===1" class="btn btn-success btn-up disabled">↑</button>
            </td>
            <td>
              <div class="list-group-item full-width"> Question: {{question.question}} </div>
            </td>
          </tr>
          <tr>
            <td>
              <button v-if="question.clickedDown ===0 && question.clickedUp ===1"  class="btn btn-danger btn-down" v-on:click="submitDown(question), question.clickedUp = 0">↓</button>
              <button v-else-if="question.clickedDown ===0" class="btn btn-danger btn-down" v-on:click="submitDown(question), question.clickedDown = 1">↓</button>
              <button v-else-if="question.clickedDown ===1" class="btn btn-danger btn-down disabled">↓</button>
            </td>
            <td>
              <div v-if="question.answer_type === '0'" class="list-group-item full-width"> Answer: {{question.multiple_choice[3].ans}}</div>
              <div v-if="question.answer_type === '1'" class="list-group-item full-width"> Answer: {{question.true_false}} </div>
            </td>
          </tr>
        </table>
        <br>
      </li>
    </ul>


    <ul v-if="cond === 'Popularity'" class="list-group">
      <li  v-for="question in sortByPop">
        <table>
          <tr>
            <td>
              <div class = "margin"> {{question.popular}} </div>
            </td>
            <td>
              <div> Category: {{question.catP}} <br>Sub-category: {{question.catS}} </div>
            </td>
          </tr>
        </table>
        <table>
          <tr>
            <td>
              <button v-if="question.clickedUp ===0 && question.clickedDown ===1"  class="btn btn-success btn-up" v-on:click="submitUp(question), question.clickedDown = 0">↑</button>
              <button v-else-if="question.clickedUp ===0" class="btn btn-success btn-up" v-on:click="submitUp(question),question.clickedUp = 1">↑</button>
              <button v-else-if="question.clickedUp ===1" class="btn btn-success btn-up disabled">↑</button>
            </td>
            <td>
              <div class="list-group-item full-width"> Question: {{question.question}} </div>
            </td>
          </tr>
          <tr>
            <td>
              <button v-if="question.clickedDown ===0 && question.clickedUp ===1"  class="btn btn-danger btn-down" v-on:click="submitDown(question), question.clickedUp = 0">↓</button>
              <button v-else-if="question.clickedDown ===0" class="btn btn-danger btn-down" v-on:click="submitDown(question), question.clickedDown = 1">↓</button>
              <button v-else-if="question.clickedDown ===1" class="btn btn-danger btn-down disabled">↓</button>
            </td>
            <td>
              <div v-if="question.answer_type === '0'" class="list-group-item full-width"> Answer: {{question.multiple_choice[3].ans}}</div>
              <div v-if="question.answer_type === '1'" class="list-group-item full-width"> Answer: {{question.true_false}} </div>
            </td>
          </tr>
        </table>
        <br>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import auth from '../auth/index';
export default {
  data () {
    return {
      user: '',
      cond: 'Popularity',
      addCat: '',
      catNum: -1,
      addSub: [
        {name: '', numP: ''}
      ],
      showAddCat: false,
      showAddSub: false,
      subCat: '',
      categories: [''],
      subcategories: [''],
      questions: ['']
    }
  },
  methods: {
    submitCat() {
      let newCat = this.addCat
      this.showAddCat = false
      //console.log(newCat);
      axios.post('http://localhost:8080/categories', newCat)
        .then((response) => {
          //console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
  },
  submitSub() {
    let newSub = this.addSub
    this.showAddSub = false
    //console.log(newSub);
    axios.post('http://localhost:8080/categories', newSub)
      .then((response) => {
        //console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
},
submitUp(question) {
  question.popular = question.popular + 1;
  console.log(this.user);
  //console.log(newVote);
  var info = {
    question: question,
    user: this.user
  }
  axios.post('http://localhost:3000/question/update', info)
    .then((response) => {
      //console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
},
submitDown(question) {
  question.popular = question.popular - 1;
  console.log(question.popular);
  //console.log(newVote);
  axios.post('http://localhost:3000/question/update', question)
    .then((response) => {
      //console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
},
    addToAPI() {
      let subcatres = this.subCatNum
      //console.log(subcatres);
      axios.post('https://localhost:8080/categories', subcatres)
        .then((response) => {
          //console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
  }
  },
  computed: {
    filteredSubCats: function() {
      return this.subcategories.filter((subcategory) => {
        return subcategory.parentId === this.catNum;
      });
    },
    filteredQs: function() {
      return this.questions.filter((question) => {
        return question.subcategory_type === this.subCat;
      });
    },
    sortByAlphabet: function() {
      function compare(a, b) {
      if (a.question < b.question)
        return -1;
      if (a.question > b.question)
        return 1;
      return 0;
      }
      return this.filteredQs.sort(compare)
    },
    sortByPop: function() {
      function compare(a, b) {
      if (a.pop > b.pop)
        return -1;
      if (a.pop < b.pop)
        return 1;
      return 0;
      }
      return this.filteredQs.sort(compare)
    },
    sortByDateEarly: function() {
      function compare(a, b) {
      if (a.created_at < b.created_at)
        return -1;
      if (a.created_at < b.created_at)
        return 1;
      return 0;
      }
      return this.filteredQs.sort(compare)
    },
    sortByDateLate: function() {
      function compare(a, b) {
      if (a.created_at < b.created_at)
        return -1;
      if (a.created_at > b.created_at)
        return 1;
      return 0;
      }
      return this.filteredQs.sort(compare)
    }
  },
  created:function() {
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
            console.log( response.data)
            this.questions = response.data;
          })
          .catch((error) => {
            console.log(error)
          })
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
</style>
