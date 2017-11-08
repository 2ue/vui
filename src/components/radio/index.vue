<template>
    <label class="vui-radio-warp" :index="index">
        <input type="radio" v-model="ownChecked" @click="click" :name="name" :value="value">
        <span class="vui-radio"></span>
        <span class="vui-radio-text" v-if="text">{{text}}</span>
        <slot name="html"></slot>
    </label>
</template>

<script>
    export default {
        name: 'vRadio',
        data() {
            return {
                sizeClass: {
                    small: 'vui-radio-small',
                    middle: 'vui-radio-middle',
                    larger: 'vui-radio-larger'
                },
                ownChecked: !!this.checked
            }
        },
        props: {
            size: {
                default: 'small'
            },
            text: {
                type: [String, Number]
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
                this.$emit('onClick', event, this.ownChecked, this.value, this.index);
            }
        }
    }

</script>

<style scoped>
</style>
