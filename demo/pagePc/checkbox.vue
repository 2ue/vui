<template>
    <div>
        <v-checkbox size="small" :checked="false" name="iiii"></v-checkbox>
        <v-checkbox size="small" :checked="checked" text="textCheckbox" @onClick="getInfo"></v-checkbox>
        <v-checkbox-group :groupData="groupData" name="uuuu" :checkedItems="checkedItems"></v-checkbox-group>
    </div>
</template>

<script>
    export default {
        name: 'checkbox',
        data() {
            return {
                checked: true,
                groupData: [{
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
                checkedItems: [2, 3, 4],
                // checkedItems: {
                //     key: 'value',
                //     checkedValue: [2, 3, 4]
                // }
            }
        },
        methods: {
            getInfo: function (event, checked) {
                console.log('checked inner==>', checked);
                console.log('checked==>', this.checked)
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
