//some globl methods which mounted vue prototype
import axios from './libs/axios'
import Loadding from './components/loadding'

//components
import Hello from './components/hello/Hello'

//loadding css
import 'rest-css'

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
    Vue.use(Loadding);
    // Vue.prototype.$loadding = Loadding;
};

//mount Vue to gobol when use it through script tag
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {  ...components, install }