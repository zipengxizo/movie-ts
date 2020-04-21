export default {
    path:'/mine',
    component:() => import('@/views/Mine/index.vue'),
    children : [
        {
            path : 'center',
            component : () => import('@/views/Mine/center.vue')
        },
        {
            path : 'login',
            component : () => import('@/components/Login/index.vue')
        },
        {
            path : 'register',
            component : () => import('@/components/Register/index.vue')
        },
        {
            path : 'findPassword',
            component : () => import('@/components/FindPassword/index.vue')
        },
        {
            path : '/mine',
            redirect : 'center'
        }
    ] 
}