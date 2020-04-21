
const state = {
    token : window.localStorage.getItem("token"),
    addRoutes:[],
    fullPath : window.localStorage.getItem("fullPath")
};
const mutations = {
    TOKEN(state: any, payload: any){
        state.token = payload.token;
    },
    FULLPATH(state: any,payload: any){
        state.fullPath = payload.fullPath;
    }
};
const actions = {

}

export default {
    namespaced : true,
    state,
    actions,
    mutations
}