import base from './base';
import axios from '@/utils/http';


const users = {
    login(params: any) {
        return axios.post(`${base.api2}/users/login`,params)
    },
    register(params: any) {
        return axios.post(`${base.api2}/users/register`,params)
    },
    usersList() {
        return axios.get(`${base.api2}/admin/usersList`);
    },
    deleteUser(params: any) {
        return axios.post(`${base.api2}/admin/deleteUser`,{
            params : params
        })
    },
    updateFreeze(params: any) {
        return axios.post(`${base.api2}/admin/updateFreeze`,params)
        
    },
    verifyImg() {
        return `${base.api2}/users/verifyImg`
    },
    getUser() {
        return axios.get(`${base.api2}/users/getUser`)
    },
    uploadUserHead(params: any,config: any) {

        return axios.post(`${base.api2}/users/uploadUserHead`,params,config)
        
    },
    logout() {
        return axios.get(`${base.api2}/users/logout`)
        
    },
    isAdmin(params: any) {
        return axios.post(`${base.api2}/admin`,params)
    },
    verify(params: any) {
        return axios.get(`${base.api2}/users/verify`,params)
    }

}

export default users;