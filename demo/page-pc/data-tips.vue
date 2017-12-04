<template>
    <div>
        <p data-tips="测试一下tips">测试一下tips</p>
        <span data-tips="测试一下tips">测试一下span</span>
        <p data-tips="测试一下长文字，还不够长啊，不够长，再来几个字">测试长文字</p>
        <v-button size="larger" data-tips="测试Button" text="测试啊"></v-button>
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
</style>
