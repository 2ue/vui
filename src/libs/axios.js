import axios from 'axios'
import Loading from '../components/loading/loading.js'

const install = (Vue, options) => {
  const instance = axios.create({});
  let loadingInstance, showLoading = true;

  function getloadingInstance (o) {
    o = o || Loading.created( Vue, {} );
    return o;
  }

  function closeLoading() {
    if(showLoading) {
      setTimeout(function () {
        loadingInstance.close();
        loadingInstance = undefined;
      }, 500)
    }
  }

  //doc https://www.kancloud.cn/yunye/axios/234845
  //interceptors request
  instance.interceptors.request.use(function(config){
    //change to toUpperCase
    config.method = config.method.toUpperCase();
    //showLoading
    showLoading = typeof config.loading === 'undefined' || !!config.loading;
    if(showLoading){
      loadingInstance = getloadingInstance();
      loadingInstance.show();
    };
    //fixed method and data/params
    //'PUT', 'POST', 和 'PATCH'方法时不允许存在params会报错???
    //非'PUT', 'POST', 和 'PATCH'方法时，如果data不为空会请求两次
    if(config.method == 'GET') {
      config.params = { ...config.data };
      config.data = undefined;
    }

    return config;
  },function(error){
    closeLoading();
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
    closeLoading();
    return result;
  },function(error){
    closeLoading();
    return Promise.reject(error.response.data)
  })

  //mount $https to vue prototype
  Vue.prototype.$https = instance;
}

export default { install }
