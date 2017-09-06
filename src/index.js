import axios from './libs/axios'

import Hello from './components/hello/Hello'

const components = {
    Hello
}

const install = function (Vue, options = {}) {

    //注册组件
    Object.keys(components).forEach((key) => {
        Vue.component(key, components[key]);
    });

    Vue.use(axios);
};

//通过script方式等引入自动注册全局变量
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {  ...components, install }