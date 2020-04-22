import base from './base';
import axios from '@/utils/http';

/**
 * movie模块接口列表
 */

const movie = {    
    // 正在热映    
    movieOnList (arg: any) { 
        return axios.get(`${base.api2}/movie/movieOnInfoList`,{
            params :{
                cityId : arg.cityId
            }
        });    
    },    
    // 即将上映    
    movieComingList (arg: any) {
        return axios.get(`${base.api1}/movieComingList`,{
            params :{
                cityId:arg.cityId
            }
        });    
    },        
    // 电影详情 
    movieDetail (arg: any) {        
        return axios.get(`${base.api1}/detailmovie`, { 
            params : {
                movieId : arg.movieId
            }           
        });    
    },
}

export default movie;