<template>
    <label class="vui-switch-warp" :class="classes" :index="index">
        <input type="checkbox" v-model="selfChecked" :disabled="disabled" @change="change" :name="name" :value="value">
        <span class="vui-switch"></span>
        <span class="vui-dib-vt">
            <slot v-html="text"></slot>
        </span>
    </label>
</template>

<script>
    export default {
        name: 'vSwitch',
        data() {
            return {
                sizeClass: {
                    small: 'vui-switch-warp-small',
                    middle: 'vui-switch-warp-middle',
                    larger: 'vui-switch-warp-larger'
                },
                selfChecked: !!this.checked
            }
        },
        props: {
            size: {
                type: String,
                default: 'small'
            },
            text: [String, Number],
            checked: {
                default: undefined
            },
            disabled: {
                default: undefined
            },
            name: {
                type: String,
            },
            value: [String, Number],
            index: [String, Number]
        },
        computed: {
            classes() {
                return this.sizeClass[this.size] + (this.disabled ? ' vui-switch-disabled' : '');
            }
        },
        methods: {
            change: function (event) {
                if (!this.disabled) return;
                this.$emit('change', event, this.selfChecked, this.value, this.index);
            }
        }
    }

</script>

<style scoped>
</style>
