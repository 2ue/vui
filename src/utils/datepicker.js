/*
 * @Author: 2ue
 * @Date: 2017-11-09 09:43:58
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-11-16 16:01:37
 */

const DATE = new Date();
const YEAR = DATE.getFullYear();
const MONTH = DATE.getMonth() + 1;
const DAY = DATE.getDate();

const WEEKTABLE = {
    common: {
        cn: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        cns: ['日', '一', '二', '三', '四', '五', '六'],
        en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    },
    intl: {
        cn: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
        cns: ['一', '二', '三', '四', '五', '六', '日'],
        en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
}

export default {
    /*
    * @function: 格式化时间
    * @param： fmt，要格式的时间格式
    *           年(YYYY/yyyy)固定四个占位符
                月(M)、日(d)、小时(h)、分(m)、秒(s)可以用 1-2个占位符,严格区分大小写，
                毫秒（ms/mss）最多三个占位符，分别对应56，056这种类型
    * @param: date，需要格式的时间字符串或者时间对象
    * @return： 返回期望的时间格式
    * */
    WEEKTABLE,
    formate(fmt, date) {
        date = new Date(date).toString() === 'Invalid Date' ? new Date() : new Date(date);
        const _rules = [{
            rule: '[yY]{4}',
            value: date.getFullYear()
        }, {
            rule: 'M+',
            value: date.getMonth() + 1
        }, {
            rule: '[dD]+',
            value: date.getDate()
        }, {
            rule: 'h+',
            value: date.getHours()
        }, {
            rule: 'm+',
            value: date.getMinutes()
        }, {
            rule: 's+',
            value: date.getSeconds()
        }, {
            rule: 'ms{1,2}',
            value: date.getMilliseconds()
        }];

        _rules.forEach((_r) => {
            const rule = _r.rule, val = _r.value;
            fmt = fmt.replace(new RegExp(rule), function ($1) {
                const rLen = val.toString().length, fLen = $1.length;
                return (fLen !== 2 || rLen >= fLen) ? val : ['00', val].join('').substr(rLen);
            });
        });
        return fmt;
    },
    //修正年月
    fixedYM(year = YEAR, month = MONTH) {
        if (+month === 0) {
            year = +year - 1;
            month = 12;
        };

        if (+month === 13) {
            year = +year + 1;
            month = 1;
        };
        return [year, month];
    },
    //获取某年某月有多少天
    getMonthDays(year, month) {
        const YM = this.fixedYM(year, month);
        return new Date(YM[0], YM[1], 0).getDate();
    },
    //返回某年某月某日是星期几
    getWeekday(year, month, day = DAY) {
        const YM = this.fixedYM(year, month);
        return new Date(YM[0], YM[1] - 1, day).getDay();
    },
    //获取某年某月的具体天数的排列顺序
    getMonthDaysArray(year = YEAR, month = MONTH, day) {
        if (typeof day === 'undefined' && year === YEAR && month === MONTH) day = DAY;
        console.log('year==>', year)
        console.log('month==>', month)
        console.log('day==>', day)
        let dayArrays = [];
        const days = this.getMonthDays(year, month), preDays = this.getMonthDays(year, month - 1);
        const thisMonthFirstDayInWeek = this.getWeekday(year, month, 1), thisMonthLastDayInWeek = this.getWeekday(year, month, days);
        const thisMonthAllDays = thisMonthFirstDayInWeek + days + 6 - thisMonthLastDayInWeek;
        //上月在当月日历面板中的排列
        for (let i = 0; i < thisMonthFirstDayInWeek; i++) {
            dayArrays.push({
                dayNum: (preDays - thisMonthFirstDayInWeek + i + 1),
                weekDay: WEEKTABLE.common.cn[i]
            })
        }
        //当月日历面板中的排列
        for (let i = 1; i <= days; i++) {
            const weekDayFlag = (thisMonthFirstDayInWeek + i - 1) % 7
            dayArrays.push({
                dayNum: i,
                weekDay: WEEKTABLE.common.cn[weekDayFlag],
                selected: i === +day,
                isThisMonth: true
            })
        };
        //下月在当月日历面板中的排列
        for (let i = 1; i <= (6 - thisMonthLastDayInWeek); i++) {
            const weekDayFlag = (thisMonthFirstDayInWeek + days + i - 1) % 7
            dayArrays.push({
                dayNum: i,
                weekDay: WEEKTABLE.common.cn[weekDayFlag]
            })
        };
        // console.log('dayArrays==>', { ...dayArrays })
        return dayArrays;
    }
}
