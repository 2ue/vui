<template>
        <div class="vui-shade" v-if="showModal" @click="close">
            <div class="vui-modal" @click="stopPropagation">
                <div class="vui-modal-header">
                    <p class="vui-modal-title vui-clear">
                        {{title}}
                        <span class="vui-right vui-close" @click="close">x</span>
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
                    optionsItem: typeof this.options === 'object' ? { ...this.options } : this.options
                }
            },
            watch: {
                optionsItem: {
                    handler(options) {
                        if (this.$util.tryType(options) === 'object') {
                            const _OPTIONS = { ...OPTIONS_DEFALUT, ...options };
                            this.title = _OPTIONS.title;
                            this.content = _OPTIONS.content;
                            this.showFooter = _OPTIONS.footer;
                            this.callback = _OPTIONS.callback;
                            this.showModal = _OPTIONS.showModal;
                        }else{
                            this.content = options;
                        }
                    },
                    deep: true
                },
                options: {
                    handler(options){
                        this.optionsItem = typeof options === 'object' ? { ...options } : options;
                    },
                    deep: true
                }
            },
            props: {
                options: {
                    type: [Object, Number, String]
                }
            },
            methods: {
                stopPropagation: function (event) {
                    event.stopPropagation();
                },
                show: function (_OPTIONS) {
                    if(!!_OPTIONS) this.optionsItem = typeof _OPTIONS === 'object' ? { ..._OPTIONS, showModal: true } : { content: _OPTIONS, showModal: true};
                },
                close: function () {
                    this.showModal = false;
                    if (typeof this.callback === 'function') this.callback();
                }
            }
        }

    </script>

    <style lang="less">

    </style>
