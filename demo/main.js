// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./libs/router";

//import vui
import Vui from "../src";

Vue.use(Vui, {
    proxyTableTarget: process.env.NODE_ENV === 'production' ? undefined : '/api'
});
Vue.config.productionTip = false;

new Vue({
    el: "#app",
    template: "<App/>",
    components: { App },
    router
});
