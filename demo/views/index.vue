<template>
    <div>
        <h1 class="h1-title">目的</h1>
        <div class="h1-content">
            以学习vue为目的而写的一个UI框架，除了会实现一些基本的UI功能模块外，也许会实现一些有趣的小功能。目前只适用于PC端
        </div>
        <h1 class="h1-title">命名规范</h1>
        <div class="h1-content">
            文件夹名一律使用小写，用中划线(-)连接
            <br>文件名使用驼峰写法，首字母小写
            <br>css类名一律使用小写，用中划线(-)连接，并且框架内的类名必须以vui-开头
        </div>
        <h1 class="h1-title">风格指南</h1>
        <div class="h1-content">
            按照推官方荐规范：
            <a href="https://cn.vuejs.org/v2/style-guide" target="_blank">style-guides</a>
        </div>
        <h1 class="h1-title">风格指南</h1>
        <div class="h1-content">
            <v-button type="ghost" @click="login"></v-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'index',
        data() {
            return {
                token: undefined
            }
        },
        watch: {
            token() {
                this.getInfo()
            }
        },
        methods: {
            login() {
                this.$https({
                    url: '/api/login/user',
                    method: 'post',
                    crossDomain: false,
                    params: { loginName: 'admin', pswd: '111111' }
                }).then(res => {
                    console.log(res, res.status === 200)
                    if (res.status === 200) this.token = res.data.userId
                })
            },
            getInfo() {
                const { token } = this
                this.$https({
                    url: '/login/userInfo',
                    method: 'get',
                    params: { token }
                }).then(res => {
                    console.log(res)
                })
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
