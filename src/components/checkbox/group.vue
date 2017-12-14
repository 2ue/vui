<template>
    <div class="vui-checkbox-group">
        <slot></slot>
        <checkbox v-for="(item, index) in selfGroupData" :disabled="disabled" :key="index" :index="index" :size="size" :name="name" :checked="item.selfChecked"
            :value="getVal(item,index)" @onClick="singleClick">{{item.text}}</checkbox>
    </div>
</template>

<script>

    import Checkbox from './index';
    export default {
        name: 'vCheckboxGroup',
        data() {
            return {
                selfGroupData: this.getGroupData(),
                selfCheckedData: this.checkedData.length === 0 ? [] : [...this.checkedData]
            }
        },
        components: {
            Checkbox
        },
        watch: {
            selfGroupData: {
                deep: true,
                handler(val) {
                    this.getCkeckedItems([...val]);
                }
            }
        },
        props: {
            groupData: {
                type: Array,
                default() {
                    return [];
                }
            },
            name: {
                type: String,
                default: 'checkbox'
            },
            size: String,
            //被选中的项
            checkedData: {
                type: Array,
                default() {
                    return [];
                }
            },
            //指定groupData中的某个键值来判定checkbox的选中状态
            checkedKey: {
                type: String,
                default: 'index'
            },
            disabled: {
                default: undefined
            }
        },
        methods: {
            //重新组装groupData数据，便于组件内部调用
            getGroupData() {
                const _this = this;
                let checkboxItems = [];
                this.groupData.forEach(function (checkbox, index) {
                    checkboxItems.push({ ...checkbox, ...{ selfChecked: _this.getCkeckedStatus(checkbox, index) } });
                });
                return checkboxItems;
            },
            //获取是否选中状态
            getCkeckedStatus(item, i) {
                const checkedData = this.checkedData, checkedKey = this.checkedKey;
                if (checkedData.length > 0) {
                    let checkedVal = i;
                    if (checkedKey !== 'index') checkedVal = item[checkedKey];
                    return checkedData.indexOf(checkedVal) >= 0
                } else {
                    return !!item.checked
                }
            },
            //根据map值来获取映射的值
            getVal(item, index) {
                return this.checkedKey !== 'index' ? item[this.checkedKey] : index
            },
            //单个点击时触发
            singleClick(event, checked, value, index) {
                this.selfGroupData[index].selfChecked = checked;
                this.$emit('singleClick', event, checked, value, index);
            },
            //选中状态发生更改时触发，向外传递所有被选中的checkbox
            getCkeckedItems(checkedData) {
                const checkItems = [];
                checkedData.forEach((item, index) => {
                    if (item.selfChecked) checkItems.push(this.getVal(item, index));
                })
                this.$emit('updateCheckedDatas', [...checkItems]);
            }
        }
    }

</script>

<style scoped>
</style>
