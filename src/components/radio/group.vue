<template>
    <div class="vui-radio-group">
        <radio v-for="(item, index) in selfGroupData" :key="index" :index="index" :size="item.size" :name="name" :checked="item.selfChecked" :value="getVal(item,index)" @onClick="onClick">{{item.text}}</radio>
    </div>
</template>

<script>

    import Radio from './index';
    export default {
        name: 'vRadioGroup',
        data() {
            return {
                selfGroupData: this.getRadioData()
            }
        },
        components: {
            Radio
        },
        props: {
            //radio组的数据
            groupData: {
                type: Array,
                default() {
                    return [];
                }
            },
            //radio组的name
            name: {
                type: String,
                default: 'radio'
            },
            //被选中的项
            checkedData: {
                type: [String, Number],
                default: undefined
            },
            //指定groupData中的某个键值来判定radio的选中状态
            checkedKey: {
                type: String,
                default: 'index'
            }
        },
        methods: {
            //重新组装groupData数据，便于组件内部调用
            getRadioData() {
                const _this = this, checkedKey = _this.checkedKey, checkedData = _this.checkedData;
                let selfGroupData = [];
                this.groupData.forEach((radio, index) => {
                    selfGroupData.push({ ...radio, ...{ selfChecked: this.getVal(radio, index) === this.checkedData } });
                });
                return selfGroupData;
            },
            //根据map值来获取映射的值
            getVal(item, index) {
                return this.checkedKey !== 'index' ? item[this.checkedKey] : index
            },
            //单个点击时触发
            onClick(event, value, index) {
                this.$emit('onClick', event, value, index);
            }
        }
    }

</script>

<style scoped>
</style>
