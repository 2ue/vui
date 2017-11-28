<template>
    <div class="vui-datePicker-warp">
        <input type="text" class="vui-datePicker-input" v-model="selfSelectedVal" @mouseout="updateshowPanelStatus(false)" @click="updateshowPanelStatus(true)">
        <datePickerPanel v-for="" :formate="formate" :showPanel="showPanel" :selectedVal="selfSelectedVal" @updateInputVal="updateInputVal"
            @updateshowPanelStatus="updateshowPanelStatus"></datePickerPanel>
    </div>
</template>

<script>

    import DatePickerPanel from "./datePickerPanel.vue"
    import datePikcer from '@utils/datePicker.js'

    export default {
        name: 'vDatePicker',
        data() {
            return {
                showPanel: false,
                timer: null,
                selfSelectedVal: datePikcer.formate(this.formate, this.selectedVal),
                panelArray: [

                ]
            }
        },
        components: {
            DatePickerPanel
        },
        props: {
            formate: {
                default: 'YYYY-MM-DD'
            },
            selectedVal: {
                default: '请选择时间'
            }
        },
        methods: {
            showDatePickerPanel() {
                this.showPanel = true;
            },
            hideDatePickerPanel(t) {
                t = typeof t === 'undefined' || isNaN(t) ? 300 : t;
                this.timer = setTimeout(() => {
                    this.showPanel = false;
                }, t);
            },
            updateshowPanelStatus(status, t) {
                clearTimeout(this.timer);
                if (typeof status === 'undefined' || status) {
                    this.showDatePickerPanel();
                } else {
                    this.hideDatePickerPanel(t);
                }
            },
            updateInputVal(val) {
                this.selfSelectedVal = val;
                this.updateshowPanelStatus(false, 10);
                this.$emit('updateInputVal', val)
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
