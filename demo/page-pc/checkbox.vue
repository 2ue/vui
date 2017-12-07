<template>
    <div>
        <p class="vui-page-title">复选框</p>
        <p class="mr-b10">测试size属性： 默认为small，接收三个参数：small,middle,larger</p>
        <v-checkbox type="checkbox">asd</v-checkbox>
        <v-checkbox type="checkbox" size="middle">asd</v-checkbox>
        <v-checkbox type="checkbox" size="larger">asd</v-checkbox>
        <v-checkbox size="small" @onClick="getInfo"></v-checkbox>
        <v-checkbox size="middle"></v-checkbox>
        <v-checkbox size="larger"></v-checkbox>
        <p class="mr-b10">测试checked属性: 接收boolean值，所有非boolean值将会在组件内部使用!转换</p>
        <v-checkbox :checked="false"></v-checkbox>
        <v-checkbox :checked="true"></v-checkbox>
        <br>
        <v-checkbox checked="true" text="textCheckbox" @onClick="getInfo"></v-checkbox>
        <v-checkbox-group :checkboxData="checkboxData" checkedKey="value" name="uuuu" :checkedDatas="checkedDatas" @singleClick="singleClick"
            @updateCheckedDatas="updateCheckedDatas"></v-checkbox-group>
    </div>
</template>

<script>
    export default {
        name: 'checkbox',
        data() {
            return {
                checked: true,
                checkboxData: [{
                    size: 'small',
                    checked: true,
                    value: 1,
                    text: 'tetttt1'
                }, {
                    size: 'small',
                    checked: false,
                    value: 2,
                    text: 'tetttt2'
                }, {
                    size: 'small',
                    checked: false,
                    value: 3,
                    text: 'tetttt3'
                }, {
                    size: 'small',
                    checked: false,
                    value: 4,
                    text: 'tetttt4'
                }],
                checkedDatas: [2, 3, 4]
            }
        },
        methods: {
            getInfo: function (event, checked) {
                console.log('checked inner==>', checked);
            },
            singleClick: function (event, checked, value, index) {
                console.log('checked ==>', checked);
                console.log('value ==>', value);
                console.log('index ==>', index);
            },
            updateCheckedDatas: function (checkedDatas) {
                console.log('checkedDatas=>', checkedDatas)
            }
        }
    }

</script>

<!-- Add "scoped " attribute to limit CSS to this component only -->
<style scoped>
</style>
