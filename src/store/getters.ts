import { Getter,GetterTree } from "vuex";
import { State} from "./index";


const token: Getter<State,any> = (state: State) =>{
    return state.token.token;
}

const roles: Getter<State,any> = (state: State) =>{
    return state.user.roles;
}

const permissionRoutes: Getter<State,any> = (state: State) =>{
    return state.permission.addRouters
}

const getterTree: GetterTree<State,any> = {
    roles,
    token,
    permissionRoutes,
}

export default getterTree
