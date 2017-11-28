//globl methods
import Axios from "./libs/axios";
import Loading from "./components/loading";
import Alert from "./components/alert";

import Util from "./utils/util";

//components
import Hello from "./components/hello/Hello";
import Button from "./components/button";
import Icon from "./components/icon";
import Input from "./components/input";
import Modal from "./components/modal/modal.vue";
import Checkbox from "./components/checkbox/index.vue";
import CheckboxGroup from "./components/checkbox/group.vue";
import Radio from "./components/radio/index.vue";
import RadioGroup from "./components/radio/group.vue";
import Switch from "./components/switch/index.vue";
import DatePicker from "./components/date-picker/index.vue";
import Menu from "./components/menu/index.vue";

//loading css
// import 'rest-css'
import "./assets/less/vui.less";

const components = {
    Hello,
    Button,
    Icon,
    Input,
    Modal,
    Checkbox,
    CheckboxGroup,
    Radio,
    RadioGroup,
    Switch,
    DatePicker,
    Menu
};

const install = function (Vue, options = {}) {
    //regsiter componnets
    Object.keys(components).forEach(key => {
        Vue.component(components[key].name, components[key]);
    });

    //regsiter methods
    Vue.use(Axios);
    Vue.use(Loading);
    Vue.use(Alert);
    Vue.prototype.$util = Util;
};

//mount Vue to gobol when use it through script tag
if (typeof window !== "undefined" && window.Vue) {
    install(window.Vue);
}

export default { ...components, install };
