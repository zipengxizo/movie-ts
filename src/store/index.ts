import Vue from 'vue'
import Vuex from 'vuex'
import city, {State as cityState} from './city'
import user, {State as userState} from './user'
import token,{State as tokenSate} from './token';
import permission,{State as permissionState} from './permission';
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  modules : {
    city,
    user,
    token,
    permission
  }
})

export interface State {
  token: tokenSate;
  user: userState;
  city: cityState;
  permission: permissionState;
}

export interface Roles {
  roles: string[];
}
