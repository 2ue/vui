<template>
    <div class="vui-datePicker-panel-warp" v-if="selfShowPanel" @mouseout="updateshowPanelStatus(false)" @mouseover="updateshowPanelStatus(true)">
        <div class="vui-datpaicker-days">
            <span v-for="(day, index) in daysArray" :key="index" :class="getClassName(day)" @click="choosedDay(day)">{{day.dayNum}}</span>
        </div>
    </div>
</template>

<script>

    import datePikcer from '@utils/datepicker.js'

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
                default: false
            },
            selectedVal: String,
            formate: String
        },
        watch: {
            showPanel(status) {
                this.selfShowPanel = status;
            },
            selfVal(_v) {
                this.updateInputVal(datePikcer.formate(this.formate, _v.join('-')));
            }
        },
        created() {
            const selfVal = this.selfVal;
            this.daysArray = datePikcer.getMonthDaysArray(selfVal[0], selfVal[1], selfVal[2]);
        },
        methods: {
            getYMD() {
                return datePikcer.formate(this.formate, this.selectedVal).split('-');
            },
            showDatePickerPanel() {
                this.selfShowPanel = true;
            },
            updateInputVal(val) {
                this.$emit('updateInputVal', val);
            },
            updateshowPanelStatus(status) {
                this.$emit('updateshowPanelStatus', status);
            },
            getClassName(dayItem) {
                return { 'vui-selected-day': dayItem.selected, 'vui-this-month': dayItem.isThisMonth }
            },
            choosedDay(day) {
                if (day.isThisMonth && day.dayNum != this.selfVal[2]) this.selfVal.splice(2, 1, day.dayNum);
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
