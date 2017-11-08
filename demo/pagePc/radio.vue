<template>
    <div>
        <v-radio size="small" :checked="false" name="iiii">
            <span slot="text">asdas</span>
        </v-radio>
        <v-radio size="small" :checked="checked" text="textCheckbox" @onClick="getInfo"></v-radio>
        <v-radio-group :checkboxData="checkboxData" checkedKey="value" name="uuuu" :checkedDatas="checkedDatas" @singleClick="singleClick"
            @updateCheckedDatas="updateCheckedDatas"></v-radio-group>
    </div>
</template>

<script>
    export default {
        name: 'radio',
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
                console.log('checked==>', this.checked)
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
