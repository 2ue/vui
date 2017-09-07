<template>
    <div class="vui-shade" v-if="showModal" @click="close">
        <div class="vui-modal" @click="stopPropagation">
            <div class="vui-modal-head">
                <p class="vui-modal-title vui-clear">
                    {{title}}
                    <span class="vui-right" @click="close">x</span>
                </p>
            </div>
            <div class="vui-modal-body" v-if="!content">
            </div>
            <div v-else></div>
            <div class="vui-modal-footer">
                <span>确定</span>
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
                showModal: true,
                title: '标题标题',
                content: ''
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
                console.log('type==>',type)
                this.showModal = true;
            },
            close: function () {
                console.log('close==>');
                this.showModal = false;
            }
        }
    }

</script>

<style lang="less">

</style>