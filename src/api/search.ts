import base from './base';
import axios from 'axios';



const rearch = {
    rearchList(arg: any){
        axios.get(`${base}searchList`,{
            params : {
                cityId : arg.cityId,
                message : arg.message
            }    
        })
    }
}


export default rearch;