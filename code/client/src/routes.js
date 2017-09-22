import showQuestions from './components/showQuestions.vue';
import signin from './components/signin.vue';
import signup from './components/signup.vue';

export default[
    { path: '/', component: showQuestions },
    { path: '/signin', component: signin },
    { path: '/signup', component: signup }
]
