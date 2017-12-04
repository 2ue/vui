<template>
    <label class="vui-switch-warp" :index="index">
        <input type="checkbox" v-model="ownChecked" :disabled="ownDisabled" @change="change" :name="name" :value="value">
        <span class="vui-switch vui-dib-vt"></span>
        <span class="vui-dib-vt">
            <slot>{{text}}</slot>
        </span>
    </label>
</template>

<script>
    export default {
        name: 'vSwitch',
        data() {
            return {
                sizeClass: {
                    small: 'vui-switch-small',
                    middle: 'vui-switch-middle',
                    larger: 'vui-switch-larger'
                },
                ownChecked: !!this.checked
            }
        },
        computed: {
            ownDisabled: function () {
                const disabled = this.disabled;
                return disabled === '' ? true : !disabled || disabled === 'false' ? false : !!disabled;
            }
        },
        props: {
            size: {
                type: [String, Number],
                default: 'small'
            },
            text: [String, Number],
            checked: {
                type: [String, Number, Boolean],
                default: undefined
            },
            name: {
                type: [String, Number],
            },
            value: [String, Number],
            index: [String, Number],
            disabled: [String, Number, Boolean]
        },
        methods: {
            change: function (event) {
                this.$emit('change', event, this.ownChecked, this.value, this.index);
            }
        }
    }

</script>

<style scoped>
</style>
