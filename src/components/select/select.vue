<template>
    <div class="vui-select">
        <input type="text" class="vui-select-input">
        <selectItems :listData="selfListData" :showOne="showOne"></selectItems>
    </div>
</template>

<script>
    import SelectItems from "./selectItems.vue";
    export default {
        name: "vSelect",
        data() {
            return {
                selfListData: []
            };
        },
        props: {
            listData: Array,
            showOne: Boolean
        },
        components: {
            SelectItems
        },
        created() {
            this.dealWithData()
        },
        methods: {
            //处理数据
            dealWithData() {
                const items = !this.listData || this.listData.length === 0 ? [] : [...this.listData];
                function loopData(data, deep) {
                    data.forEach(item => {
                        item._deep = !deep ? 0 : deep;
                        if (item.children && item.children.length > 0) {
                            item.children = [...item.children];
                            loopData(item.children, item._deep + 1);
                        }
                    });
                };
                loopData(items);
                this.selfListData = items;
            }
        }
    };
</script>

<style scoped>
</style>
