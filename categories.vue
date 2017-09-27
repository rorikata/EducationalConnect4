<template>
  <div class="container" id="addquestion">
    <form>
      <div class="well">
        <h4>Categories</h4>
        <select >
          <option v-for="category in categories">{{category.color}} </option>

        </select>
      </div>
      <button type="submit" class="btn btn-large btn-block btn-primary full-width" v-on:click="addC" @click="addToAPI">Submit</button>
      <button class="btn btn-large btn-block btn-success full-width">Go User</button> </br></br>

    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      categories: [
        {color:'red'},
        {color:'yellow'},
        {color:'blue'}
      ],
      newC: ''
    }
  },
  methods: {
    addC () {
      let newCat = {
        newC: this.newC
      }
      console.log(newC)
      axios.post('http://localhost:3000/users', newC)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    addToAPI() {
      let category= this.newC
      console.log(category);]
      axios.post('https://localhost:3000/categories', category)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      },
      mounted(){
        axios.post('https://localhost:3000/categories', category)
          .then((response) => {
            console.log(response.data);
            this.categories = response.data
          })
          .catch((error) => {
            console.log(error);
          });
      }
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
