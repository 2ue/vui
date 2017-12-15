<template>
    <i class="vui-icon-font" :style="{'font-size': fontVal, color: color }" :class="classes" @click="click"></i>
</template>

<script>
    export default {
        name: 'vIcon',
        data() {
            return {
                sizeVal: {
                    small: '16px',
                    middle: '26px',
                    larger: '36px'
                },
                sizeArr: ['small', 'middle', 'larger']
            }
        },
        computed: {
            fontVal: function () {
                let size = this.size, res;
                if (this.$util.testUnitStr(size)) {
                    if (isNaN(size)) {
                        res = size
                    } else {
                        res = size + 'px'
                    }
                }
                return res;
            },
            classes: function () {
                const size = this.size, typeClass = `vui-icon-${this.type}`;
                return this.sizeArr.indexOf(size) > -1 ? `${typeClass} vui-icon-${size}` : typeClass;
            }
        },
        props: {
            size: {
                type: [String, Number],
                default: 'middle'
            },
            type: {
                type: String
            },
            color: {
                type: String
            }
        },
        methods: {
            click(event) {
                this.$emit('click', event);
            }
        }
    }

</script>

<style scoped>
</style>
