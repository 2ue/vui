<template>
    <div>
        <p class="vui-page-title">测试type属性：必须参数</p>
        <v-icon type="love"></v-icon>
        <v-icon type="add"></v-icon>
        <v-icon type="user"></v-icon>
        <v-icon type="dianpu"></v-icon>
        <v-icon type="notice"></v-icon>
        <v-icon type="message"></v-icon>
        <br/>

        <p class="vui-page-title">测试size属性：默认是middle</p>
        <v-icon type="collection"></v-icon>
        <v-icon type="collection" size="small"></v-icon>
        <v-icon type="collection" size="middle"></v-icon>
        <v-icon type="collection" size="larger"></v-icon>

        <p class="vui-page-title">测试color属性： 默认是父集字体颜色，要求传入的字符串能正确解析成颜色，否则将会被忽略</p>
        <v-icon type="delete" size="middle" color="#f30"></v-icon>
        <v-icon type="delete" size="middle" color="#eee"></v-icon>

        <p class="vui-page-title">测试style属性：能正常解析style属性，也就意味着可以通过style修改color和font-size，请慎用</p>
        <v-icon type="setting" style="font-size:40px;color:#6772E5;"></v-icon>
        <v-icon type="help" style="font-size:60px;color:#FFCC66;"></v-icon>
    </div>
</template>

<script>
    export default {
        name: 'icon',
        data() {
            return {}
        },
        methods: {}
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
