/**
 * Created by J.2ue on 2017/9/19.
 */

export default {
    methods: {
        /*
        * @function：对深层数据安全取值
        * @param：props（必须），深层取值的键值对数组，顺序排列
        * @param：target，原始数据，默认为this
        * */
        getValueFromDeepData: (props, target) => {
            if (!props || !target) return undefined;
            return props.reduce((pre, nxt) => (typeof pre === 'undefined' || typeof pre[nxt] === 'undefined' ? undefined : pre[nxt]), target);
        },
        decodeStr: (str, type) => {//type: html, html2
            function htmlDecode(str) {
                let e = document.createElement('div'), _html = '';
                e.innerHTML = str;
                for (let i = 0; i < e.childNodes.length; i++) {
                    _html += e.childNodes[i].nodeValue;
                };
                return _html;
            };
            if (!str) return '';
            let newStr = '', newStr1 = htmlDecode(str), newStr2 = htmlDecode(newStr1);
            if (type === 'html') return newStr1;
            if (type === 'html2') return newStr2;
            // return decodeURIComponent(decodeURI(newStr2));
            //防止decodeURIComponent和decodeURI转码出错
            try {
                newStr = decodeURI(newStr2);
            } catch (error) {
                if (!!error) return newStr2;
            }
            try {
                newStr = decodeURIComponent(newStr);
            } catch (error) {
                if (!!error) return newStr;
            }
            return newStr;
        }
    }
}
