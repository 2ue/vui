<template>
    <div>
        <p class="vui-page-title">复选框-单个</p>
        <p class="mr-b10">测试size属性： 默认为small，接收三个参数：small,middle,larger</p>
        <v-radio>default</v-radio>
        <v-radio size="small">small</v-radio>
        <v-radio size="middle">middle</v-radio>
        <v-radio size="larger">larger</v-radio>
        <br>
        <p class="mr-b10">测试checked属性: 接收boolean值，所有非boolean值将会在组件内部使用!转换</p>
        <v-radio :checked="false">checked：false</v-radio>
        <v-radio :checked="true">checked：true</v-radio>
        <br>
        <p class="mr-b10">测试disbaled属性: 接收boolean值，所有非boolean值将会在组件内部使用!转换,会自动禁用各种事件</p>
        <v-radio>checked：false</v-radio>
        <v-radio :disabled="true">checked：false</v-radio><br>
        <v-radio :checked="true">checked：true</v-radio>
        <v-radio :checked="true" :disabled="true">checked：true</v-radio>
        <br>
        <p class="mr-b10">测试name属性</p>
        <v-radio name="radio11">radio11</v-radio>
        <v-radio name="radio22">radio22</v-radio>
        <br>
        <p class="mr-b10">测试name属性</p>
        <v-radio @onClick="onClick">click事件</v-radio>

        <p class="vui-page-title">复选框-群组</p>
        <p class="mr-b10">测试size和name属性： 作为一个群组，他们的size和name应该是相同的</p>
        <v-radio-group :groupData="radioData" :checkedData="checkedDatas" size="middle" name="group-radio1"></v-radio-group>
        <br>
        <p class="mr-b10">测试disabled属性： 为true将会禁用整个群组的组件，禁用单个组件建议自己使用单组件循环，后期后期考虑加上此功能</p>
        <v-radio-group :groupData="radioData" :checkedData="checkedDatas" disabled="true" name="group-radio9"></v-radio-group>
        <br>
        <p class="mr-b10">测试groupData： 必须参数，其中text为必须字段</p>
        <pre><code data-language="javascript">{{radioData}}</code></pre>
        <v-radio-group :groupData="radioData" name="group-radio2"></v-radio-group>
        <br>
        <p>测试checkedDatas和checkedKey： checkedDatas是一个字符串，表示被选中的radio，checkedKey是一个字符串，默认为index，用来表示checkedData与groupData的对应关系。输出选中的数据也按checkedKey输出</p>
        <p class="mr-b10">checkedData为3</p>
        <v-radio-group :groupData="radioData" :checkedData="checkedDatas" name="group-radio3">不设置checkedKey：</v-radio-group>
        <v-radio-group :groupData="radioData" :checkedData="checkedDatas" checkedKey="value" name="group-radio4">设置checkedKey=value：</v-radio-group>
        <br>
        <p class="mr-b10">测试事件属性singleClick和updateCheckedDatas</p>
        <v-radio-group :groupData="radioData" :checkedData="checkedDatas" name="group-radio5"></v-radio-group>
        <v-radio-group :groupData="radioData" :checkedData="checkedDatas" name="group-radio6" checkedKey="value" @onClick="singleClick"></v-radio-group>
    </div>
</template>

<script>
    export default {
        name: 'radio',
        data() {
            return {
                checked: true,
                radioData: [{
                    value: 1,
                    text: 'radio1'
                }, {
                    value: 2,
                    text: 'radio2'
                }, {
                    size: 'small',
                    value: 3,
                    text: 'radio3'
                }, {
                    value: 4,
                    text: 'radio4'
                }],
                checkedDatas: 3
            }
        },
        methods: {
            onClick: function (event, value, index) {
                console.log('value ==>', value);
                console.log('index ==>', index);
            },
            singleClick: function (event, value, index) {
                console.log('value ==>', value);
                console.log('index ==>', index);
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
