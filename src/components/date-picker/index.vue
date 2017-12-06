<template>
    <div class="vui-datePicker-warp">
        <label class="vui-datePicker-input">
            <input type="text" v-model="selfSelectedVal" @mouseout="updateshowPanelStatus(false)" @click="updateshowPanelStatus(true)">
            <v-icon type="date-picker"></v-icon>
        </label>
        <datePickerPanel v-for="" :formate="formate" :showPanel="showPanel" :selectedVal="selfSelectedVal" @updateInputVal="updateInputVal"
            @updateshowPanelStatus="updateshowPanelStatus"></datePickerPanel>
    </div>
</template>

<script>

    import DatePickerPanel from "./date-picker-panel.vue"
    import datePikcer from '@utils/date-picker.js'

    export default {
        name: 'vDatePicker',
        data() {
            return {
                showPanel: false,
                timer: null,
                selfSelectedVal: this.getSelfSelectVal()
            }
        },
        components: {
            DatePickerPanel
        },
        props: {
            formate: {
                default: 'YYYY-MM-DD'
            },
            selectedVal: [String, Object]
        },
        methods: {
            getSelfSelectVal() {
                return !this.selectedVal ? '请选择时间' : new Date(this.selectedVal).toString() === 'Invalid Date' ? this.selectedVal : datePikcer.formate(this.formate, this.selectedVal)
            },
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
<style lang="scss">
</style>
