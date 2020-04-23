

const initstate: State = {
    cityName : window.localStorage.getItem('nowNm') || '北京',
    cityId : window.localStorage.getItem('nowId') || 1
};

export interface State {
    cityName: string;
    cityId: number | string;
}

//同步
const mutations = {
        CITY_INFO(state: State , payload: State){
        state.cityName = payload.cityName;
        state.cityId = payload.cityId;
    }
};

export default {
    namespaced : true,
    state : initstate,
    mutations
}