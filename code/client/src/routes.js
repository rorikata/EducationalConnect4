import Home from './components/Home.vue'
import showQuestions from './components/showQuestions.vue';
import signin from './components/signin.vue';
import signup from './components/signup.vue';
import addquestion from './components/addquestion.vue';
import categories from './components/categories.vue';
import profile from './components/profile.vue';
import settings from './components/settings.vue';


export default[
    { path: '/', component: Home},
    { path: '/top', component: showQuestions },
    { path: '/signin', component: signin },
    { path: '/signup', component: signup },
    { path: '/addquestion', component: addquestion },
    { path: '/categories', component: categories },
    { path: '/profile', component: profile },
    { path: '/settings', component: settings }
]
