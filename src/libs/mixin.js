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
            if (type === 'html') return !str ? '' : htmlDecode(str);
            if (type === 'html2') return !str ? '' : htmlDecode(htmlDecode(str));
            return !str ? '' : decodeURIComponent(decodeURI(htmlDecode(htmlDecode(str))));
        }
    }
}
