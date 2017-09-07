
export default {
    tryType: para => {
        const type = typeof para;
        if(type === 'number' && isNaN(para)) return 'NaN';
        if(type !== 'object') return type;
        return Object.prototype.toString.call(para).replace(/[\[\]]/g,'').split(' ')[1].toLowerCase();
    }
}

