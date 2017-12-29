import Loading from "./loading.vue";

Loading.created = (Vue) => {
    const instance = new Vue({
        render: h => h(Loading)
    }).$mount();

    document.body.appendChild(instance.$el);
    return instance.$children[0];
};

export default Loading;
