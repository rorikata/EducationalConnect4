<template>
  <div class="container" id="addquestion">
      <div class="well">
        <h4>Categories</h4>
        <select class="form-control" v-model="catNum">
          <option v-for="category in categories" v-bind:value="category.num">{{category.name}} </option>
        </select>
        <button class="btn btn-b btn-success" v-on:click="showAddCat = true">Add Category</button>
        <form>
          <br>
          <input type="answer" class="form-control" placeholder="Add Category"v-model="addCat" v-if="showAddCat === true">
          <button class="btn btn-large btn-block btn-success full-width" type="button" v-if="showAddCat === true" v-on:click="submitCat">Submit</button>
        </form>
        <br>
      </div>
      <select class="form-control" v-model="subCat">
        <option v-for="subcategory in filteredSubCats">{{subcategory.name}} </option>
      </select>
      <button class="btn btn-b btn-success" v-on:click="showAddSub = true, addSub.numP = catNum" v-if="catNum != -1">Add Subcategory</button>
      <form>
        <br>
        <input type="answer" class="form-control" placeholder="Add Subcategory"v-model="addSub.name" v-if="showAddSub === true">
        <button class="btn btn-large btn-block btn-success full-width" type="button" v-if="showAddSub === true" v-on:click="submitSub">Submit</button>
      </form>
      <br>
    <!--<button type="submit" class="btn btn-large btn-block btn-primary full-width" @click="addToAPI()" >Submit</button> -->
    <select class="form-control" v-model="cond">
      <option>Alphabetical Sort</option>
      <option>Date Oldest</option>
      <option>Date Newest</option>
    </select>
    <h4>Questions</h4>
    <ul v-if="cond === 'Alphabetical Sort'" class="list-group">
      <li class="list-group-item" v-for="question in sortByAlphabet">
         {{question.question}}
      </li>
    </ul>
    <ul v-if="cond === 'Date Oldest'" class="list-group">
      <li class="list-group-item" v-for="question in sortByDateLate">
         {{question.question}}
      </li>
    </ul>
    <ul v-if="cond === 'Date Newest'" class="list-group">
      <li class="list-group-item" v-for="question in sortByDateEarly">
         {{question.question}}
      </li>
    </ul>
    <ul v-if="cond === '0'" class="list-group">
      <li class="list-group-item" v-for="question in filteredQs">
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
      cond: '0',
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
        {question: 'Dompilers1', answer_type: '0', multiple_choice: [
          {fake1: 'yello'},
          {fake2: 'rello'},
          {fake3: 'mello'},
          {ans: 'u rite'}
        ], true_false: '0', catP: 'cs', catS: 'compilers'},
        {question: 'Compilers2', answer_type:'1', multiple_choice: [
          {fake1:''},
          {fake2:''},
          {fake3:''},
          {ans:''}
        ], true_false: 'T', catP: 'cs', catS: 'compilers'},
        {question: '408', answer_type:'1', multiple_choice: [
          {fake1:''},
          {fake2:''},
          {fake3:''},
          {ans:''}
        ], true_false: 'T', catP: 'cs', catS: '408'},
        {question: '4082', answer_type:'1', multiple_choice: [
          {fake1:''},
          {fake2:''},
          {fake3:''},
          {ans:''}
        ], true_false: 'T', catP: 'cs', catS: '408'},
        {question: 'Writing', answer_type:'1', multiple_choice: [
          {fake1:''},
          {fake2:''},
          {fake3:''},
          {ans:''}
        ], true_false: 'T', catP: 'eng', catS: 'Writing'},
        {question: 'Writing2', answer_type:'1', multiple_choice: [
          {fake1:''},
          {fake2:''},
          {fake3:''},
          {ans:''}
        ], true_false: 'T', catP: 'eng', catS: 'Writing'},
        {question: 'Lit', answer_type:'1', multiple_choice: [
          {fake1:''},
          {fake2:''},
          {fake3:''},
          {ans:''}
        ], true_false: 'T', catP: 'eng', catS: 'Lit'},
        {question: 'Lit2', answer_type:'1', multiple_choice: [
          {fake1:''},
          {fake2:''},
          {fake3:''},
          {ans:''}
        ], true_false: 'T', catP: 'eng', catS: 'Lit'},
        {question: 'Calc', answer_type:'1', multiple_choice: [
          {fake1:''},
          {fake2:''},
          {fake3:''},
          {ans:''}
        ], true_false: 'T', catP: 'math', catS: 'Calc'},
        {question: 'Calc2', answer_type:'1', multiple_choice: [
          {fake1:''},
          {fake2:''},
          {fake3:''},
          {ans:''}
        ], true_false: 'T', catP: 'math', catS: 'Calc'},
        {question: 'Linear', answer_type:'1', multiple_choice: [
          {fake1:''},
          {fake2:''},
          {fake3:''},
          {ans:''}
        ], true_false: 'T', catP: 'math', catS: 'Linear'},
        {question: 'Linear2', answer_type:'1', multiple_choice: [
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
