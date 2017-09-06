//some globl methods which mounted vue prototype
import axios from './libs/axios'
import Loading from './components/loading'

//components
import Hello from './components/hello/Hello'

//loading css
// import 'rest-css'
import './assets/less/vui.less'

const components = {
    Hello
}

const install = function (Vue, options = {}) {

    //regsiter componnets
    Object.keys(components).forEach((key) => {
        Vue.component(key, components[key]);
    });

    //regsiter methods
    Vue.use(axios);
    Vue.use(Loading);
    // Vue.prototype.$loading = Loading;
};

//mount Vue to gobol when use it through script tag
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {  ...components, install }
