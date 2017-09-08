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
    import util from '../../utils/util.js'
    export default {
        name: 'alert',
        data() {
            return {
                showModal: false,
                showFooter: false,
                title: '提示',
                content: '',
                callback:''
            }
        },
        watch: {
        },
        methods: {
            stopPropagation: function (event) {
                event.stopPropagation();
            },
            show: function (_OPTIONS) {
                const type = util.tryType(_OPTIONS);
                if(type === 'number' || type === 'string'){
                    this.content = _OPTIONS;
                }else if(type === 'object'){
                    this.title = typeof _OPTIONS.title === 'undefined' ? this.title : _OPTIONS.title;
                    this.content = typeof _OPTIONS.html === 'undefined' ? this.content : _OPTIONS.html;
                    this.showFooter = typeof _OPTIONS.footer === 'undefined' ? true : _OPTIONS.footer;
                    this.callback = typeof _OPTIONS.callback === 'undefined' ? '' : _OPTIONS.callback;
                }
                this.showModal = true;
            },
            close: function () {
                this.showModal = false;
                if(typeof this.callback === 'function') this.callback();
            }
        }
    }

</script>

<style lang="less">

</style>