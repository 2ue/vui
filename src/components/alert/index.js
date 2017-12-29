import Alert from "../modal/modal.js";

let instance;

const install = (Vue) => {
    const show = (text, t) => {
        const options = { footer: false, content: text };
        instance = instance || Alert.created(Vue);
        instance.show(options);
        if (t) {
            setTimeout(() => {
                instance.close();
            }, t);
        }
    };
    Vue.prototype.$alert = show;
};
export default { install };
