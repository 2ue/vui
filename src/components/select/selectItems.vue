<template>
    <transition name="select-items">
        <ul class="vui-select-items f_disselected">
            <li class="vui-select-item" v-for="(item,index) in selfListData" :class="{'vui-actived': item.showChildren}">
                <p @click="showChildren(index)" :style="getStyleObject(item)">{{ item.name }}</p>
                <select-item v-if="item.showChildren && !!item.children && item.children.length > 0" :listData="item.children"></select-item>
            </li>
        </ul>
    </transition>
</template>

<script>
    export default {
        name: "selectItem",
        data() {
            return {
                selfListData: !this.listData || this.listData.length === 0 ? [] : [...this.listData]
            };
        },
        props: {
            listData: Array,
            showOne: Boolean
        },
        methods: {
            getStyleObject(item) {
                return { padding: '8px ' + (item._deep * 15 + 10) + 'px' }
            },
            showChildren(index) {
                let items = this.selfListData[index], itemChildrens = items.children;
                if (!itemChildrens || itemChildrens.length === 0) return;
                function loopData(items) {
                    items.forEach(item => {
                        item.showChildren = false;
                        if (item.children && item.children.length > 0) {
                            loopData(item.children);
                        }
                    });
                };
                if (this.showOne) {
                    loopData(this.selfListData);
                } else {
                    loopData(itemChildrens);
                };

                items.showChildren = !items.showChildren;
            }
        }
    };
</script>

<style scoped>
</style>
