import axios from 'axios'
import loading from '../components/loading'

const install = (Vue, options) => {
    const instance = axios.create({});
    let loadingInstance, showLoading = true;

    function getloadingInstance (o) {
        o = o || loading.created(Vue,{});
        return o;
    }
    //请求拦截操作
    instance.interceptors.request.use(function(config){
        //统一method方法为大写
        config.method = config.method.toUpperCase();
        //是否加载loading动画
        showLoading = typeof config.loading === 'undefined' || !!config.loading;
        if(showLoading){
            loadingInstance = getloadingInstance();
            loadingInstance.show();
        };
        //矫正method与data，params
        //'PUT', 'POST', 和 'PATCH'方法时不允许存在params会报错???
        //非'PUT', 'POST', 和 'PATCH'方法时，如果data不为空会请求两次
        if(config.method == 'GET') {
            config.params = {...config.data};
            config.data = undefined;
        }

        return config;
    },function(error){
        if(showLoading) loadingInstance.close()
        return Promise.reject(error);
    })

    //响应拦截
    instance.interceptors.response.use(function(response){
        const result = {
            status: response.status,
            data: ''
        };
        if(response.status === 200) {
            result.data = response.data;
        }
        if(showLoading) loadingInstance.close()
        return result;
    },function(error){
        if(showLoading) loadingInstance.close()
        return Promise.reject(error.response.data)
    })


    Vue.prototype.$https = instance;
}

export default { install }
