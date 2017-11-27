<template>
    <ul class="vui-select-items">
        <li class="vui-select-item" v-for="(item,index) in selfListData" :class="{'vui-actived': item.showChildren}">
            <p @click="showChildren(index)" :style="{padding:'8px ' + (item.deep * 10 + 10 )+'px'}">{{item.name + item.deep}}</p>
            <select-item v-if="item.showChildren && !!item.children && item.children.length > 0" :listData="item.children"></select-item>
        </li>
    </ul>
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
            listData: Array
        },
        created() {
            console.log('selfListData==>', this.selfListData)
        },
        methods: {
            showChildren(index) {
                let item = this.selfListData[index], itemChildrens = item.children;
                item.showChildren = true;
                if (!itemChildrens || itemChildrens.length === 0) return;
                console.log('9999999', [...item])
            }
        }
    };
</script>

<style scoped lang=less>
    @border-color: #EDEDED;
    .vui-select-items {
        background: #fff;
        border-top: 1px solid @border-color;
        p {
            padding: 8px 10px;
            width: 100%;
            box-sizing: border-box;
        }
        li {
            border-bottom: 1px solid @border-color;
            &:hover>p,
            &.vui-actived>p {
                background: darken(@border-color, 10%);
                cursor: pointer;
            }
        }
    }
</style>
