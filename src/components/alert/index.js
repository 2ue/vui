import Alert from './alert.js';

let instance;

const install = (Vue, _OPTIONS) => {
  function getInstance(o) {
    o = o || Alert.created(Vue, _OPTIONS || {});
    return o;
  }
//   const units = {
//     show(options) {
//         instance = getInstance(instance);
//         instance.show(options);
//     },
//     close() {
//         instance.close();
//     }
//   };
  const show = options => {
    instance = getInstance(instance);
    instance.show(options);
  }

  //挂在一些全局方法
  Vue.prototype.$alert = show;
};
export default { install };
