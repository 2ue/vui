<template>
    <div class="vui-range" :class="{'vui-range-disabled': disabled}" @click.self="clickBar" ref="wrap">
        <input type="range" hidden>
        <label @click.self="clickBar" :style="{width: selfPonits[1] - selfPonits[0] + 'px',left:selfPonits[0] + 'px'}">
            <span v-if="selfShowStartPoint" class="vui-range-start" :class="classes" ref="satrtPoint" :data-tips="showDataTips!=='none' ? selfValue[0] : ''"></span>
            <span class="vui-range-end" :class="classes" ref="endPoint" :data-tips="selfValue[1]"></span>
        </label>
    </div>
</template>

<script>
    export default {
        name: 'vRange',
        data() {
            return {
                selfStep: this.step,
                selfValue: [],
                selfSectionValue: [...this.sectionValue],
                startDragEvent: null,
                endDragEvent: null
            }
        },
        created() {
            this.selfValue = this.getValue();
            console.log('selfSize==>', this.selfSize)
        },
        computed: {
            selfWidth() {
                return isNaN(parseFloat(this.width)) ? 300 : parseFloat(this.width);
            },
            selfSize() {
                let res = Math.abs((this.selfSectionValue[1] - this.selfSectionValue[0]) / this.selfWidth);
                //为了最大程度的保证精度，保留6位小数
                return Math.round(res * 1000000) / 1000000;
            },
            selfPonits() {
                return this.valChangePoint();
            },
            selfSectionPonits() {
                return [Math.ceil(this.selfValue[0] / this.selfSize), Math.round(this.selfValue[1] / this.selfSize)]
            },
            selfShowStartPoint() {
                return isNaN(this.value) || this.range;
            },
            classes() {
                return this.showDataTips === 'always' ? 'vui-data-tips-hover' : '';
            }
        },
        props: {
            step: {
                type: Number,
                default: 3,
            },
            value: {
                type: [Number, Array, String],
                default: 0
            },
            sectionValue: {
                type: [Array],
                default: () => [0, 100]
            },
            disabled: {
                type: Boolean,
                default: false
            },
            width: {
                type: [Number, String],
                default: 300
            },
            showDataTips: {
                type: String,
                default: 'hover'
            },
            range: Boolean
        },
        methods: {
            //重新组装传递的选中值
            getValue() {
                let value = this.value, isNumber = !isNaN(value), sectionValue = this.selfSectionValue;
                if (isNumber) {
                    if (value < sectionValue[0] || value > sectionValue[1]) {
                        value = [0, 0];
                    } else {
                        value = [sectionValue[0], +value];
                    }
                } else {
                    if (value[0] < sectionValue[0]) value[0] = sectionValue[0];
                    if (value[1] > sectionValue[1]) value[1] = sectionValue[1];
                }
                return value;
            },
            clickBar(event) {
                if (this.disabled) return;
                let clickPointDis = event.offsetX, points = this.selfPonits, t = (points[1] - points[0]) / 2;
                if (event.target !== this.$refs.startPoint) clickPointDis = points[0] + clickPointDis;
                if (!this.selfShowStartPoint || clickPointDis - points[0] > t) {
                    if (clickPointDis > this.selfWidth - 7) clickPointDis = this.selfWidth - 7;
                    this.pointChangeVal(clickPointDis, 1)
                } else {
                    if (clickPointDis < -7) clickPointDis = -7;
                    this.pointChangeVal(clickPointDis, 0)
                }
            },
            //将DOM的位置点化成区间值
            pointChangeVal(point, index) {
                const sectionVal = this.selfSectionValue;
                if (!point || point === this.selfPonits[index]) return;
                let p = Math.round(point * this.selfSize + sectionVal[0]);
                if (p < sectionVal[0]) p = sectionVal[0];
                if (p > sectionVal[1]) p = sectionVal[1];
                this.selfValue.splice(index, 1, p);
            },
            //将区间值转换成DOM的位置点
            valChangePoint(v) {
                const sectionVal = this.selfSectionValue, value = this.selfValue, size = this.selfSize, width = this.width;
                let startPoint = ((value[0] - sectionVal[0]) / size), endPoint = ((value[1] - sectionVal[0]) / size);
                if (startPoint < -7) startPoint = -7;
                if (endPoint > width - 7) endPoint = width - 7;
                return [startPoint, endPoint];
            }
        }
    }

</script>

<style scoped>
    /deep/[data-tips]:hover:before,
    /deep/[data-tips].vui-data-tips-hover:before {
        margin-top: -36px;
    }
</style>
