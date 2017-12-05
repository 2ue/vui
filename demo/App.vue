<template>
    <div>
        <v-header></v-header>
        <div class="warper-content clear">
            <div class="menu">
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
    body {
        color: #333;
        font-size: 14px;
    }

    h1.h1-title {
        font-size: 18px;
        font-weight: bold;
        line-height: 40px;
        border-bottom: 1px solid $border-color-less;
    }

    .h1-content {
        margin: 10px 0 20px;
        font-size: 14px;
    }

    .h1-content a {
        color: #6772E5;

    }

    .vui-page-title {
        margin-top: 20px;
        margin-bottom: 5px;
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
