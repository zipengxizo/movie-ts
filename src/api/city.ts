import base from './base';
import axios from '../utils/http';

/**
 * 城市模块接口列表
 */

const city = {    
    // 城市列表    
    cityList () {        
        return axios.get(`${base.api2}/city/cityList`);    
    },
}

export default city;