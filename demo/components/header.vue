<template>
    <div class="warper box-shadow-2 header">
        <div class="warper-content header-box">
            <span class="logo">
                <img src="../assets/logo.png">
            </span>
            <span class="intro">以学习vue为目的而写的一个UI框架</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'hello',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang=less scoped>
    .header {
        background: #fff;
        padding: 20px 0;

        .logo {
            display: inline-block;
            vertical-align: top;
            width: 50px;
            height: 50px;
            margin: 0 0 0 30px;

            img {
                width: 100%;
                height: auto;
            }
        }
        .intro {
            margin-left: 100px;
            font-size: 16px;
            vertical-align: bottom;
        }
    }
</style>
