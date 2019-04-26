import axios from "axios";
import Loading from "../components/loading/loading.js";

const install = (Vue, _OPTIONS = {}) => {
    const instance = axios.create(_OPTIONS || {});
    let loadingInstance,
        showLoading = true;

    function getLoadingInstance(o) {
        o = o || Loading.created(Vue);
        return o;
    }

    function toCloseLoading() {
        if (showLoading) {
            setTimeout(function () {
                loadingInstance.close();
            }, 500);
        }
    }

    function toShowLoading() {
        if (showLoading) {
            loadingInstance = getLoadingInstance(loadingInstance);
            loadingInstance.show();
        }
    }

    //doc https://www.kancloud.cn/yunye/axios/234845
    //interceptors request
    instance.interceptors.request.use(
        (config) => {
            toShowLoading();
            const { method, loading, data, url, proxyTableTarget, crossDomain } = config
            //change to toUpperCase
            config.method = method.toUpperCase();
            //showLoading
            showLoading = typeof loading === "undefined" || !!loading;
            //fixed method and data/params
            //'PUT', 'POST', 和 'PATCH'方法时不允许存在params会报错???
            //非'PUT', 'POST', 和 'PATCH'方法时，如果data不为空会请求两次
            if (method == "GET") {
                config.params = { ...data };
                config.data = undefined;
            }
            console.log(proxyTableTarget)
            if ((typeof crossDomain === 'undefined' || crossDomain || /^http[s]{0, 1}:\/\//.test(url)) && proxyTableTarget) {
                config.url = `${proxyTableTarget}${url}`
            }
            return config;
        },
        (error) => {
            toCloseLoading();
            return Promise.reject(error);
        }
    );

    //interceptors response
    instance.interceptors.response.use(
        (response) => {
            const result = {
                status: response.status,
                data: ''
            };
            if (response.status === 200) {
                result.data = response.data;
            }
            toCloseLoading();
            return result;
        },
        (error) => {
            toCloseLoading();
            return Promise.reject(error.response.data);
        }
    );

    //mount $https to vue prototype
    Vue.prototype.$https = instance;
};

export default { install };
