<template>
    <div class="vui-datePicker-panel-warp" v-if="selfShowPanel" @mouseout="updateshowPanelStatus(false)" @mouseover="updateshowPanelStatus(true)">
        <div class="vui-datePicker-change">
            <p class="vui-datePicker-header">
                <span class="vue-datePicker-preMonth" @click="changeMonth(-1)">&lt;</span>
                <label class="vue-datePicker-year" @click="showYearMonthPanel('Y')" @mouseout="showYearMonthPanel(false)" @mouseover="showYearMonthPanel(isYearOrMonth)">{{ tempVal[0] }}</label>
                <label class="vue-datePicker-month" @click="showYearMonthPanel('M')" @mouseout="showYearMonthPanel(false)" @mouseover="showYearMonthPanel(isYearOrMonth)">{{ tempVal[1] }}</label>
                <span class="vue-datePicker-nxtMonth" @click="changeMonth(1)">&gt;</span>
            </p>
            <div v-if="isYearOrMonth" class="vui-datePicker-yearMonth" :class="{'vui-datePicker-month': isYearOrMonth === 'M'}" @mouseout="showYearMonthPanel(false)"
                @mouseover="showYearMonthPanel(isYearOrMonth)">
                <p v-if="isYearOrMonth === 'Y'">
                    <span @click="changeYear(-1)">&lt;</span>
                    <span>{{ tempVal[0] }}</span>
                    <span @click="changeYear(1)">&gt;</span>
                </p>
                <span v-for="(item,index) in yearMonth" :key="index" @click.stop="chooseYearMonth(item)">{{ item }}</span>
            </div>
        </div>
        <div class="vui-datpaicker-days">
            <span v-for="(weekday,index) in weekdays" :key="index">{{weekday}}</span>
            <span v-for="(day, index) in daysArray" :key="index" :class="getClassName(day)" @click.self.stop="choosedDay(day,index)">{{day.dayNum}}</span>
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
                yearMonth: null,
                //判断是哪一个选择面板
                isYearOrMonth: false,
                timer: null
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
                if (!status) this.tempVal = [...this.selfVal];
            },
            selfVal(_v) {
                this.tempVal = [..._v];
                this.$emit('updateInputVal', datePikcer.formate(this.formate, _v.join('-')));
            },
            tempVal() {
                this.renderDatePickerPanel();
            },
            isYearOrMonth(val) {
                this.getYearMonthArray();
            }
        },
        created() {
            this.renderDatePickerPanel();
        },
        methods: {
            initSelfData() {
                this.yearMonth = [];
                this.isYearOrMonth = false
                clearTimeout(this.timer);
            },
            //把年月日分割成数组
            getYMD() {
                return datePikcer.formate(this.formate, this.selectedVal).split('-');
            },
            getClassName(dayItem) {
                return { 'vui-selected-day': dayItem.selected, 'vui-this-month': dayItem.isThisMonth }
            },
            showDatePickerPanel() {
                this.selfShowPanel = true;
            },
            showYearMonthPanel(type) {
                const _this = this;
                clearTimeout(_this.timer);
                if (!type) {
                    _this.timer = setTimeout(() => {
                        _this.isYearOrMonth = false
                    }, 300);
                } else {
                    _this.isYearOrMonth = type;
                }
            },
            updateshowPanelStatus(status) {
                this.$emit('updateshowPanelStatus', status);
            },
            getYearMonthArray(_y) {
                const type = this.isYearOrMonth;
                if (!type) {
                    this.yearMonth = null;
                } else {
                    let startNum = 1, endNum = 13, res = [];
                    if (type === 'Y') {
                        startNum = parseInt((!_y || isNaN(_y) ? this.tempVal[0] : _y) / 9) * 9;
                        endNum = startNum + 9;
                    };
                    for (let i = startNum; i < endNum; i++) {
                        res.push(i)
                    }
                    this.yearMonth = [...res];
                }
            },
            //更新月份数组数据
            renderDatePickerPanel() {
                const selfVal = this.tempVal;
                this.daysArray = datePikcer.getMonthDaysArray(selfVal[0], selfVal[1], selfVal[2]);
            },
            //切换上一月（val=-1），下一月（val=1）
            changeMonth(val) {
                this.tempVal = [...datePikcer.fixedYM(+this.tempVal[0], +this.tempVal[1] + val)];
            },
            //切换上一月（val=-1），下一月（val=1）
            changeYear(val) {
                this.getYearMonthArray(+this.yearMonth[0] + (val * 9));
                // this.tempVal = [...datePikcer.fixedYM(+this.tempVal[0] + (val * 9), +this.tempVal[1])];
            },
            //选择天
            choosedDay(day, index) {
                if (day.isThisMonth && day.dayNum != this.selfVal[2]) {
                    this.selfVal = [...this.tempVal.slice(0, 2), day.dayNum];
                }
            },
            //选择年月
            chooseYearMonth(val) {
                let temp = [...this.tempVal];
                temp.splice(this.isYearOrMonth === 'M' ? 1 : 0, 1, val);
                temp = datePikcer.formate(this.formate, temp.join('-')).split('-').slice(0, 2);
                this.tempVal = +temp[1] == +this.selfVal[1] && +temp[0] == +this.selfVal[0] ? [...temp, this.selfVal[2]] : [...temp];
                this.initSelfData();
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
        left: 25px;
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
            cursor: pointer;
            span:nth-child(3n) {
                border-right: 0;
            }
        }
        &.vui-datePicker-month {
            left: 125px;
        }
    }
</style>
