<template>
    <div>
        <p class="vui-page-title">测试check属性：接受布尔，数值，字符串，会按规则转化</p>
        <v-switch>checked为false</v-switch>
        <v-switch checked="true">checked为true</v-switch>

        <p class="vui-page-title">测试其他属性：name和value等</p>
        <v-switch name="name1">name为name1</v-switch>
        <v-switch value="value1">name为value1</v-switch>

        <p class="vui-page-title">事件绑定：change事件，disabled不设置或者设置为false（包括undefined，0等隐性false）时不会禁用change事件</p>
        <v-switch @change="onChange">未设置disabled</v-switch>
        <br>
        <v-switch disabled="false" @change="onChange">disabled为字符串false</v-switch>
        <br>
        <v-switch :disabled="false" @change="onChange">disabled为布尔值false</v-switch>
        <br>
        <v-switch :disabled="0" @change="onChange">disabled为数值0</v-switch>
        <br>
        <v-switch disabled @change="onChange">disabled未定义任何值</v-switch>
        <br>
        <v-switch disabled="true" @change="onChange">disabled为字符串true</v-switch>
        <br>
        <v-switch :disabled="true" @change="onChange">disabled为布尔值true</v-switch>
        <br>
        <v-switch disabled="disbaled" @change="onChange">disabled为其他字符串或数字</v-switch>
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
