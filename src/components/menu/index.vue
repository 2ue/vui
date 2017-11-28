<template>
    <div class="vui-menu">
        <menuItems :menuData="selfMenuData" :showOne="showOne" :mapTable="mapTable"></menuItems>
    </div>
</template>

<script>
    import MenuItems from "./menuItems.vue";
    export default {
        name: "vMenu",
        data() {
            return {
                selfMenuData: [],
                slefMapTable: { ...this.mapTable }
            };
        },
        props: {
            menuData: Array,
            showOne: Boolean,
            mapTable: Object
        },
        components: {
            MenuItems
        },
        created() {
            const items = !this.menuData || this.menuData.length === 0 ? [] : [...this.menuData];
            function loopData(data, deep) {
                data.forEach(item => {
                    item._deep = !deep ? 0 : deep;
                    item._showChildren = false;
                    if (item.children && item.children.length > 0) {
                        item.children = [...item.children];
                        loopData(item.children, item._deep + 1);
                    }
                });
            };
            loopData(items);
            this.selfMenuData = items;
        },
        methods: {
        }
    };
</script>

<style scoped>
</style>
