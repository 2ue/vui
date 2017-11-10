<template>
    <label class="vui-switch-warp" :index="index">
        <input type="checkbox" v-model="ownChecked" @click="click" :name="name" :value="value">
        <span class="vui-switch vui-dib-vt"></span>
        <span class="vui-switch-text vui-dib-vt" v-if="text">{{text}}</span>
        <slot></slot>
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
                this.$emit('on-change', event, this.ownChecked, this.value, this.index);
            }
        }
    }

</script>

<style scoped>
</style>
