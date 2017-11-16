<template>
    <div class="vui-datePicker-panel-warp" v-if="selfShowPanel" @mouseout="updateshowPanelStatus(false)" @mouseover="updateshowPanelStatus(true)">
        <div class="vui-datePicker-change">
            <p class="vui-datePicker-header">
                <span class="vue-datePicker-preMonth" @click="changeMonth(-1)">&lt;</span>
                <label class="vue-datePicker-year" @click="getYearMonthArray(true)">{{ tempVal[0] }}</label>
                <label class="vue-datePicker-month" @click="getYearMonthArray(false)">{{ tempVal[1] }}</label>
                <span class="vue-datePicker-nxtMonth" @click="changeMonth(1)">&gt;</span>
            </p>
            <div class="vui-datePicker-yearMonth">
                <p v-if="yearMonth.length !== 12" class="vui-datePicker-changeYear">
                    <span class="vue-datePicker-preYear" @click="changeYear(-1)">&lt;</span>
                    <span>{{ tempVal[0] }}</span>
                    <span class="vue-datePicker-preYear" @click="changeYear(1)">&gt;</span>
                </p>
                <span v-for="(item,index) in yearMonth" :key="index">{{ item }}</span>
            </div>
        </div>
        <div class="vui-datpaicker-days">
            <span v-for="(weekday,index) in weekdays" :key="index">{{weekday}}</span>
            <span v-for="(day, index) in daysArray" :key="index" :class="getClassName(day)" @click="choosedDay(day,index)">{{day.dayNum}}</span>
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
                //切换年月时，用于缓存年月
                tempVal: this.getYMD(),
                //当前月数据
                daysArray: [],
                //星期
                weekdays: datePikcer.WEEKTABLE.common.cns,
                yearMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
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
                this.tempVal = [..._v];
                this.$emit('updateInputVal', datePikcer.formate(this.formate, _v.join('-')));
            },
            tempVal() {
                this.renderDatePickerPanel();
            }
        },
        created() {
            this.renderDatePickerPanel();
        },
        methods: {
            //把年月日分割成数组
            getYMD() {
                return datePikcer.formate(this.formate, this.selectedVal).split('-');
            },
            showDatePickerPanel() {
                this.selfShowPanel = true;
            },
            updateshowPanelStatus(status) {
                this.$emit('updateshowPanelStatus', status);
            },
            getClassName(dayItem) {
                return { 'vui-selected-day': dayItem.selected, 'vui-this-month': dayItem.isThisMonth }
            },
            getYearMonthArray(type, _y) {
                const year = _y || this.tempVal[0], month = this.tempVal[1];
                let res = [];
                if (type) {
                    const start = parseInt(year / 9) * 9;
                    console.log('start==>', start)
                    for (let i = start; i < start + 9; i++) {
                        res.push(i)
                    }
                    this.yearMonth = [...res];
                } else {
                    this.yearMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
                }
            },
            //更新月份数组数据
            renderDatePickerPanel() {
                const selfVal = this.tempVal;
                this.daysArray = datePikcer.getMonthDaysArray(selfVal[0], selfVal[1], selfVal[2]);
            },
            //选择天
            choosedDay(day, index) {
                if (day.isThisMonth && day.dayNum != this.selfVal[2]) {
                    this.selfVal = [...this.tempVal.slice(0, 2), day.dayNum];
                }
            },
            //切换上一月（val=-1），下一月（val=1）
            changeMonth(val) {
                this.tempVal = [...datePikcer.fixedYM(+this.tempVal[0], +this.tempVal[1] + val)];
            },
            //切换上一月（val=-1），下一月（val=1）
            changeYear(val) {
                this.getYearMonthArray(true, +this.yearMonth[0] + (val * 9));
                // this.tempVal = [...datePikcer.fixedYM(+this.tempVal[0] + (val * 9), +this.tempVal[1])];
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

    .vui-datePicker-change {
        position: relative;
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid #ccc;
        text-align: center;
        font-size: 0;

        span,
        label {
            display: inline-block;
            text-align: top;
            font-size: 12px;
        }
    }

    .vui-datePicker-header {
        span {
            width: 50px;
        }
        label {
            width: 100px;
        }
    }

    .vui-datePicker-yearMonth {
        position: absolute;
        top: 30px;
        left: 50px;
        width: 150px;
        height: 120px;
        background: #ccc;

        span {
            float: left;
            width: 50px;
            height: 30px;
            line-height: 30px;
            box-sizing: border-box;
            border-bottom: 1px solid #fff;
            border-right: 1px solid #fff;
            span:nth-child(3n) {
                border-right: 0;
            }
        }
        /* &>span:nth-child(3n+1) {
            border-right: 0;
        } */
    }

    /* .vui-datePicker-changeYear {
        span {
            width: 75px;/
        }
    } */
</style>
