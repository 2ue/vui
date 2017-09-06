import axios from 'axios'
import loadding from '../components/loadding/loadding.js'

const install = (Vue, options) => {
    const instance = axios.create({});
    let loaddingInstance, showLoadding = true;
    
    function getloaddingInstance (o) {
        o = o || Loadding.created( Vue, {} );
        return o;
    }

    //doc https://www.kancloud.cn/yunye/axios/234845
    //interceptors request
    instance.interceptors.request.use(function(config){
        //change to toUpperCase
        config.method = config.method.toUpperCase();
        //showLoadding
        showLoadding = typeof config.loadding === 'undefined' || !!config.loadding;
        if(showLoadding){
            loaddingInstance = getloaddingInstance();
            loaddingInstance.show();
        };
        //fixed method and data/params
        //'PUT', 'POST', 和 'PATCH'方法时不允许存在params会报错???
        //非'PUT', 'POST', 和 'PATCH'方法时，如果data不为空会请求两次
        if(config.method == 'GET') {
            config.params = {...config.data};
            config.data = undefined;
        }
        
        return config;
    },function(error){
        if(showLoadding) loaddingInstance.close()
        return Promise.reject(error);
    })
    
    //interceptors response
    instance.interceptors.response.use(function(response){
        const result = { 
            status: response.status,
            data: ''
        };
        if(response.status === 200) {
            result.data = response.data;
        }
        if(showLoadding) loaddingInstance.close()
        return result;
    },function(error){
        if(showLoadding) loaddingInstance.close()
        return Promise.reject(error.response.data) 
    })

    //mount $https to vue prototype
    Vue.prototype.$https = instance;
}

export default { install }