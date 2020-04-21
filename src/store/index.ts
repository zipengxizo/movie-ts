import Vue from 'vue'
import Vuex from 'vuex'
import city from './city'
import user from './user'
import token from './token';
import permission from './permission';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  getters:{
    /* roles: state => state.user.roles,
    permission_routes: state => state.permission.addRouters,
    token : state => state.token.token */
  },
  mutations: {

  },
  actions: {

  },
  modules : {
    city,
    user,
    token,
    permission
  }
})
