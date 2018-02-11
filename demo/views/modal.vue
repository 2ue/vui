<template>
    <div>
        <p class="vui-page-title">测试loading遮罩</p>
        <p>通过this.$loading.show(str | { text:str } | { html:html })唤起，其中参数str表示替换文字，不替换动画；参数html表示整个动画和文字都替换</p>
        <p class="mr-b10">通过this.$loading.close(t)方法关闭：参数t表示延迟关闭的时间</p>
        <v-button @click="showLoading">弹出loading，2s关闭</v-button>
        <p class="vui-page-title">测试alert弹窗</p>
        <p class="mr-b10">通过this.$alert(text,t)调用：参数text表示提示的内容；参数t表示t之后自动关闭，如省略则表示不自动关闭</p>
        <v-button @click="showAlert">弹出alert</v-button>
        <v-modal :options="modalOptions"></v-modal>
    </div>
</template>

<script>
    export default {
        name: 'modal',
        data() {
            return {
                modalOptions: {
                    title: '提示111',
                    showModal: false,
                    showFooter: false,
                    content: '',
                    callback: ''
                }
            }
        },
        methods: {
            show() {
                console.log('button click show')
                this.modalOptions.showModal = true
            },
            showLoading() {
                this.$loading.show();
                this.$loading.close(2000);
            },
            showAlert() {
                this.$alert('轻点啊')
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
