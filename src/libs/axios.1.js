import Vue from "vue";
import axios from "axios";

const instance = axios.create({});
//可以根据url或者约定的字段(假如定义一个postToken)来判断是否添加token信息
//请求
instance.interceptors.request.use(function (config) {
    config.method = config.method.toUpperCase();
    if (config.method == "GET") {
        config.params = { ...config.data };
        config.data = undefined;
    }
    //默认登陆接口，或者postToken字段为显示的设置为false是不需要添加token字段
    if (config.url !== '/login' && config.postToken !== false) config.headers.Authorization = window.localStorage.getItem('token');
    return config;
}, function (error) {
    return Promise.reject(error);
});

//响应
instance.interceptors.response.use(function (response) {
    const result = {
        status: response.status,
        data: ''
    };
    //返回信息,约定一个code表示token失效,假如是900
    if (result.code === 900) {
        window.location.href = '/login';
    } else if (response.status === 200) {
        result.data = response.data;
    }
    //对于某些会返回token的接口，需要更新本地缓存的接口
    if (result.data.token) window.localStorage.setItem('token', result.data.token);
    return result;
}, function (error) {
    return Promise.reject(error.response);
});

Vue.prototype.$https = instance;

