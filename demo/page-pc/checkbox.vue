<template>
    <div>
        <p class="vui-page-title">复选框-单个</p>
        <p class="mr-b10">测试size属性： 默认为small，接收三个参数：small,middle,larger</p>
        <v-checkbox>default</v-checkbox>
        <v-checkbox size="small">small</v-checkbox>
        <v-checkbox size="middle">middle</v-checkbox>
        <v-checkbox size="larger">larger</v-checkbox>
        <br>
        <p class="mr-b10">测试checked属性: 接收boolean值，所有非boolean值将会在组件内部使用!转换</p>
        <v-checkbox :checked="false">checked：false</v-checkbox>
        <v-checkbox :checked="true">checked：true</v-checkbox>
        <br>
        <p class="mr-b10">测试name属性</p>
        <v-checkbox name="checkbox1">checkbox1</v-checkbox>
        <v-checkbox name="checkbox2">checkbox2</v-checkbox>
        <br>
        <p class="mr-b10">测试name属性</p>
        <v-checkbox @onClick="onClick">click事件</v-checkbox>

        <p class="vui-page-title">复选框-群组</p>
        <p class="mr-b10">测试size和name属性： 作为一个群组，他们的size和name应该是相同的</p>
        <v-checkbox-group :groupData="checkboxData" :checkedData="checkedDatas" size="middle" name="group-checkbox"></v-checkbox-group>
        <br>
        <p class="mr-b10">测试groupData： 必须参数,其中text为必须字段</p>
        <pre><code data-language="javascript">{{checkboxData}}</code></pre>
        <v-checkbox-group :groupData="checkboxData"></v-checkbox-group>
        <br>
        <p>测试checkedDatas和checkedKey： checkedDatas是一个数组，表示被选中的checkbox，checkedKey是一个字符串，默认为index，用来表示checkedData与groupData的对应关系。输出选中的数据也按checkedKey输出</p>
        <p class="mr-b10">checkedData为[1,2,3]</p>
        <v-checkbox-group :groupData="checkboxData" :checkedData="checkedDatas" @updateCheckedDatas="updateCheckedDatas">不设置checkedKey：</v-checkbox-group>
        <v-checkbox-group :groupData="checkboxData" :checkedData="checkedDatas" checkedKey="value" @updateCheckedDatas="updateCheckedDatas">设置checkedKey=value：</v-checkbox-group>
        <br>
        <p class="mr-b10">测试事件属性singleClick和updateCheckedDatas</p>
        <v-checkbox-group :groupData="checkboxData" :checkedData="checkedDatas" @updateCheckedDatas="updateCheckedDatas"></v-checkbox-group>
        <v-checkbox-group :groupData="checkboxData" :checkedData="checkedDatas" @singleClick="singleClick" checkedKey="value"></v-checkbox-group>
    </div>
</template>

<script>
    export default {
        name: 'checkbox',
        data() {
            return {
                checked: true,
                checkboxData: [{
                    value: 1,
                    text: 'checkbox1'
                }, {
                    value: 2,
                    text: 'checkbox2'
                }, {
                    size: 'small',
                    value: 3,
                    text: 'checkbox3'
                }, {
                    value: 4,
                    text: 'checkbox4'
                }],
                checkedDatas: [1, 2, 3]
            }
        },
        methods: {
            onClick: function (event, checked) {
                console.log('checked inner==>', checked);
                alert(checked ? '选中了' : '取消了');
            },
            singleClick: function (event, checked, value, index) {
                console.log('checked ==>', checked);
                console.log('value ==>', value);
                console.log('index ==>', index);
            },
            updateCheckedDatas: function (checkedDatas) {
                console.log('checkedDatas=>', checkedDatas)
                alert('选中了：' + checkedDatas.join());
            }
        }
    }

</script>

<!-- Add "scoped " attribute to limit CSS to this component only -->
<style scoped lang="scss">
    pre {
        position: relative;
        word-wrap: break-word;
        white-space: pre-wrap;
        padding: 6px 10px;
        background-color: #f5f5f5;
        font-size: 14px;
        border: 1px solid #ccc;
        border-radius: 4px;
        overflow: hidden;
        color: $font-color-main;
    }
</style>