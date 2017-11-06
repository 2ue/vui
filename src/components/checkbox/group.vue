<template>
    <div class="vui-checkbox-group">
        <checkbox v-for="(item, index) in checkboxData" :key="index" :index="index" :size="item.size" :name="name" :checked="getCkeckedStatus(index, item.checked)"
            :text="item.text" :value="item.value" @onClick="singleClick"></checkbox>
    </div>
</template>

<script>

    import Checkbox from './index';
    export default {
        name: 'vCheckboxGroup',
        data() {
            return {
                checked: true,
                ownChecked: this.checked,
                checkboxData: this.groupData,
                selfCheckedItems: this.checkedItems.length === 0 ? [] : [...this.checkedItems]
            }
        },
        components: {
            Checkbox
        },
        watch: {
            selfCheckedItems: {
                deep: true,
                handler(val) {
                    console.log('uuuuuuuu==>', [...val])
                    this.getCkeckedItems();
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
            name: String,
            checkedItems: {
                type: Array,
                default() {
                    return [];
                }
            },
            checkedKey: {
                type: String,
                default: 'index'
            }
        },
        methods: {
            //获取是否选中状态
            getCkeckedStatus(index, checked) {
                const checkedItems = this.checkedItems, checkedKey = this.checkedKey;
                if (checkedItems.length > 0) {
                    let checkedVal = index;
                    if (checkedKey !== 'index') checkedVal = this.checkboxData[index][checkedKey];
                    return checkedItems.indexOf(checkedVal) >= 0;
                } else {
                    if (chcked) this.selfCheckedItems.push(index);
                    return checked
                }
            },
            singleClick(event, checked, value, index) {
                const checkedVal = this.checkedKey === 'index' ? index : this.checkboxData[index][this.checkedKey];
                const checkedIndex = this.selfCheckedItems.indexOf(checkedVal);
                if (checked) {
                    this.selfCheckedItems.push(checkedVal);
                } else {
                    this.selfCheckedItems.splice(checkedIndex, 1);
                }
                this.$emit('singleClick', event, checked, value, index);
            },
            getCkeckedItems() {
                let checkedItems = [];
                this.$emit('updateCheckedItems', checkedItems);
            }
        }
    }

</script>

<style scoped>
</style>
