import Home from './components/Home.vue'
import showQuestions from './components/showQuestions.vue';
import signin from './components/signin.vue';
import signup from './components/signup.vue';
import addquestion from './components/addquestion.vue';
import categories from './components/categories.vue';
import profile from './components/profile.vue';
import settings from './components/settings.vue';
import game from './components/game.vue';
import check_win from './game/check_win.js';
import data from './game/data.js';
import make_moves from './game/make_moves.js';
import setup_game from './game/setup_game.js';
import jquery from '../node_modules/jquery-ui/ui//widgets/dialog.js';
import css from './game/style.css';
//'jquery-ui/ui/widgets/dialog.js'
export default[
    { path: '/', component: Home},
    { path: '/top', component: showQuestions },
    { path: '/signin', component: signin },
    { path: '/signup', component: signup },
    { path: '/addquestion', component: addquestion },
    { path: '/categories', component: categories },
    { path: '/profile', component: profile },
    { path: '/settings', component: settings },
    { path: '/game', component: game},
    { path: '/game/checkWin', component: check_win},
    { path: '/game/data', component: data},
    { path: '/game/makeMoves', component: make_moves},
    { path: '/game/setupGame', component: setup_game},
    { path: '/game/jquery', component: jquery},
    { path: '/game/css', component: css}

]
