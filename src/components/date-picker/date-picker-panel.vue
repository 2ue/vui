<template>
    <div class="vui-datePicker-panel-warp f_disselected" v-if="selfShowPanel" @mouseout="updatePanelStatus(false)" @mouseover="updatePanelStatus(true)">
        <div class="vui-datePicker-change">
            <p class="vui-datePicker-header">
                <span class="vui-datePicker-change-btn" @click="changeMonth(-1)">&lt;</span>
                <label class="vui-datePicker-year" @click="showYearMonthPanel('Y')" @mouseout="showYearMonthPanel(false)" @mouseover="showYearMonthPanel(isYearOrMonth)">{{ tempVal[0] }}</label>
                <label class="vui-datePicker-month" @click="showYearMonthPanel('M')" @mouseout="showYearMonthPanel(false)" @mouseover="showYearMonthPanel(isYearOrMonth)">{{ tempVal[1] }}</label>
                <span class="vui-datePicker-change-btn" @click="changeMonth(1)">&gt;</span>
            </p>
            <div v-if="isYearOrMonth" class="vui-datePicker-yearMonth" :class="{'vui-datePicker-month': isYearOrMonth === 'M'}" @mouseout="showYearMonthPanel(false)"
                @mouseover="showYearMonthPanel(isYearOrMonth)">
                <p v-if="isYearOrMonth === 'Y'">
                    <span @click="changeYear(-1)">&lt;</span>
                    <span></span>
                    <span @click="changeYear(1)">&gt;</span>
                </p>
                <span v-for="(item,index) in yearMonth" :key="index" @click.stop="chooseYearMonth(item)">{{ item }}</span>
            </div>
        </div>
        <div class="vui-datePicker-days">
            <p class="vui-datePicker-weekday-box">
                <span v-for="(weekday,index) in weekdays" :key="index">{{weekday}}</span>
            </p>
            <div class="vui-datePicker-day-box">
                <span v-for="(day, index) in daysArray" :key="index" :class="getClassName(day)" @click.self.stop="changeDay(day,index)">{{day.dayNum}}</span>
            </div>
        </div>
    </div>
</template>

<script>

    import datePikcer from '@utils/date-picker.js'

    //定义一个默认格式用于内部计算年月，和缺省值。注意：内部计算全部以此格式计算，只有返回输出数据时才使用用户设定的格式
    const DEFAULT_FORMATE = 'YYYY-MM-DD';

    export default {
        name: 'vDatePickerPanel',
        data() {
            return {
                selfShowPanel: !!this.showPanel,
                //星期
                weekdays: datePikcer.WEEKTABLE.common.cns,
                yearMonth: null,
                //判断是哪一个选择面板
                isYearOrMonth: false,
                timer: null,
                selfSelectedDate: this.getYMD(),
                //切换年月时，用于缓存年月
                tempVal: this.getYMD(),
                //当前月数据
                daysArray: [],
                selfFormate: this.formate || DEFAULT_FORMATE
            }
        },
        props: {
            showPanel: {
                default: false
            },
            selectedDate: String,
            formate: String
        },
        watch: {
            showPanel(status) {
                this.selfShowPanel = status;
                if (!status) this.tempVal = [...this.selfSelectedDate];
            },
            selfSelectedDate(_v) {
                this.tempVal = [..._v];
                this.$emit('changeDate', datePikcer.formate(this.selfFormate, _v.join('-')));
            },
            tempVal() {
                this.getPickerPanelData();
            },
            isYearOrMonth(val) {
                this.getYMArray();
            }
        },
        created() {
            this.getPickerPanelData();
        },
        methods: {
            //把年月日分割成数组
            getYMD() {
                return datePikcer.formate(DEFAULT_FORMATE, this.selectedDate).split('-');
            },
            getClassName(dayItem) {
                return { 'vui-datePicker-selected-day': dayItem.selected, 'vui-datePicker-this-month': dayItem.isThisMonth }
            },
            getYMArray(_y) {
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
            getPickerPanelData() {
                const selfSelectedDate = this.tempVal;
                this.daysArray = datePikcer.getMonthDaysArray(selfSelectedDate[0], selfSelectedDate[1], selfSelectedDate[2]);
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
            //触发日历面板显示隐藏状态的更新
            updatePanelStatus(status) {
                this.$emit('updatePanelStatus', status);
            },
            //切换上一月（val=-1），下一月（val=1）
            changeMonth(val) {
                let yearMonth = [...datePikcer.fixedYM(+this.tempVal[0], +this.tempVal[1] + val)];
                this.tempVal = datePikcer.formate(DEFAULT_FORMATE, yearMonth.join('-')).split('-').slice(0, 2);
            },
            //切换上一年（val=-1），下一年（val=1）
            changeYear(val) {
                this.getYMArray(+this.yearMonth[0] + (val * 9));
            },
            //选择天
            changeDay(day, index) {
                if (day.isThisMonth && day.dayNum != this.selfSelectedDate[2]) {
                    this.selfSelectedDate = [...this.tempVal.slice(0, 2), day.dayNum];
                }
            },
            //选择年月
            chooseYearMonth(val) {
                let temp = [...this.tempVal];
                temp.splice(this.isYearOrMonth === 'M' ? 1 : 0, 1, val);
                temp = datePikcer.formate(DEFAULT_FORMATE, temp.join('-')).split('-').slice(0, 2);
                this.tempVal = +temp[1] == +this.selfSelectedDate[1] && +temp[0] == +this.selfSelectedDate[0] ? [...temp, this.selfSelectedDate[2]] : [...temp];
                //初始化还原一些数据
                this.yearMonth = [];
                this.isYearOrMonth = false
                clearTimeout(this.timer);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
