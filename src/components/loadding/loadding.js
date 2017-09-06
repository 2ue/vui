import Loadding from './loadding.vue';

let loaddingInstance;

const install = (Vue, options) => {

    function getloaddingInstance (o) {
        o = o || Loadding.created( Vue, {} );
        return o;
    }

    loaddingInstance = getloaddingInstance();

    const loadding = {
        show(){
            loaddingInstance.show();
        },
        close(){
            loaddingInstance.close();
        }
    }

    //挂在一些全局方法
    Vue.prototype.$loadding = loadding;
}
export default { install }