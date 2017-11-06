/**
 * Created by J.2ue on 2017/9/13.
 */

export default {
    /*
    * @function： 获取数据类型
    * @param：para,要判断的数据
    * */
    tryType: para => {
        const type = typeof para;
        if (type === "number" && isNaN(para)) return "NaN";
        if (type !== "object") return type;
        return Object.prototype.toString
            .call(para)
            .replace(/[\[\]]/g, "")
            .split(" ")[1]
            .toLowerCase();
    },
    /*
    * @function: 判断是否为数字
    * @param： num，要判断的数据
    * */
    isNumber: para => {
        if (window.isNumber) return window.isNumber(para);
        if (Number.isNumber) return Number.isNumber(para);
        return typeof para !== "undefined" && !isNaN(para);
    },

    /*
    * @function: 格式化时间
    * @param： fmt，要格式的时间格式
    *           年(YYYY/yyyy)固定四个占位符
                月(M)、日(d)、小时(h)、分(m)、秒(s)可以用 1-2个占位符,严格区分大小写，
                毫秒（ms/mss）最多三个占位符，分别对应56，056这种类型
    * @param: date，需要格式的时间字符串或者时间对象
    * @return： 返回期望的时间格式
    * */
    formate: (fmt, date) => {
        const _date = date || this;
        const _rules = [{
            rule: '[yY]{4}',
            value: _date.getFullYear()
        }, {
            rule: 'M+',
            value: _date.getMonth() + 1
        }, {
            rule: '[dD]+',
            value: _date.getDate()
        }, {
            rule: 'h+',
            value: _date.getHours()
        }, {
            rule: 'm+',
            value: _date.getMinutes()
        }, {
            rule: 's+',
            value: _date.getSeconds()
        }, {
            rule: 'ms{1,2}',
            value: _date.getMilliseconds()
        }];

        _rules.forEach((_r) => {
            const rule = _r.rule, val = _r.value;
            fmt = fmt.replace(new RegExp(rule), function ($1) {
                const rLen = ['', val].join('').length, fLen = $1.length;
                return (fLen !== 2 || rLen >= fLen) ? val : ['00', val].join('').substr(rLen);
            });
        });
        return fmt;
    }
};
