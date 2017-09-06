import Loading from './loading.vue';

let loadingInstance;

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
  loadingInstance = Instance.$children[0];
  return loadingInstance;

};

export default Loading;
