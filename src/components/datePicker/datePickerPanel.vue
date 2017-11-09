<template>
    <div class="vui-datePicker-panel-warp" v-if="selfShowPanel" @mouseout="updateshowPanelStatus(false)" @mouseover="updateshowPanelStatus(true)">
        <div class="vui-datpaicker-days">
            <span v-for="(day, index) in daysArray" :key="index" :class="getClassName(day)" @click="click">{{day.dayNum}}</span>
        </div>
    </div>
</template>

<script>
    import datePikcer from '../../utils/datepicker.js'
    export default {
        name: 'vDatePickerPanel',
        data() {
            return {
                selfShowPanel: !!this.showPanel,
                selfVal: this.getYMD(),
                daysArray: []
            }
        },
        props: {
            showPanel: {
                default: undefined
            },
            selectedVal: String
        },
        watch: {
            showPanel(status) {
                this.selfShowPanel = status;
            }
        },
        created() {
            const selfVal = this.selfVal;
            this.daysArray = datePikcer.getMonthDaysArray(selfVal[0], selfVal[1], selfVal[2]);
        },
        methods: {
            getYMD() {
                const date = new Date(this.selectedVal);
                if (date.toString() === 'Invalid Date') return [];
                return [date.getFullYear(), date.getMonth() + 1, date.getDate()];
            },
            showDatePickerPanel() {
                this.selfShowPanel = true;
            },
            updateInputVal() {
                this.$emit('updateInputVal', this.selfInputVal);
            },
            updateshowPanelStatus(status) {
                this.$emit('updateshowPanelStatus', status);
            },
            getClassName(dayItem) {
                return { 'vui-selected-day': dayItem.selected, 'vui-this-month': dayItem.isThisMonth }
            },
            click() {
                console.log('click');
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .vui-datePicker-panel-warp {
        position: absolute;
        left: 0;
        top: 30px;
        width: 300px;
        height: 300px;
        background: #eee;
    }

    .vui-datpaicker-days {
        padding: 0 10px;
        font-size: 0;
        span {
            display: inline-block;
            box-sizing: border-box;
            width: 36px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            font-size: 12px;
            margin: 3px 2px;
            color: #999;

            &.vui-this-month {
                color: #333;
                cursor: pointer;

                &.vui-selected-day,
                &:hover {
                    background: #fff;
                }
            }
        }
    }
</style>
