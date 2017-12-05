<template>
    <transition name="vui-menu-items">
        <ul class="vui-menu-items f-disselected">
            <li class="vui-menu-item" v-for="(item,index) in selfMenuData" :class="getActivedClass(item)">
                <p v-if="item[slefMapTable.href]">
                    <router-link :to="item[slefMapTable.href]" @click.stop="showChildren(index)" :style="getStyleObject(item)">{{ item[slefMapTable.name] }}</router-link>
                </p>
                <p v-else class="vui-menu-custom" @click="showChildren(index)" :style="getStyleObject(item)">{{ item[slefMapTable.name] }}</p>
                <menuItem v-if="item._showChildren && !!item.children && item.children.length > 0" :menuData="item.children" :showOne="showOne"
                    :mapTable="slefMapTable"></menuItem>
            </li>
        </ul>
    </transition>
</template>

<script>
    //映射关系
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
            getActivedClass(item) {
                const selfHref = this.slefMapTable.href;
                return { 'vui-menu-actived': item._actived || (item[selfHref] && this.$route.fullPath === item[selfHref]) }
            },
            showChildren(index) {
                let items = this.selfMenuData[index], itemChildrens = items.children, oldStatus = items._showChildren;
                function loopData(items) {
                    items.forEach(item => {
                        item._actived = false;
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
                items._actived = true;
                this.selfMenuData = [...this.selfMenuData]
            }
        }
    };
</script>

<style scoped>
</style>
