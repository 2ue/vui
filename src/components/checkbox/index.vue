<template>
    <label :class="classes" :index="index">
        <input type="checkbox" v-model="selfChecked" :disabled="disabled" @click.stop.self="click" :name="selfName" :value="value">
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
                if (this.disabled) classes += ' vui-checkbox-disabled';
                return classes;
            }
        },
        methods: {
            click: function (event) {
                if (!!this.disabled) return;
                this.$emit('onClick', event, this.selfChecked, this.value, this.index);
            }
        }
    }

</script>

<style scoped>
</style>
