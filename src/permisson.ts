import router from './router'
import { Location } from "vue-router";
import store from './store'
const whiteList = ['/mine/login','/movie/nowPlaying','/movie/nowPlaying',
'/movie/comingSoon','/movie/city','/movie/search','/movie/detail/','/cinema'
,'/mine/register','/mine/findPassword'];
router.beforeEach(async(to, from, next) => {
  if (store.getters.token) {
    if (to.path === '/mine/login') {
      next({ path: '/mine/login' })
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      if (hasRoles) {
        next()
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          /* 用promise
          const { roles } = await store.dispatch('user/getInfo'); */
          // 用await, async
          await store.dispatch('user/getInfo');
          // generate accessible routes map based on roles
          await store.dispatch('permission/generateRoutes', {roles:store.getters.roles});
          // dynamically add accessible routes
          router.addRoutes(store.getters.permissionRoutes);
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          const changeLoaction: Location = {...to,name:'',replace:true};
          next({...changeLoaction})
          // next({replace: true })
        } catch (error) {
          console.log(error)
          // remove token and go to login page to re-login
          //await store.dispatch('user/resetToken')
          next(`/mine/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    /* has no token*/
    //处理带参数的路由
    const filterTo = to.path.replace(/\d+/g,'');
    if (whiteList.indexOf(filterTo) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/mine/login?redirect=${to.path}`)
    }
  }
})