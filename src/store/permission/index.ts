import {
  asyncRouterMap
} from '@/router/admin';
import cinemaRouter from '@/router/cinema';
import mineRouter from '@/router/mine';
import movieRouter from '@/router/movies';

import { RouteConfig } from "vue-router";
import { Commit } from "vuex";

import { Roles } from "../index";

const constantRouterMap: RouteConfig[] = [cinemaRouter, mineRouter, movieRouter];

function hasPermission(roles: string[], route: RouteConfig) {
  try {
    if (route.meta && route.meta.role) {
      return roles.some((role: string) => route.meta.role.indexOf(role) >= 0)
    } else {
      return true
    }
  } catch (error) {
    console.log(error)
  }
}

export interface State {
  routers: RouteConfig[];
  addRouters: RouteConfig[];
}

const initstate = {
  routers: constantRouterMap,
  addRouters: []
};

const permission = {
  namespaced: true,
  state: initstate,
  mutations: {
    SET_ROUTERS: (state: State, routers: RouteConfig[]) => {
      // state.addRouters = state.addRouters.concat(routers);
      state.addRouters.push(...routers);
      state.routers = constantRouterMap.concat(routers);
    }
  },
  actions: {
    generateRoutes(context: {commit: Commit}, paramRoles: Roles) {
      return new Promise(resolve => {
        const {
          roles
        } = paramRoles;
        //asyncRouterMap 以后根据role获取
        const accessedRouters: RouteConfig[] = asyncRouterMap.filter((v: RouteConfig) => {
          if (roles.indexOf('admin') >= 0) return true;
          if (hasPermission(roles, v)) {
            if (v.children && v.children.length > 0) {
              v.children = v.children.filter(child => {
                if (hasPermission(roles, child)) {
                  return child
                }
                return false;
              });
              return v
            } else {
              return v
            }
          }
          return false;
        });
        context.commit('SET_ROUTERS', accessedRouters);
        resolve(accessedRouters);
      })
    }
  }
};

export default permission;