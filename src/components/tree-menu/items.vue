<template>
    <transition name="vui-tree-menu-items">
        <ul class="vui-tree-menu-items f-disselected">
            <li class="vui-tree-menu-item" v-for="(item,index) in selfMenuData" :class="getActivedClass(item)">
                <span @click="showChildren(index)" :style="getStyleObject(item)">
                    <v-icon v-if="item._hasChildren" :type="iconType[item._showChildren ? 1 : 0]" size="14"></v-icon>
                    <v-checkbox :name="name" @onClick.self.stop="checked(index)"></v-checkbox>
                    {{ item[slefMapTable.name] }}
                </span>
                <menu-item v-if="item._showChildren && item._hasChildren" :menuData="item.children" :mapTable="slefMapTable" @click="click"></menu-item>
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
                slefMapTable: { ...mapTableDefault, ...this.mapTable },
                iconType: ['add', 'minus'],
                name: this.$util.gId()
            };
        },
        props: {
            menuData: Array,
            mapTable: Object
        },
        methods: {
            getStyleObject(item) {
                let iconMargin = !item._hasChildren ? 21 : 0, left = item._deep * 15 + 15;
                return { padding: `8px ${left}px 8px ${left + iconMargin}px` }
            },
            getActivedClass(item) {
                const selfHref = this.slefMapTable.href;
                return { 'vui-menu-actived': item._actived || (item[selfHref] && this.$route && this.$route.fullPath === item[selfHref]) }
            },
            showChildren(index) {
                let items = this.selfMenuData[index], itemChildrens = items.children, oldStatus = items._showChildren;
                function loopData(arr) {
                    arr.forEach(item => {
                        item._actived = false;
                        item._showChildren = false;
                        if (item.children && item.children.length > 0) {
                            loopData(item.children);
                        }
                    });
                };
                if (itemChildrens) {
                    loopData(itemChildrens);
                    items._showChildren = !oldStatus;
                    items._actived = items._showChildren;
                } else {
                    loopData(this.selfMenuData);
                    items._showChildren = false;
                    items._actived = true;
                }
                this.selfMenuData = [...this.selfMenuData];
                this.click(items);
            },
            click(items) {
                this.$emit('click', { ...items });
            },
            checked(index) {
                console.log('index==>', index)
                this.$emit('checked', { ...this.selfMenuData[index] });
            }
        }
    };
</script>

<style scoped>
</style>
