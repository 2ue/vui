<template>
    <i class="vui-icon-font" :class="'vui-icon-' + type" :style="{fontSize: fontVal, color: color }"></i>
</template>

<script>
    export default {
        name: 'vIcon',
        data() {
            return {
                sizeVal: {
                    small: '16px',
                    middle:  '26px',
                    larger: '36px'
                }
            }
        },
        computed: {
            fontVal: function () {
                if(!this.size) return '';
                if(this.$util.isNumber(this.size)) return this.size + 'px';
                if(!this.sizeVal[this.size]) return this.size;
                return this.sizeVal[this.size];
            }
        },
        props: {
            size: {
                type: [String, Number],
                default: 'small'
            },
            type: {
                type: String
            },
            color: {
                type: String
            }
        },
        methods: {
        }
    }

</script>

<style scoped>

</style>
