<template>
    <div>
        <v-header></v-header>
        <div class="warper-content clear">
            <div class="menu">
                <!-- <p v-for="route in RouterList" class="menu-list" :class="{'menu-active': route.path == $route.path}">
                    <router-link :to="route.path">{{ route.cname || route.name }}</router-link>
                </p> -->
                <v-menu class="menu-list" :menuData="RouterList" :showOne="true" :mapTable="mapTable"></v-menu>
            </div>
            <div class="main">
                <router-view></router-view>
            </div>
        </div>
        <v-footer></v-footer>
    </div>
</template>

<script>
    import VHeader from './components/header'
    import VFooter from './components/footer'
    import RouterList from './libs/router-list'

    export default {
        name: 'app',
        data() {
            return {
                RouterList,
                mapTable: {
                    key: 'id',
                    name: 'cname',
                    href: 'path'
                }
            }
        },
        components: {
            VHeader,
            VFooter
        },
        methods: {
        }
    }

</script>

<style lang="scss">
    @import './assets/less/variable.scss';
    body {
        /* font: 12/1.5 "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif; */
        color: #333;
    }

    .warper {
        width: 100%;
        min-width: 80%;
    }

    .warper-content {
        width: 80%;
        margin: 0 auto;
        margin-top: 20px;
    }

    .content {
        margin: 0 auto;
        position: relative;
    }

    .menu {
        float: left;
        background: $border-color-less;
        width: 280px;
        margin-right: 20px;
        p {
            text-decoration: none;
            cursor: pointer;
        }
    }

    .main {
        padding: 20px 0 20px 300px;
        box-sizing: border-box;
        width: 100%;
        min-height: 300px;
    }

    .clear {
        zoom: 1;
    }

    .clear:before,
    .clear:after {
        display: table;
        content: "";
    }

    .clear:after {
        clear: both;
    }

    .menu-list {
        /* height: 30px;
        line-height: 30px; */
        font-size: 14px;
        text-indent: 1em;
        p:hover>a {
            text-decoration: underline;
        }
    }

    .menu-active {
        background: $light-color;
        color: #fff;
    }
</style>
