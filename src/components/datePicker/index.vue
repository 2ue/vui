<template>
    <div class="vui-datePicker-warp">
        <input type="text" class="vui-datePicker-input" v-model="selectedVal" @mouseout="updateshowPanelStatus(false)" @mouseover="updateshowPanelStatus(true)">
        <datePickerPanel v-for="" :showPanel="showPanel" :selectedVal="selectedVal" @updateInputVal="updateInputVal" @updateshowPanelStatus="updateshowPanelStatus"></datePickerPanel>
    </div>
</template>

<script>
    import DatePickerPanel from "./datePickerPanel.vue"
    export default {
        name: 'vDatePicker',
        data() {
            return {
                showPanel: true,
                inputValMsg: {
                    no: '请选择时间'
                },
                selectedVal: '请选择时间',
                timer: null,
                panelArray: [

                ]
            }
        },
        components: {
            DatePickerPanel
        },
        methods: {
            showDatePickerPanel() {
                this.showPanel = true;
            },
            hideDatePickerPanel() {
                this.timer = setTimeout(() => {
                    // this.showPanel = false;
                }, 400);
            },
            updateshowPanelStatus(status) {
                clearTimeout(this.timer);
                if (status) {
                    this.showDatePickerPanel();
                } else {
                    this.hideDatePickerPanel();
                }
            },
            updateInputVal(val) {
                console.log('val===>', val);
                this.selectedVal = val;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .vui-datePicker-warp {
        position: relative;
    }

    .vui-datePicker-input {
        box-sizing: border-box;
        width: 300px;
        height: 30px;
        text-indent: 1em;
        border: 1px solid tint(#ccc, 50%);
    }
</style>
