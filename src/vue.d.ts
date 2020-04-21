import Vue from 'vue'
import VueRouter from 'vue-router'
import { Route } from 'vue-router'
import { Store } from'vuex'


declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter;
    $route: Route;
    $store: Store<any>;
    $api: any;

  }
}


declare global {
  interface Window {
    Swiper: any;
  }
}