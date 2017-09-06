import Loading from './loading.vue';

Loading.created = (Vue, properties) => {
    const _props = properties || {};

    const Instance = new Vue({
        data: _props,
        render (h) {
            return h(Loading, { props: _props })
        }
    });

    const component = Instance.$mount();
    document.body.appendChild(component.$el);
    const loading = Instance.$children[0];

    return {
        show () {
            loading.show();
        },
        close(){
            loading.close();
        }
    };
};

export default Loading;
