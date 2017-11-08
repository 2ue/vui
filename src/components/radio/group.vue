<template>
    <div class="vui-radio-group">
        <slot name="before"></slot>
        <radio v-for="(item, index) in selfRadioDatas" :key="index" :index="index" :size="item.size" :name="name" :checked="item.selfChecked"
            :text="item.text" :value="item.value" @onClick="singleClick"></radio>
        <slot name="after"></slot>
    </div>
</template>

<script>

    import Radio from './index';
    export default {
        name: 'vRadioGroup',
        data() {
            return {
                selfRadioDatas: this.getRadioData()
            }
        },
        components: {
            Radio
        },
        props: {
            //radio组的数据
            radioDatas: {
                type: Array,
                default() {
                    return [];
                }
            },
            //radio组的name
            name: String,
            //被选中的项
            checkedData: {
                type: [String, Number],
                default: undefined
            },
            //指定radioDatas中的某个键值来判定radio的选中状态
            checkedKey: {
                type: String,
                default: 'index'
            }
        },
        methods: {
            //重新组装radioDatas数据，便于组件内部调用
            getRadioData() {
                const _this = this, checkedKey = _this.checkedKey, checkedData = _this.checkedData;
                let radioItems = [];
                this.radioDatas.forEach(function (radio, index) {
                    radioItems.push({ ...radio, ...{ selfChecked: typeof checkedData === 'undefined' ?  !!radio.checked : checkedKey === 'index' ? index === checkedData : radio[_this.checkedKey] === checkedData} });
                });
                console.log('radioItems==>',{...radioItems})
                return radioItems;
            },
            //单个点击时触发
            singleClick(event, value, index) {
                this.$emit('singleClick', event, value, index);
            }
        }
    }

</script>

<style scoped>
</style>
