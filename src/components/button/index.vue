<template>
    <button class="vui-button" :class="className" :style="{ width:selfWidth }" @click="click">
        <slot>{{ text }}</slot>
    </button>
</template>

<script>
    export default {
        name: 'vButton',
        data() {
            return {
                sizeClass: {
                    small: 'vui-button-small',
                    middle: 'vui-button-middle',
                    larger: 'vui-button-larger'
                },
                typeClass: {
                    default: 'vui-button-default',
                    primary: 'vui-button-primary',
                    ghost: 'vui-button-ghost',
                    dashed: 'vui-button-dashed'
                }
            }
        },
        computed: {
            selfWidth: function () {
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
                default: 'Button'
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
