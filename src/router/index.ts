import Vue from 'vue'
import Router from 'vue-router'
import cinemaRouter from './cinema'
import mineRouter from './mine'
import movieRouter from './movies'
import error from './error'
Vue.use(Router);
export default new Router({
    mode:'history',
    // base: process.env.BASE_URL,
    base: 'movie',
    routes:[
        movieRouter,
        cinemaRouter,
        mineRouter,
        error,
        {
            path:'/',
            redirect:'/movie'
        }
    ]
})
