import Modal from "./modal.vue";

Modal.created = (Vue, properties) => {
    const instance = new Vue({
        render: h => h(Modal)
    });

    const component = instance.$mount();
    document.body.appendChild(component.$el);
    return instance.$children[0];
};

export default Modal;
