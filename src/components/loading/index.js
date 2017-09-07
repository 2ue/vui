import Loading from "./loading.js";

let loadingInstance;

const install = (Vue, options) => {
  function getloadingInstance(o) {
    o = o || Loading.created(Vue, {});
    return o;
  }
  const loading = {
    show(options) {
      loadingInstance = getloadingInstance(loadingInstance);
      loadingInstance.show(options);
    },
    close() {
      loadingInstance.close();
    }
  };

  //挂在一些全局方法
  Vue.prototype.$loading = loading;
};
export default { install };
