<template>
    <div>
        <v-header></v-header>
        <div class="vui-warper-content vui-content vui-clear">
            <div class="vui-menu">
                <p v-for="route in RouterList" class="menu-list" :class="{'menu-active': route.path == $route.path}">
                    <router-link :to="route.path">{{ route.name }}</router-link>
                </p>
            </div>
            <div class="vui-main">
                <router-view></router-view>
            </div>
        </div>
        <v-footer></v-footer>
    </div>
</template>

<script>
    import VHeader from './components/header'
    import VFooter from './components/footer'
    import RouterList from './libs/routerList'

    export default {
        name: 'app',
        data() {
            return {
                RouterList,
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

<style lang="less">
    @import url('./assets/less/variable.less');
    body {
        font: 12/1.5 "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        color: #333;
    }

    .vui-warper {
        width: 100%;
        min-width: 80%;
    }

    .vui-warper-content {
        width: 80%;
        margin: 0 auto;
    }

    .vui-content {
        margin: 0 auto;
        position: relative;
    }

    .vui-menu {
        float: left;
        /* position: absolute; */
        /* top: 0; */
        background: lighten(@border-color-less, 5%);
        width: 280px;
        margin-right: 20px;
        padding-top: 30px;
        padding-bottom: 30px;
        p {
            text-decoration: none;
            cursor: pointer;
        }
    }

    .vui-main {
        padding: 20px 0 20px 300px;
        box-sizing: border-box;
        width: 100%;
        min-height: 300px;
    }

    .vui-clear {
        zoom: 1;
    }

    .vui-clear:before,
    .vui-clear:after {
        display: table;
        content: "";
    }

    .vui-clear:after {
        clear: both;
    }

    .menu-list {
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        text-indent: 1em;
        &:hover {
            text-decoration: underline;
        }
    }

    .menu-active {
        background: @light-color;
        color: #fff;
    }
</style>
