<template>
    <div class="vui-datePicker-warp">
        <label class="vui-datePicker-input">
            <input type="text" v-model="selfSelectedDate" @mouseout="updatePanelStatus(false)" @click="updatePanelStatus(true)">
            <v-icon type="date-picker"></v-icon>
        </label>
        <datePickerPanel v-for="" :formate="formate" :showPanel="showPanel" :selectedVal="selfSelectedDate" @changeDate="changeDate"
            @updatePanelStatus="updatePanelStatus"></datePickerPanel>
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
                selfSelectedDate: this.getYMD()
            }
        },
        components: {
            DatePickerPanel
        },
        props: {
            formate: {
                default: 'YYYY-MM-DD'
            },
            selectedDate: {
                default: '请选择时间'
            }
        },
        methods: {
            getYMD() {
                return new Date(this.selectedDate).toString() === 'Invalid Date' ? this.selectedDate : datePikcer.formate(this.formate, this.selectedDate)
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
            updatePanelStatus(status, t) {
                clearTimeout(this.timer);
                if (typeof status === 'undefined' || status) {
                    this.showDatePickerPanel();
                } else {
                    this.hideDatePickerPanel(t);
                }
            },
            changeDate(val) {
                this.selfSelectedDate = val;
                this.updatePanelStatus(false, 10);
                this.$emit('changeDate', val)
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
