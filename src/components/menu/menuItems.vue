<template>
    <transition name="menu-items">
        <ul class="vui-menu-items f-disselected">
            <li class="vui-menu-item" v-for="(item,index) in selfMenuData" :class="{'vui-actived': item._showChildren}">
                <p v-if="item[slefMapTable.href]" @click="showChildren(index)" :style="getStyleObject(item)">
                    <router-link :to="item[slefMapTable.href]">{{ item[slefMapTable.name] }}</router-link>
                </p>
                <p v-else @click="showChildren(index)" :style="getStyleObject(item)">{{ item[slefMapTable.name] }}</p>
                <menuItem v-if="item._showChildren && !!item.children && item.children.length > 0" :menuData="item.children" :showOne="showOne"
                    :mapTable="slefMapTable"></menuItem>
            </li>
        </ul>
    </transition>
</template>

<script>
    const mapTableDefault = {
        key: '',
        name: 'name',
        href: 'href'
    };
    export default {
        name: "menuItem",
        data() {
            return {
                selfMenuData: [...this.menuData],
                slefMapTable: { ...mapTableDefault, ...this.mapTable }
            };
        },
        props: {
            menuData: Array,
            showOne: Boolean,
            mapTable: Object
        },
        methods: {
            getStyleObject(item) {
                return { padding: '8px ' + (item._deep * 15 + 10) + 'px' }
            },
            showChildren(index) {
                let items = this.selfMenuData[index], itemChildrens = items.children, oldStatus = items._showChildren;
                if (!itemChildrens || itemChildrens.length === 0) return;
                function loopData(items) {
                    items.forEach(item => {
                        item._showChildren = false;
                        if (item.children && item.children.length > 0) {
                            loopData(item.children);
                        }
                    });
                };
                if (this.showOne) {
                    loopData(this.selfMenuData);
                } else {
                    loopData(itemChildrens);
                };

                items._showChildren = !oldStatus;
                this.selfMenuData = [...this.selfMenuData]
            }
        }
    };
</script>

<style scoped>
</style>
