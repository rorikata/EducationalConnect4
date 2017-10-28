<template>
    <div id="app-home">
      <h1 v-if="!user.authenticated">Need to Login</h1>
      <div v-if="user.authenticated" class="container" id="addquestion">
          <h1 >Welcome to Sugar World</h1>
          <h4>Categories</h4>
          <select v-model="catNum">
            <option v-for="category in categories" v-bind:value="category._id">{{category.name}}</option>
          </select>
          <select v-model="subCat">
            <option v-for="subcategory in filterSubcategory">{{subcategory.name}}</option>
          </select>
        <!--<button type="submit" class="btn btn-large btn-block btn-primary full-width" @click="addToAPI()" >Submit</button> -->
        <ul>
          <li v-if="catNum === 0" v-for="question in questions">
              {{ question.text }}
          </li>
          <li v-for="question in filterQuestion">
              {{ question.text }}
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import auth from '../auth/index'
import axios from 'axios';
export default {
  data() {
    return {
      user: auth.user,
      catNum: 0,
      subCat: 'ALL',
      categories: [''],
      subcategories: [''],
      questions: [''],
      true_false: true
    }
},
methods: {

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
  //auth.checkAuth();
  //console.log(this.user.authenticated);
  if(this.user.authenticated === true) {
    //console.log("yoyo" + this.user);
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
    axios.get('http://localhost:3000/question/get')
          .then((response) => {
            console.log( response.data)
            this.questions = response.data;
          })
          .catch((error) => {
            console.log(error)
          })
    }
  }
}
</script>
