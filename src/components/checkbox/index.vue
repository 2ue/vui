<template>
    <label class="vui-checkbox" :class="className">
        <input type="checkbox">
        <span></span>
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
                typeClass: {
                    default: 'vui-checkbox-default',
                    primary: 'vui-checkbox-primary',
                    ghost: 'vui-checkbox-ghost',
                    dashed: 'vui-checkbox-dashed'
                }
            }
        },
        computed: {
            widthSize: function () {
                let width = this.width;
                if (this.$util.isNumber(width)) width = width + 'px';
                return width;
            },
            className: function () {
                return [this.sizeClass[this.size], this.typeClass[this.type]].join(' ');
            }
        },
        props: {
            size: {
                default: 'small'
            },
            type: {
                type: String,
                default: 'default'
            },
            width: {
                type: [String, Number]
            },
            text: {
                default: 'Checkbox'
            },
        },
        methods: {
            click: function (event) {
                this.$emit('click', event);
            }
        }
    }

</script>

<style scoped>

</style>
