<template>
  <div class="container" id="addquestion">
    <form>
      <div class="well">
        <h4>Add a Question</h4>
        <div class="form-group">
          <label class="pull-left">Question</label>
          <input type="question" class="form-control" placeholder="Question" v-model="Question.question">
        </div>
        <div class="form-group">
<<<<<<< HEAD
          <button type="button" class = "btn btn-large btn-block btn-success full-width" v-on:click="Question.answer_type = '1'">T/F</button>
          <p>{{Question.answer_type}}</p>
          <button type="button" class = "btn btn-large btn-block btn-success full-width" v-on:click="Question.answer_type = '0'">M/C</button> </br></br>
          <p>{{Question.answer_type}}</p>
          <label class="pull-left">Answer</label>

          <input type="answer" class="form-control" placeholder="True/ False" v-model="Question.true_false" v-if="Question.answer_type === 'tf'">

          <div v-else>
            <input type="answer" class="form-control" placeholder="Fake Answer 1" v-model="Question.multiple_choice.fake1">
            <p>{{Question.multiple_choice.fake1}}</p>
            <input type="answer" class="form-control" placeholder="Fake Answer 2" v-model="Question.multiple_choice.fake2">
            <p>{{Question.multiple_choice.fake2}}</p>
            <input type="answer" class="form-control" placeholder="Fake Answer 3" v-model="Question.multiple_choice.fake3">
            <p>{{Question.multiple_choice.fake3}}</p>
            <input type="answer" class="form-control" placeholder="Real Answer" v-model="Question.multiple_choice.ans">
            <p>{{Question.multiple_choice.ans}}</p>
=======
          <button type="button" class = "btn btn-large btn-block btn-success full-width" v-on:click="Question.answer_type = 'tf'">T/F</button>
          <button type="button" class = "btn btn-large btn-block btn-success full-width" v-on:click="Question.answer_type = 'mc'">M/C</button> </br></br>

          <label class="pull-left">Answer</label>

          <input type="answer" class="form-control" placeholder="True/ False" v-model="Question.answer" v-if="Question.answer_type === 'tf'">
          <div v-else>
            <input type="answer" class="form-control" placeholder="Fake Answer 1" v-model="Question.multiple_choice.fake1">
            <input type="answer" class="form-control" placeholder="Fake Answer 2" v-model="Question.multiple_choice.fake2">
            <input type="answer" class="form-control" placeholder="Fake Answer 3" v-model="Question.multiple_choice.fake3">
            <input type="answer" class="form-control" placeholder="Real Answer" v-model="Question.multiple_choice.ans">

>>>>>>> 0b3f94d90e8d6f19db8e3d7ed9ea5cc9dea2f51e
          </div>

        </div>
      </div>
<<<<<<< HEAD
    </form>
    <button type="submit" class="btn btn-large btn-block btn-primary full-width" v-on:click="addQ">Submit</button>
    <button class="btn btn-large btn-block btn-success full-width">Go User</button>
=======

      <button type="submit" class="btn btn-large btn-block btn-primary full-width" v-on:click="addQ">Submit</button>
      <button class="btn btn-large btn-block btn-success full-width">Go User</button>
    </form>
>>>>>>> 0b3f94d90e8d6f19db8e3d7ed9ea5cc9dea2f51e
  </div>
</template>

<script>

import axios from 'axios';

export default {
  data () {
    return {
      Question: {
        question: '',
<<<<<<< HEAD
        answer_type: '1',
=======
        answer_type: '',
>>>>>>> 0b3f94d90e8d6f19db8e3d7ed9ea5cc9dea2f51e
        multiple_choice: {
          fake1: '',
          fake2: '',
          fake3: '',
          ans: ''
        },
        true_false: '',
        category: ''
      }
    }
  },
  methods: {
    addQ () {
<<<<<<< HEAD
      console.log('hello');
=======
>>>>>>> 0b3f94d90e8d6f19db8e3d7ed9ea5cc9dea2f51e
      let newQ = {
        question: this.Question.question,
        answer_type: this.Question.answer_type,
        multiple_choice: {
          fake1: this.Question.multiple_choice.fake1,
          fake2: this.Question.multiple_choice.fake2,
          fake3: this.Question.multiple_choice.fake3,
          ans: this.Question.ans
        },
        true_false: this.Question.true_false,
        category: this.Question.category
      }
      console.log(newQ)
<<<<<<< HEAD
      axios.post('http://localhost:3000/api/questions', newQ)
=======
      axios.post('http://localhost:3000/users', newQ)
>>>>>>> 0b3f94d90e8d6f19db8e3d7ed9ea5cc9dea2f51e
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
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
