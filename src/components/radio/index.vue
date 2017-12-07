<template>
    <label :class="sizeClass[size]" :index="index">
        <input v-if="selfChecked" type="radio" checked @click="click" :name="name" :value="value">
        <input v-else type="radio" @click="click" :name="name" :value="value">
        <span class="vui-radio"></span>
        <slot></slot>
    </label>
</template>

<script>
    export default {
        name: 'vRadio',
        data() {
            return {
                sizeClass: {
                    small: 'vui-radio-warp vui-radio-warp-small',
                    middle: 'vui-radio-warp vui-radio-warp-middle',
                    larger: 'vui-radio-warp vui-radio-warp-larger'
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
                this.$emit('onClick', event, this.value, this.index);
            }
        }
    }

</script>

<style scoped>
</style>
