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
          <button type="button" class = "btn btn-large btn-block btn-success full-width" v-on:click="Question.answer_type = 'tf'">T/F</button>
          <button type="button" class = "btn btn-large btn-block btn-success full-width" v-on:click="Question.answer_type = 'mc'">M/C</button> </br></br>

          <label class="pull-left">Answer</label>

          <input type="answer" class="form-control" placeholder="True/ False" v-model="Question.answer" v-if="Question.answer_type === 'tf'">
          <div v-else>
            <input type="answer" class="form-control" placeholder="Fake Answer 1" v-model="Question.multiple_choice.fake1">
            <input type="answer" class="form-control" placeholder="Fake Answer 2" v-model="Question.multiple_choice.fake2">
            <input type="answer" class="form-control" placeholder="Fake Answer 3" v-model="Question.multiple_choice.fake3">
            <input type="answer" class="form-control" placeholder="Real Answer" v-model="Question.multiple_choice.ans">

          </div>

        </div>
      </div>

      <button type="submit" class="btn btn-large btn-block btn-primary full-width" v-on:click="addQ" @click=addToAPI>Submit</button>
      <button class="btn btn-large btn-block btn-success full-width">Go User</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      Question: {
        question: '',
        answer_type: '',
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
      axios.post('http://localhost:3000/users', newQ)
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
