import Loading from "./loading.js";

let instance;

const install = (Vue, _OPTIONS) => {
  function getInstance(o) {
    o = o || Loading.created(Vue, _OPTIONS || {});
    return o;
  }
  const units = {
    show(options) {
        instance = getInstance(instance);
        instance.show(options);
    },
    close() {
        instance.close();
    }
  };

  //挂在一些全局方法
  Vue.prototype.$loading= units;
};
export default { install };
