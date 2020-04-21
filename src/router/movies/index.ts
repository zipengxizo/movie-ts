

export default {
    path:'/movie',
    component:() => import('@/views/Movies/index.vue'),
    children:[
        {
            path:'nowPlaying',
            component:()=>import('@/components/NowPlaying/index.vue')
        },
        {
            path:'comingSoon',
            component:()=>import('@/components/ComingSoon/index.vue')
        },
        {
            path : 'city',
            component:()=>import('@/components/City/index.vue')
        },
        {
            path : 'search',
            component:()=>import('@/components/Search/index.vue')
        },
        {
            path : 'detail/:movieId',
            components : {
                // default : ()=> import('@/components/NowPlaying'),
                detail : ()=> import('@/views/Movies/detail.vue')
            },
            props : {
                detail : true
            }
        },
        {
            path : '/movie',
            redirect : '/movie/nowPlaying'
        }
    ]
}