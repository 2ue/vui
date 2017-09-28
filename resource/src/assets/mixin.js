export default {
    methods: {
        getValueFromDeepData: (props, target) => {
            if (!props || !target) return undefined;
            return props.reduce( (pre, nxt) => (typeof pre === 'undefined' || typeof pre[nxt] === 'undefined' ? undefined : pre[nxt]), target );
        }
    }
}