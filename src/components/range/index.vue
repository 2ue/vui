<template>
    <div class="vui-range" @click.self="clickBar">
        <input type="range" hidden>
        <label @click.self.stop="clickBar" :style="{width: selfDistance[1] - selfDistance[0] + 'px',left:selfDistance[0] + 'px'}">
            <span v-if="showStartPoint" class="vui-range-start" ref="rangeStart"></span>
            <span class="vui-range-end" ref="rangEnd"></span>
        </label>
        {{selfSectionValue}} {{selfValue}}{{showStartPoint}}
    </div>
</template>

<script>
    export default {
        name: 'vRange',
        data() {
            return {
                left: [0, 100],
                selfValue: []
            }
        },
        created() {
            console.log('getValue==>', this.getValue())
            this.selfValue = this.getValue()
        },
        computed: {
            selfDistance() {
                return this.valChangePoint();
            },
            // selfValue() {
            //     return this.getValue();
            // },
            selfSectionValue() {
                let value = this.sectionValue, isNumber = isNaN(value);
                if (!isNumber && value <= 0) return [+value, 100];
                if (!isNumber && value > 0) return [0, +value];
                return [...value]
            },
            showStartPoint() {
                return isNaN(this.value);
            }
        },
        props: {
            value: {
                type: [Number, Array, String],
                default: 0
            },
            sectionValue: {
                type: [Number, Array, String],
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
            getValue() {
                let value = this.value, isNumber = isNaN(value), sectionValue = this.selfSectionValue;
                if (!isNumber) {
                    if (value < sectionValue[0] || value > sectionValue[1]) {
                        value = [0, 100];
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
                let clickPointDis = event.offsetX;
                const satrtPoint = this.$refs.rangeStart, endPoint = this.$refs.rangEnd, distance = this.selfDistance, t = (distance[1] - distance[0]) / 2;
                console.log('distance==>', [...distance])
                console.log('this.selfValue1111==>', [...this.selfValue])
                if (!this.showStartPoint || (clickPointDis) > t) {
                    if (clickPointDis > this.width - 7) clickPointDis = this.width - 7;
                    console.log('asddas=>', 1)
                    this.pointChangeVal(clickPointDis, 1)
                } else {
                    console.log('asddas=>', 0)
                    if (clickPointDis < -7) clickPointDis = -7;
                    this.pointChangeVal(clickPointDis, 0)
                }

            },
            pointChangeVal(point, index) {
                const sectionVal = this.selfSectionValue, allDistance = sectionVal[1] - sectionVal[0], width = this.width;
                let p = Math.round((point - sectionVal[0]) * allDistance / width + sectionVal[0]);
                if (p < sectionVal[0]) p = sectionVal[0];
                if (p > sectionVal[1]) p = sectionVal[1];
                this.selfValue.splice(index, 1, p);
                console.log('this.selfValue==>', [...this.selfValue])
            },
            valChangePoint(v) {
                const sectionVal = this.selfSectionValue, value = this.selfValue, allDistance = sectionVal[1] - sectionVal[0], size = this.width;
                let startPoint = ((value[0] - sectionVal[0]) * size / allDistance), endPoint = ((value[1] - sectionVal[0]) * size / allDistance);
                if (startPoint < -7) startPoint = -7;
                if (endPoint > size - 7) endPoint = size - 7;
                return [startPoint, endPoint];
            }
        }
    }

</script>

<style scoped>
</style>
