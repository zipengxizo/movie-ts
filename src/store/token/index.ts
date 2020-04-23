
const initstate: State = {
    token : window.localStorage.getItem("token"),
    fullPath : window.localStorage.getItem("fullPath")
};

export interface Token {
    token: string;
}
export interface FullPath {
    fullPath: string;
}
const mutations = {
    TOKEN(state: State, payload: Token){
        state.token = payload.token;
    },
    FULLPATH(state: State,payload: FullPath){
        state.fullPath = payload.fullPath;
    }
};
export default {
    namespaced : true,
    state : initstate,
    mutations
}



export interface State {
    token: string | null;
    fullPath: string | null;

}