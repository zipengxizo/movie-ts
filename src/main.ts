import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './permisson.ts';
Vue.config.productionTip = false
const Loading = ()=> import('@/components/Loading/index.vue');
Vue.component('Loading',Loading);

const Scroller = ()=> import('@/components/Scroller/index.vue');
Vue.component('Scroller',Scroller);

import api from '@/api/index';
Vue.prototype.$api = api;

Vue.filter('replaceWh',(url: string,arg: string)=>{
  return url.replace(/w\.h/,arg);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
