<template>
<div>
  <app-header></app-header>
  <router-view></router-view>
</div>
</template>

<script>
import header from './components/header.vue';
import signup from './components/signup.vue';
import signin from './components/signin.vue';
import showQuestions from './components/showQuestions.vue';

export default {
  components: {
    'app-header': header,
    'sign-up': signup,
    'sign-in': signin,
    'show-questions': showQuestions
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style>

</style>
