<template>
    <i class="vui-icon-font" :class="{}"></i>
</template>

<script>
    export default {
        name: 'vIcon',
        data() {
            return {
                sizeClass: {
                    small: '16px',
                    middle:  '26px',
                    larger: '36px'
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
            }
        },
        methods: {
            click: function(event){
                this.$emit('click', event);
            }
        }
    }

</script>

<style scoped>

</style>
