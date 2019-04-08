<template>
    <input class="vui-input" type="text" ref="vInput" v-model="selfVal" :disabled="disabled" :style="{ width: selfWidth }" :readonly="readonly"
        @input="eventInput" @focus="eventFocus" @blur="eventBlur">
</template>

<script>
    export default {
        name: 'vInput',
        data() {
            return {
                selfVal: this.value
            }
        },
        computed: {
            selfWidth: function () {
                let width = this.width;
                if (this.$util.isNumber(width)) width = width + 'px';
                return width;
            },
        },
        watch: {
            value(value) {
                if (value === this.selfVal) return;
                this.selfVal = value;
            }
        },
        props: {
            value: {
                type: [String, Number],
                default: ''
            },
            width: {
                type: [String, Number]
            },
            disabled: {
                type: [Boolean, String],
                default: false
            },
            readonly: {
                type: [Boolean, String],
                default: false
            }
        },
        methods: {
            eventInput: function (event) {
                this.$emit('input', this.selfVal);
                this.$emit('change', event, this.selfVal);
            },
            eventFocus: function (event) {
                this.$emit('focus', event, this.selfVal);
            },
            eventBlur: function (event) {
                this.$emit('blur', event, this.selfVal);
            }
        }
    }

</script>

<style scoped lang="scss">
    #{$prefix-cls}input {
        box-sizing: border-box;
        width: 200px;
        height: 30px;
        border: 1px solid $border-color-main;
        border-radius: $border-radius;
        box-sizing: border-box;
        padding: 0 10px;
        margin: 2px 0;
        color: #666;
    &:disabled {
         background: $border-color-little;
         cursor: not-allowed;
     }
    &:read-only {
         background: $border-color-little;
     }
    }
</style>
