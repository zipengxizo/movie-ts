import { Commit} from "vuex";

import users from '@/api/users';

export interface State {
  name: string | null;
  roles: string[];
}

const initstate: State = {
    name : window.localStorage.getItem('username') || '',
    roles: [],
};

const actions: any = {
  //用async await;
  async getInfo(context: {commit: Commit}){
    const result = await users.getUser();
    const {roles} = result.data.data;
    context.commit('SET_ROLES',roles); 
  },
    //用promise get user info
 /*  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      users.getUser(state.token).then((response: any) => {
        const { data } = response.data;

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        let { roles} = data
        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }
        commit('SET_ROLES', roles);
        resolve(data)
      }).catch((error: string) => {
        reject(error)
      })
    })
  }, */

};

const mutations = {
    USER_NAME(state: any , payload: any){
        state.name = payload.name;
        state.isAdmin = payload.isAdmin;
        state.userHead = payload.userHead;
    },
    SET_ROLES: (state: any, roles: [string]) => {
      state.roles = roles
    }
};

export default {
    namespaced : true,
    state : initstate,
    actions,
    mutations
}