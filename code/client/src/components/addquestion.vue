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
          <input type="answer" class="form-control" placeholder="True/ False" v-model="Question.true_false" v-if="Question.checkMul === false">
          <div v-else>
            <input type="answer" class="form-control" placeholder="Fake Answer 1" v-model="Question.mc_a">
            <input type="answer" class="form-control" placeholder="Fake Answer 2" v-model="Question.mc_b">
            <input type="answer" class="form-control" placeholder="Fake Answer 3" v-model="Question.mc_c">
            <input type="answer" class="form-control" placeholder="Real Answer" v-model="Question.mc_ans">
          </div>
        </div>
      </div>
      <button type="submit" v-on:click="submit()">Submit</button>
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
        mc_a: '',
        mc_b: '',
        mc_c: '',
        mc_ans: '',
        true_false: ''
      },
      categories: [''],
      subcategories: [''],
      catNum: '',
      subCat: ''

    }
  },
  methods: {
    submit() {
      let newQ = {
        text: this.Question.text,
        checkMul: this.Question.checkMul,
        fake1: this.Question.mc_a,
        fake2: this.Question.mc_b,
        fake3: this.Question.mc_c,
        ans: this.Question.ans,
        true_false: this.Question.true_false,
        category_type: this.catNum,
        subcategory_type: this.subCat
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
</style>
