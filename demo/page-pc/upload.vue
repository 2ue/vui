<template>
    <div>
        <p class="vui-page-title">上传组件</p>
        <p class="vui-page-title">测试format属性：接受一个数组，每个元素是文件后缀名，如['jpg','xls']</p>
        <v-upload width="150" multiple="true1" :format="['jpg','xls']"></v-upload>
        <br>

        <p class="vui-page-title">测试size属性：支持数字，和带单位(k,K,kb.KB,m,M,mb,MB)的数字</p>
        <v-upload width="150px" multiple="multiple" size="100kb"></v-upload>
    </div>
</template>

<script>
    export default {
        name: 'upload',
        data() {
            return {}
        },
        methods: {
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
