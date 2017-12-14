<template>
    <label class="vui-switch-warp" :class="{'vui-switch-disabled': disabled}" :index="index">
        <input type="checkbox" v-model="selfChecked" :disabled="disabled" @change="change" :name="name" :value="value">
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
                selfChecked: !!this.checked
            }
        },
        props: {
            size: {
                type: [String, Number],
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
                type: [String, Number],
            },
            value: [String, Number],
            index: [String, Number]
        },
        methods: {
            change: function (event) {
                if(!this.disabled) return;
                this.$emit('change', event, this.selfChecked, this.value, this.index);
            }
        }
    }

</script>

<style scoped>
</style>
