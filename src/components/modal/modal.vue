<template>
    <div class="vui-modal-shade" v-if="showModal" @click.self="close">
        <div class="vui-modal">
            <div class="vui-modal-header">
                <p class="vui-modal-title vui-clear">
                    {{title}}
                    <v-icon class="vui-modal-close" type="close" size="small" @click="close"></v-icon>
                </p>
            </div>
            <div class="vui-modal-body vui-modal-content" v-if="!content">
            </div>
            <div class="vui-modal-body" v-else v-html="content"></div>
            <div class="vui-modal-footer" v-if="showFooter">
                <span class="vui-button">确定</span>
                <span>取消</span>
            </div>
        </div>
    </div>
</template>

<script>

    //默认配置
    const OPTIONS_DEFALUT = {
        title: '提示',
        showModal: false,
        showFooter: false,
        content: '',
        callback: ''
    };

    export default {
        name: 'vModal',
        data() {
            return {
                ...OPTIONS_DEFALUT,
                // selfOoptions: typeof this.options === 'object' ? { ...this.options } : this.options
                selfOoptions: {}
            }
        },
        watch: {
            selfOoptions: {
                handler(options) {
                    if (this.$util.tryType(options) === 'object') {
                        const _OPTIONS = { ...OPTIONS_DEFALUT, ...options };
                        this.title = _OPTIONS.title;
                        this.content = _OPTIONS.content;
                        this.showFooter = _OPTIONS.footer;
                        this.callback = _OPTIONS.callback;
                        this.showModal = _OPTIONS.showModal;
                    } else {
                        this.content = options;
                    }
                },
                deep: true
            },
            // options: {
            //     handler(options) {
            //         this.selfOoptions = typeof options === 'object' ? { ...options } : options;
            //     },
            //     deep: true
            // }
        },
        // props: {
        //     options: {
        //         type: [Object, Number, String]
        //     }
        // },
        methods: {
            show: function (_OPTIONS) {
                if (!!_OPTIONS) this.selfOoptions = typeof _OPTIONS === 'object' ? { ..._OPTIONS, showModal: true } : { content: _OPTIONS, showModal: true };
            },
            close: function () {
                this.showModal = false;
                if (typeof this.callback === 'function') this.callback();
            }
        }
    }

</script>

<style lang="scss">
</style>
