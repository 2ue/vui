/*
 * @Author: 2ue
 * @Date: 2017-12-20 16:27:04
 * @Last Modified by: 2ue
 * @Last Modified time: 2017-12-21 09:00:57
 */

export default {
    /**
    * @function： 获取数据类型
    * @param：para,要判断的数据
    * @returns: String 返回类型
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
    /**
    * @function: 判断是否为数字
    * @param： num，要判断的数据
    * @returns: Boolen
    * */
    isNumber: para => {
        if (window.isNumber) return window.isNumber(para);
        if (Number.isNumber) return Number.isNumber(para);
        return typeof para !== "undefined" && !isNaN(para);
    },
    /**
    * @function: 测试传入的props值是否符合规则，20,等20px,20rem,20em；
    * @param： num，要判断的数据
    * @returns: Boolen
    * */
    testUnitStr: (para) => {
        return /^[0-9]+(px|em|rem|)$/.test(para);
    },

    /**
     * @function: 生成唯一ID
     * @returns: String
     */
    // gId: () => {
    //     function r() {
    //         return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    //     }
    //     return (`${gStr() + r()}-${r()}-${r()}-${r()}-${r() + r() + r()}`);
    // }
    gId: () => {
        const r = this.gStr;
        return (`${r(4) + r(4)}-${r(4)}-${r(4)}-${r(4)}-${r(4) + r(4) + r(4)}`);
    },

    /**
     * @function: 生成随机字符串
     * @returns: String
     */
    gStr: (len) => {
        return Math.random().toString(36).substr(2, len || undefined);
    },
};
