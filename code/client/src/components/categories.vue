<template>
  <div class="col-sm-4 col-sm-offset-4" id="addquestion">
      <div class="well">
        <h4>Categories</h4>
        <select v-model="catNum">
          <option v-for="category in categories" v-bind:value="category.num">
            {{category.name}}
          </option>
        </select>
      </div>
      <select v-model="subCatNum">
        <option
          v-for="subcategory in filteredSubCats">
          {{subcategory.name}}
        </option>
      </select>
    <button type="submit" class="btn btn-large btn-block btn-primary full-width" @click="addToAPI()" >Submit</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data () {
    return {
      catNum: '',
      subCatNum: '',
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
        {name: 'Calc 2', numP: 2, num: 0},
        {name: 'Linear', numP: 2, num: 1}
      ],
      questions: [
        {question: 'compilers', answer_type: 'mc', multiple_choice: [
          {fake1: 'yello'},
          {fake2: 'rello'},
          {fake3: 'mello'},
          {ans: 'u rite'}
        ], true_false: '', category: 0.0},
        {question: 'compilers2', answer_type:'tf', multiple_choice: [
          {fake1:''},
          {fake2:''},
          {fake3:''},
          {ans:''}
        ], true_false: 'T', category: 0.0},
        {question: '408', answer_type:'tf', multiple_choice: [
          {fake1:''},
          {fake2:''},
          {fake3:''},
          {ans:''}
        ], true_false: 'T', category: 0.1},
        {question: '4082', answer_type:'tf', multiple_choice: [
          {fake1:''},
          {fake2:''},
          {fake3:''},
          {ans:''}
        ], true_false: 'T', category: 0.1},
        {question: 'Writing', answer_type:'tf', multiple_choice: [
          {fake1:''},
          {fake2:''},
          {fake3:''},
          {ans:''}
        ], true_false: 'T', category: 1.0},
        {question: 'Writing2', answer_type:'tf', multiple_choice: [
          {fake1:''},
          {fake2:''},
          {fake3:''},
          {ans:''}
        ], true_false: 'T', category: 1.0},
        {question: 'Lit', answer_type:'tf', multiple_choice: [
          {fake1:''},
          {fake2:''},
          {fake3:''},
          {ans:''}
        ], true_false: 'T', category: 1.1},
        {question: 'Lit2', answer_type:'tf', multiple_choice: [
          {fake1:''},
          {fake2:''},
          {fake3:''},
          {ans:''}
        ], true_false: 'T', category: 1.1},
        {question: 'Calc', answer_type:'tf', multiple_choice: [
          {fake1:''},
          {fake2:''},
          {fake3:''},
          {ans:''}
        ], true_false: 'T', category: 2.0},
        {question: 'Calc2', answer_type:'tf', multiple_choice: [
          {fake1:''},
          {fake2:''},
          {fake3:''},
          {ans:''}
        ], true_false: 'T', category: 2.0},
        {question: 'Linear', answer_type:'tf', multiple_choice: [
          {fake1:''},
          {fake2:''},
          {fake3:''},
          {ans:''}
        ], true_false: 'T', category: 2.1},
        {question: 'Linear2', answer_type:'tf', multiple_choice: [
          {fake1:''},
          {fake2:''},
          {fake3:''},
          {ans:''}
        ], true_false: 'T', category: 2.1},
      ]
    }
  },
  methods: {
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
    }
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
