<template>
  <div class="container" id="addquestion">

      <div class="well">
        <h4>Categories</h4>
        <select v-model="catNum">
          <option v-for="category in categories" v-bind:value="category.num">{{category.name}} </option>
        </select>
        <button v-on:click="showAddCat = true">+</button>
        <form>
          <input type="answer" class="form-control" placeholder="Add Category"v-model="addCat" v-if="showAddCat === true">
          <button type="button" v-if="showAddCat === true" v-on:click="submitCat">Submit</button>
        </form>

      </div>
      <select v-model="subCat">
        <option v-for="subcategory in filteredSubCats">{{subcategory.name}} </option>
      </select>

      <button v-on:click="showAddSub = true, addSub.numP = catNum" v-if="catNum != -1">+</button>
      <p> {{catNum}} </p>
      <form>
        <input type="answer" class="form-control" placeholder="Add Subcategory"v-model="addSub.name" v-if="showAddSub === true">
        <button type="button" v-if="showAddSub === true" v-on:click="submitSub">Submit</button>
      </form>

    <!--<button type="submit" class="btn btn-large btn-block btn-primary full-width" @click="addToAPI()" >Submit</button> -->
    <ul>
      <li v-for="question in filteredQs">
        {{question.question}}
      </li>
  </ul>

  </div>
</template>

<script>
import axios from 'axios';
export default {
  data () {
    return {
      addCat: '',
      catNum: -1,
      addSub: [
        {name: '', numP: ''}
      ],
      showAddCat: false,
      showAddSub: false,
      subCat: '',
      categories: [
        {name: 'cs', num: 0},
        {name: 'eng', num: 1},
        {name: 'math', num: 2}
      ],
      subcategories: [
        {name: 'compilers', numP: 0, num: 0},
        {name: '408', numP: 0, num: 1},
        {name: 'Writing', numP: 1, num: 0},
        {name: 'Lit', numP: 1, num: 1},
        {name: 'Calc', numP: 2, num: 0},
        {name: 'Linear', numP: 2, num: 1}
      ],
      questions: [
        {question: 'compilers1', answer_type: 'mc', multiple_choice: [
          {fake1: 'yello'},
          {fake2: 'rello'},
          {fake3: 'mello'},
          {ans: 'u rite'}
        ], true_false: '', catP: 'cs', catS: 'compilers'},
        {question: 'compilers2', answer_type:'tf', multiple_choice: [
          {fake1:''},
          {fake2:''},
          {fake3:''},
          {ans:''}
        ], true_false: 'T', catP: 'cs', catS: 'compilers'},
        {question: '408', answer_type:'tf', multiple_choice: [
          {fake1:''},
          {fake2:''},
          {fake3:''},
          {ans:''}
        ], true_false: 'T', catP: 'cs', catS: '408'},
        {question: '4082', answer_type:'tf', multiple_choice: [
          {fake1:''},
          {fake2:''},
          {fake3:''},
          {ans:''}
        ], true_false: 'T', catP: 'cs', catS: '408'},
        {question: 'Writing', answer_type:'tf', multiple_choice: [
          {fake1:''},
          {fake2:''},
          {fake3:''},
          {ans:''}
        ], true_false: 'T', catP: 'eng', catS: 'Writing'},
        {question: 'Writing2', answer_type:'tf', multiple_choice: [
          {fake1:''},
          {fake2:''},
          {fake3:''},
          {ans:''}
        ], true_false: 'T', catP: 'eng', catS: 'Writing'},
        {question: 'Lit', answer_type:'tf', multiple_choice: [
          {fake1:''},
          {fake2:''},
          {fake3:''},
          {ans:''}
        ], true_false: 'T', catP: 'eng', catS: 'Lit'},
        {question: 'Lit2', answer_type:'tf', multiple_choice: [
          {fake1:''},
          {fake2:''},
          {fake3:''},
          {ans:''}
        ], true_false: 'T', catP: 'eng', catS: 'Lit'},
        {question: 'Calc', answer_type:'tf', multiple_choice: [
          {fake1:''},
          {fake2:''},
          {fake3:''},
          {ans:''}
        ], true_false: 'T', catP: 'math', catS: 'Calc'},
        {question: 'Calc2', answer_type:'tf', multiple_choice: [
          {fake1:''},
          {fake2:''},
          {fake3:''},
          {ans:''}
        ], true_false: 'T', catP: 'math', catS: 'Calc'},
        {question: 'Linear', answer_type:'tf', multiple_choice: [
          {fake1:''},
          {fake2:''},
          {fake3:''},
          {ans:''}
        ], true_false: 'T', catP: 'math', catS: 'Linear'},
        {question: 'Linear2', answer_type:'tf', multiple_choice: [
          {fake1:''},
          {fake2:''},
          {fake3:''},
          {ans:''}
        ], true_false: 'T', catP: 'math', catS: 'Linear'}
      ]
    }
  },
  methods: {
    submitCat() {
      let newCat = this.addCat
      this.showAddCat = false
      console.log(newCat);
      axios.post('https://localhost:8080/categories', newCat)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
  },
  submitSub() {
    let newSub = this.addSub
    this.showAddSub = false
    console.log(newSub);
    axios.post('https://localhost:8080/categories', newSub)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
},
    addToAPI() {
      let subcatres = this.subCatNum
      console.log(subcatres);
      axios.post('https://localhost:8080/categories', subcatres)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
  }
  },
  computed: {
    filteredSubCats: function() {
      return this.subcategories.filter((subcategory) => {
        return subcategory.numP === this.catNum;
      });
    },

    filteredQs: function() {
      return this.questions.filter((question) => {
        return question.catS === this.subCat;
      });
    }

  },
  created:function() {
    axios.get('http://localhost:3000/category/get')
      .then((respone) => {
        console.log(response)
        this.categories = response.data;
      })
      .catch((error) => {
        console.log(error)
      })
      console.log(this.categories)
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
</style>
