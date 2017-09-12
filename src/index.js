//some globl methods which mounted vue prototype
import axios from './libs/axios'
import Loading from './components/loading'
import Alert from './components/alert'

import Util from './utils/util'

//components
import Hello from './components/hello/Hello'
import Button from './components/button'

//loading css
// import 'rest-css'
import './assets/less/vui.less'

const components = {
  Hello,
  Button
}

const install = function (Vue, options = {}) {

  //regsiter componnets
  Object.keys(components).forEach((key) => {
    Vue.component(components[key].name, components[key]);
  });

  //regsiter methods
  Vue.use(axios);
  Vue.use(Loading);
  Vue.use(Alert);
  Vue.prototype.$util = Util;
};

//mount Vue to gobol when use it through script tag
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {  ...components, install }
