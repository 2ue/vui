<template>
    <label :class="classes" :index="index">
        <input v-if="selfChecked" type="radio" checked :disabled="disabled" @click.stop="click" :name="name" :value="value">
        <input v-else type="radio" @click="click" :disabled="disabled" :name="selfName" :value="value">
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
                selfChecked: !!this.checked,
                selfName: this.name || this.$util.gId()
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
            index: [String, Number],
            disabled: {
                default: undefined
            }
        },
        computed: {
            classes() {
                let classes = this.sizeClass[this.size];
                if (this.disabled) classes += ' vui-radio-disabled';
                return classes;
            }
        },
        methods: {
            click: function (event) {
                if (!!this.disabled) return;
                this.$emit('onClick', event, this.value, this.index);
            }
        }
    }

</script>

<style scoped>
</style>
