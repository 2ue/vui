<template>
    <div>
        <p class="vui-page-title">测试</p>
        <div class="vui-p">
            <p>sectionValue属性：数组，值的选择范围</p>
            <v-range :sectionValue="[-20,199]"></v-range>
        </div>
        <div class="vui-p">
            <p>range属性：是否开启两个选择点，只对value属性是数字时生效，value为数组时将忽略此属性，自动开启两个选择点</p>
            <p>value属性：选择的值，可以为空、数字、数组（为数组时，超过边界值，自动等于边界值）</p>
            <p>value为空或者位数字不在sectionValue范围内，则默认为sectionValue[0];</p>
            <p>
                <v-range :sectionValue="[-20,80]"></v-range>
            </p>
            <p>
                <v-range :sectionValue="[-20,80]" value="200"></v-range>
            </p>
            <p>value为数字时默认只有一个选择点，可以设置range属性为true开启两个选择点,value则会变为[sectionValue[0],value]</p>
            <p>
                <v-range :sectionValue="[-20,80]" :value="30" :range="true"></v-range>
            </p>
            <p>value为数组，强制为两个选择点，range不生效</p>
            <p>
                <v-range :sectionValue="[-20,80]" :value="[-10,40]"></v-range>
            </p>
        </div>
        <div class="vui-p">
            <p>width属性：宽度，接收数值和带单位(px,em,rem)的数值，不支持百分比；默认300；默认单位为px</p>
            <v-range :sectionValue="[0,300]" value="100" :width="500"></v-range>
        </div>
        <div class="vui-p">
            <p>disabled属性：禁用，布尔值，默认为false</p>
            <v-range :sectionValue="[0,300]" value="100" :disabled="true"></v-range>
        </div>
        <div class="vui-p">
            <p>showDataTips属性：是否显示data-tips；支持none，always和hover，分别一直不显示，总是显示，鼠标悬浮时显示，默认none</p>
            <p>
                <v-range :sectionValue="[0,200]" value="30"></v-range>
            </p>
            <p>
                <v-range :sectionValue="[0,200]" value="100" showDataTips="always"></v-range>
            </p>
            <p>
                <v-range :sectionValue="[0,200]" value="150" showDataTips="hover"></v-range>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'range',
        data() {
            return {
            }
        },
        methods: {
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
