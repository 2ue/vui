<template>
    <div class="vui-select">
        <input type="text" class="vui-select-input">
        <select-items :listData="selfListData"></select-items>
    </div>
</template>

<script>
    import SelectItems from "./select-items.vue";
    export default {
        name: "vSelect",
        data() {
            return {
                selfListData: this.dealWithData()
            };
        },
        props: {
            listData: Array
        },
        components: {
            SelectItems
        },
        methods: {
            dealWithData() {
                const items = !this.listData || this.listData.length === 0 ? [] : [...this.listData];
                function loopData(data, deep) {
                    data.forEach(item => {
                        console.log('deep', deep)
                        item.deep = !deep ? 0 : deep;
                        if (item.children && item.children.length > 0) {
                            item.children = [...item.children];
                            loopData(item.children, item.deep + 1);
                        }
                    });
                };
                loopData(items);
                return items;
            }
        }
    };
</script>

<style scoped lang="less">
    @border-color: #EDEDED;
    .vui-select>ul {
        border: 1px solid @border-color;
        border-bottom: none;
    }
</style>
