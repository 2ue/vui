<template>
    <div class="vui-checkbox-group">
        <slot name="before"></slot>
        <checkbox v-for="(item, index) in selfCheckboxDatas" :key="index" :index="index" :size="item.size" :name="name" :checked="item.checked"
            :text="item.text" :value="item.value" @onClick="singleClick"></checkbox>
        <slot name="after"></slot>
    </div>
</template>

<script>

    import Checkbox from './index';
    export default {
        name: 'vCheckboxGroup',
        data() {
            return {
                selfCheckboxDatas: this.getCheckboxData(),
                selfCheckedDatas: this.checkedDatas.length === 0 ? [] : [...this.checkedDatas]
            }
        },
        components: {
            Checkbox
        },
        watch: {
            selfCheckboxDatas: {
                deep: true,
                handler(val) {
                    this.getCkeckedItems([...val]);
                }
            }
        },
        props: {
            //checkbox组的数据
            checkboxData: {
                type: Array,
                default() {
                    return [];
                }
            },
            //checkbox组的name
            name: String,
            //被选中的项
            checkedDatas: {
                type: Array,
                default() {
                    return [];
                }
            },
            //指定checkboxData中的某个键值来判定checkbox的选中状态
            checkedKey: {
                type: String,
                default: 'index'
            }
        },
        methods: {
            //重新组装checkboxData数据，便于组件内部调用
            getCheckboxData() {
                const _this = this;
                let checkboxItems = [];
                this.checkboxData.forEach(function (checkbox, index) {
                    checkboxItems.push({ ...checkbox, ...{ checked: _this.getCkeckedStatus(checkbox, index) } });
                });
                return checkboxItems;
            },
            //获取是否选中状态
            getCkeckedStatus(item, i) {
                const checkedDatas = this.checkedDatas, checkedKey = this.checkedKey;
                if (checkedDatas.length > 0) {
                    let checkedVal = i;
                    if (checkedKey !== 'index') checkedVal = item[checkedKey];
                    return checkedDatas.indexOf(checkedVal) >= 0
                } else {
                    return !!item.checked
                }
            },
            //单个点击时触发
            singleClick(event, checked, value, index) {
                this.selfCheckboxDatas[index].checked = checked;
                this.$emit('singleClick', event, checked, value, index);
            },
            //选中状态发生更改时触发，向外传递所有被选中的checkbox
            getCkeckedItems(checkedDatas) {
                const _this = this, checkItems = [], checkedKey = _this.checkedKey;
                checkedDatas.forEach(function (item, index) {
                    if (item.checked) checkItems.push(checkedKey === 'index' ? index : item[checkedKey]);
                })
                this.$emit('updateCheckedDatas', [...checkItems]);
            }
        }
    }

</script>

<style scoped>
</style>
