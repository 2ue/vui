import Loadding from './loadding.vue';

Loadding.created = (Vue, properties) => {
    const _props = properties || {};

    const Instance = new Vue({
        data: _props,
        render (h) {
            return h(Loadding, { props: _props })
        }
    });

    const component = Instance.$mount();
    const loading = Instance.$children[0];
    document.body.appendChild(component.$el);

    return {
        show () {
            loading.show();
        },
        close(){
            loading.close();
        }
    };
};

export default Loadding;