<template>
    <div>
        <h1>目的</h1>
        <div class="h1-content">
            以学习vue为目的而写的一个UI框架，除了会实现一些基本的UI功能模块外，也许会实现一些有趣的小功能。目前只适用于PC端
        </div>
        <h1>命名规范</h1>
        <div class="h1-content">
            文件夹名一律使用小写，用中划线(-)连接
            <br>文件名使用驼峰写法，首字母小写
            <br>css类名一律使用小写，用中划线(-)连接，并且框架内的类名必须以vui-开头
        </div>
        <h1>风格指南</h1>
        <div class="h1-content">
            按照推官方荐规范：
            <a href="https://cn.vuejs.org/v2/style-guide" target="_blank">style-guides</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'index',
        data() {
            return {}
        },
        methods: {
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1 {
        font-size: 18px;
        font-weight: bold;
        line-height: 40px;
        border-bottom: 1px solid #ccc;
    }

    .h1-content {
        margin: 10px 0 20px;
        font-size: 14px;
    }

    .h1-content a {
        color: #6772E5;

    }
</style>
