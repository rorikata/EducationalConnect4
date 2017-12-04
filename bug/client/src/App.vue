<template>
<div>
  <app-header></app-header>
  <router-view></router-view>
</div>
</template>

<script>
//import home from './components/Home.vue';
import header from './components/header.vue';
//import signup from './components/signup.vue';
//import signin from './components/signin.vue';
//import showQuestions from './components/showQuestions.vue';
//import addquestion from './components/addquestion.vue';
//import categories from './components/categories.vue';
//import profile from './components/profile.vue';
//import settings from './components/settings.vue';
import auth from './auth/index';

export default {
  components: {
//    'app-home': home,
    'app-header': header,
//    'sign-up': signup,
//    'sign-in': signin,
//    'show-questions': showQuestions,
//    'addquestion': addquestion,
//    'categories': categories,
//    'profile': profile,
//    'settings': settings
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
