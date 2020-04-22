import base from './base';
import axios from '@/utils/http';

/**
 * cinema模块接口列表
 */

const cinema = {    
    // 影院列表    
    cinemaList (arg: any) {        
        return axios.get(`${base.api2}/cinema/cinemaList`,{
            params : {
                cityId : arg.cityId
            }
        });    
    }
}

export default cinema;