<template>
    <div class="vui-range" :class="{'vui-range-disabled': disabled}" @click.self="clickBar" ref="wrap">
        <input type="range" hidden>
        <label @click.self="clickBar" :style="{width: selfPonits[1] - selfPonits[0] + 'px',left:selfPonits[0] + 'px'}">
            <span v-if="showStartPoint" class="vui-range-start" :class="classes" ref="satrtPoint" :data-tips="showDataTips!=='none' ? selfValue[0] : ''"
                @mouseup.stop="mouseup" @mousedown.stop="mousedown" @mousemove.stop="mousemove"></span>
            <span class="vui-range-end" :class="classes" ref="endPoint" :data-tips="selfValue[1]" @mouseup.stop="mouseup" @mousedown.stop="mousedown"
                @mousemove.stop="mousemove"></span>
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
        },
        computed: {
            selfSize() {
                let res = Math.abs((this.selfPonits[1] - this.selfPonits[0]) / (this.selfSectionValue[1] - this.selfSectionValue[0]));
                return Math.round(res * 100) / 100;
            },
            selfPonits() {
                return this.valChangePoint();
            },
            showStartPoint() {
                return isNaN(this.value);
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
            }
        },
        methods: {
            //重新组装传递的选中值
            getValue() {
                let value = this.value, isNumber = !isNaN(value), sectionValue = this.selfSectionValue;
                console.log('sectionValue==>', sectionValue)
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
                if (!this.showStartPoint || clickPointDis - points[0] > t) {
                    if (clickPointDis > this.width - 7) clickPointDis = this.width - 7;
                    this.pointChangeVal(clickPointDis, 1)
                } else {
                    if (clickPointDis < -7) clickPointDis = -7;
                    this.pointChangeVal(clickPointDis, 0)
                }
            },
            mousedown(event) {
                this.startDragEvent = event
            },
            mouseup(event) {
                if (!this.startDragEvent || !this.endDragEvent || this.disabled) return;
                let clickPointDis = this.endDragEvent.clientX - this.startDragEvent.clientX, points = this.selfPonits, index = event.target === this.$refs.satrtPoint ? 0 : 1;
                console.log(index)
                console.log(clickPointDis)
                this.pointChangeVal(points[index] + clickPointDis, index);
                this.startDragEvent = null, this.endDragEvent = null;
            },
            mousemove(event) {
                // console.log('event mousemove==>', event)
                this.endDragEvent = event
            },
            //将DOM的位置点化成区间值
            pointChangeVal(point, index) {
                const sectionVal = this.selfSectionValue;
                console.log('selfValue 0ld==>', [...this.selfValue])
                if (!point || point === this.selfPonits[index]) return;
                let p = Math.round(point * (sectionVal[1] - sectionVal[0]) / this.width + sectionVal[0]);
                if (p < sectionVal[0]) p = sectionVal[0];
                if (p > sectionVal[1]) p = sectionVal[1];
                console.log('this.selfValue==>', this.selfValue)
                this.selfValue.splice(index, 1, p);
                console.log('selfValue new==>', [...this.selfValue])
            },
            //将区间值转换成DOM的位置点
            valChangePoint(v) {
                const sectionVal = this.selfSectionValue, value = this.selfValue, distance = sectionVal[1] - sectionVal[0], size = this.width;
                let startPoint = ((value[0] - sectionVal[0]) * size / distance), endPoint = ((value[1] - sectionVal[0]) * size / distance);
                if (startPoint < -7) startPoint = -7;
                if (endPoint > size - 7) endPoint = size - 7;
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
