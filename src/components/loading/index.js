import Loading from "./loading.js";

let instance;

const install = (Vue) => {
    const methods = {
        show(options) {
            //调用时才创建,并且保持不销毁
            instance = instance || Loading.created(Vue);
            instance.show(options);
        },
        close(t) {
            instance.close(t);
        }
    };

    Vue.prototype.$loading = methods;
};
export default { install };
