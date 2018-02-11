<template>
    <div>
        <p class="vui-page-title">模拟原生title提示：自动相对于有data-tips属性元素自动居中</p>
        <br>
        <span data-tips="测试一下span标签">测试一下span标签</span>
        <br>
        <p data-tips="测试一下p标签">测试一下p标签</p>
        <br>
        <span data-tips="测试一段长文字2333333333333333333333333333333333333333333333333">测试长文字</span>
        <br>
        <v-button data-tips="测试Button" text="测试Button"></v-button>
    </div>
</template>

<script>
    export default {
        name: 'dataTips',
        data() {
            return {
            }
        },
        methods: {
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    div {
        margin: 20px 0;
    }
</style>
