import Loading from "./loading.js";

let instance;

const install = (Vue) => {
    function getInstance(o) {
        o = o || Loading.created(Vue);
        return o;
    }
    const units = {
        show(options) {
            instance = getInstance(instance);
            instance.show(options);
        },
        close(t) {
            instance.close(t);
        }
    };

    //挂在一些全局方法
    Vue.prototype.$loading = units;
};
export default { install };
