<template>
    <label :class="sizeClass[size]" :index="index">
        <input type="checkbox" v-model="selfChecked" @click="click" :name="name" :value="value">
        <span class="vui-checkbox"></span>
        <slot></slot>
    </label>
</template>

<script>
    export default {
        name: 'vCheckbox',
        data() {
            return {
                sizeClass: {
                    small: 'vui-checkbox-warp vui-checkbox-warp-small',
                    middle: 'vui-checkbox-warp vui-checkbox-warp-middle',
                    larger: 'vui-checkbox-warp vui-checkbox-warp-larger'
                },
                selfChecked: !!this.checked
            }
        },
        props: {
            size: {
                type: [String],
                default: 'small'
            },
            checked: {
                default: undefined
            },
            name: {
                type: String
            },
            value: [String, Number],
            index: [String, Number]
        },
        methods: {
            click: function (event) {
                this.$emit('onClick', event, this.selfChecked, this.value, this.index);
            }
        }
    }

</script>

<style scoped>
</style>
