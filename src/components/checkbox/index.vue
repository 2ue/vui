<template>
    <label class="vui-checkbox-warp" :index="index">
        <input type="checkbox" v-model="ownChecked" @click="click" :name="name" :value="value">
        <span class="vui-checkbox"></span>
        <span class="vui-checkbox-text" v-if="text">{{text}}</span>
        <!-- <slot name="text"></slot> -->
    </label>
</template>

<script>
    export default {
        name: 'vCheckbox',
        data() {
            return {
                sizeClass: {
                    small: 'vui-checkbox-small',
                    middle: 'vui-checkbox-middle',
                    larger: 'vui-checkbox-larger'
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
