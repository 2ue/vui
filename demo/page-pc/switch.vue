<template>
    <div>
        <p class="vui-page-title">测试check属性：接受布尔，数值，字符串，会按规则转化</p>
        <v-switch>checked为false</v-switch>
        <v-switch checked="true">checked为true</v-switch>
        <br>

        <p class="mr-b10">测试disbaled属性: 接收boolean值，所有非boolean值将会在组件内部使用!转换,会自动禁用各种事件</p>
        <v-switch>checked：false</v-switch>
        <v-switch :disabled="true">checked：true</v-switch>
        <v-switch :checked="true">checked：true</v-switch>
        <v-switch :checked="true" :disabled="true">checked：true</v-switch>
        <br>
        <p class="vui-page-title">测试其他属性：name和value等</p>
        <v-switch name="test">name为test</v-switch>
        <v-switch value="2">name为2</v-switch>
        <br>

        <p class="vui-page-title">事件绑定：change事件</p>
        <v-switch @change="onChange">未设置disabled</v-switch>
        <br>
        <v-switch :disabled="true" @change="onChange">disabled为true</v-switch>
        <br>
    </div>
</template>

<script>
    export default {
        name: 'switch',
        data() {
            return {
                checked: false
            }
        },
        methods: {
            onChange: function (event, checked) {
                console.log('checked==>', checked)
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
