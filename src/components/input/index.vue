<template>
    <input class="vui-input" type="text" ref="vInput" v-model="selfVal" :disabled="disabled" :style="{ width: widthSize }" :readonly="readonly"
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
            widthSize: function () {
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

<style scoped>
</style>
