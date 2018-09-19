//globl methods
import Axios from "./libs/axios";
import Loading from "./components/loading";
import Alert from "./components/alert";

import Util from "./utils/util";

//components
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
import TreeMenu from "./components/tree-menu/index.vue";
import Select from "./components/select/index.vue";
import SelectGroup from "./components/select/group.vue";
import Range from "./components/range/index.vue";
import Upload from "./components/upload/index.vue";
import ImageCli from "./components/imagecli/index.vue";

//import css
import "../src/assets/less/vui.scss";

const components = {
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
    Menu,
    TreeMenu,
    Select,
    SelectGroup,
    Range,
    Upload,
    ImageCli
};

const install = function (Vue, options = {}) {
    //register componnets
    Object.keys(components).forEach(key => {
        Vue.component(components[key].name, components[key]);
    });
    const { proxyTableTarget } = options

    //register methods
    Vue.use(Axios, { proxyTableTarget });
    Vue.use(Loading);
    Vue.use(Alert);
    Vue.prototype.$util = Util;
    Vue.prototype.$prefixCls = 'vui-'
};

//mount Vue to global when use it through script tag
if (typeof window !== "undefined" && window.Vue) {
    install(window.Vue);
}

export default { ...components, install };
