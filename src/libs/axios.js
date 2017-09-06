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
    //请求拦截操作
    instance.interceptors.request.use(function(config){
        //统一method方法为大写
        config.method = config.method.toUpperCase();
        //是否加载loadding动画
        showLoadding = typeof config.loadding === 'undefined' || !!config.loadding;
        if(showLoadding){
            loaddingInstance = getloaddingInstance();
            loaddingInstance.show();
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
        if(showLoadding) loaddingInstance.close()
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
        if(showLoadding) loaddingInstance.close()
        return result;
    },function(error){
        if(showLoadding) loaddingInstance.close()
        return Promise.reject(error.response.data) 
    })

    //挂在一些全局方法
    Vue.prototype.$https = instance;
}

export default { install }