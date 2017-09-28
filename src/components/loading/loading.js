import Loading from "./loading.vue";

Loading.created = (Vue, properties) => {
  const _props = properties || {};

  const instance = new Vue({
    data: _props,
    render(h) {
      return h(Loading, { props: _props });
    }
  });

  const component = instance.$mount();
  document.body.appendChild(component.$el);
  return instance.$children[0];
};

export default Loading;
