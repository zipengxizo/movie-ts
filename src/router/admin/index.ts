import { RouteConfig } from "vue-router";

export const asyncRouterMap: RouteConfig[]  = [
    {
        path : '/usersadmin',
        component : () => import('@/views/Admin/index.vue'),
        meta: { role: ['admin','user'],title:'人员管理' }, 
        children : [
            {
                path : 'users',
                meta: { role: ['admin','user'],title:'人员管理1' }, 
                component : () => import('@/views/Admin/users.vue')
            },
            {
                path : '/usersadmin',
                redirect : '/usersadmin/users'
            }
        ]
    },
    {
        path :'/movieadmin',
        component:()=> import('@/views/Admin/index.vue'),
        meta: { role: ['admin'],title:'电影管理' }, 
        children:[
            {
                path : 'movie',
                meta: { role: ['admin'],title:'电影管理1' }, 
                component : () => import('@/views/Admin/movie.vue')
            },
            {
                path : '/movieadmin',
                redirect : '/movieadmin/movie'
            }
        ]
    },
    {
        path:'/cinemaadmin',
        component:()=> import('@/views/Admin/index.vue'),
        meta: { role: ['admin','user'],title:'影院管理'  }, 
        children:[
            {
                path : 'cinema',
                meta: { role: ['admin','user'],title:'影院管理1'  }, 
                component : () => import('@/views/Admin/cinema.vue')

            },
            {
                path : '/cinemaadmin',
                redirect : '/cinemaadmin/cinema'
            }
        ]
    },
    { path: '*', redirect: '/error'}
]