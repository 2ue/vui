<template>
    <div class="warper box-shadow-less header">
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
<style scoped lang="scss">
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

    .box-shadow-less {
        box-shadow: -1px -1px 1px 3px rgba(102, 101, 101, 0.25);
    }
</style>
