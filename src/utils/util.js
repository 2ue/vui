
export default {
    tryType: para => {
        const type = typeof para;
        if(type === 'number' && isNaN(para)) return 'NaN';
        if(type !== 'object') return type;
        return Object.prototype.toString.call(para).replace(/[\[\]]/g,'').split(' ')[1].toLowerCase();
    },
  isNumber: num => {
    if(window.isNumber) return window.isNumber(num);
    if(Number.isNumber) return Number.isNumber(num);
    return typeof num !== 'undefined' && !isNaN(num);
  },


  //深层取值
  getItem: (props, target) => {
      if(!target) target = this;
    if(Array.reduce) return props.reduce((pre, nxt) => (pre && pre[nxt]) ? pre[nxt] : null, target);
    // if(Array.forEach) return props.forEach((pre, nxt) => (pre && pre[nxt]) ? pre[nxt] : null, target);

  }
}

