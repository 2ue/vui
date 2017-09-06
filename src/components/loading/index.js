import Loading from './loading.vue';

let loadingInstance;

const install = (Vue, options) => {

    function getloadingInstance (o) {
        o = o || Loading.created( Vue, {} );
        return o;
    }

    loadingInstance = getloadingInstance();

    const loading = {
        show(options){
          console.log(options)
            loadingInstance.show(options);
        },
        close(){
            loadingInstance.close();
        }
    }

    //挂在一些全局方法
    Vue.prototype.$loading = loading;
}
export default { install }
