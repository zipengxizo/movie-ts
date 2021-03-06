/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios,{ AxiosResponse,AxiosRequestConfig,AxiosError} from 'axios';
import router from '@/router/'
import store from '@/store/index';
import { Toast } from 'vant';
// import 'vant/lib/index.css';


/** 
 * 提示函数 
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = (msg: string) => {    
    Toast({        
        message: msg,        
        duration: 1000,        
        forbidClick: true    
    });
}

/** 
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = (fullPath: string) => {
    router.replace({
        path: '/mine/login',        
        query: {
            redirect: fullPath
        }
    });
}


/** 
 * 请求失败后的错误统一处理 
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status: number, response: AxiosResponse) => {
    // 状态码判断
    switch (status) {
        // 401: 未登录状态，跳转登录页
        case 403:
            tip('登录过期，请重新登录')
            toLogin(response.data.fullPath);
            break;
        // 403 token过期
        // 清除token并跳转登录页
        case 401:
            tip('登录过期，请重新登录');
            window.localStorage.removeItem('token');
            break;
        // 404请求不存在
        case 404:
            tip('请求的资源不存在'); 
            break;
        default:
            console.log(response.data.message);
            tip('网络断开,稍后请重试');
        }}

// 创建axios实例
// const instance = axios.default.create({timeout: 1000 * 10});
const timeout: AxiosRequestConfig = {timeout: 1000*10};
const instance = axios.create(timeout);
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/** 
 * 请求拦截器 
 * 每次请求前，如果存在token则在请求头中携带token 
 */ 
instance.interceptors.request.use(    
    (config: AxiosRequestConfig) => {        
        // 登录流程控制中，根据本地是否存在token判断用户的登录情况        
        // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token        
        // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码        
        // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。        
        // token && (config.headers.Authorization = token);  
        const token = store.getters.token;
        token && (config.headers.token = token);
        return config;    
    },    
    (error: string) => console.log(error))

// 响应拦截器
instance.interceptors.response.use(    
    // 请求成功
    (res: AxiosResponse) => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),    
    // 请求失any败
    (error: AxiosError) => {
        const { response } = error;
        if (response) {
            // 请求已发出，但是不在2xx的范围 
            errorHandle(response.status, response);
            return Promise.reject(response);
        } else {
            // 处理断网的情况
            // eg:请求超时或断网时，更新state的network状态
            // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
            // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
            if (!window.navigator.onLine) {
            //    store.commit('changeNetwork', false);
            }
            tip('网络异常');
            return Promise.reject(error);
        }
    });

export default instance;


