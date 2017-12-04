<template>
    <div class="warper footer">
        <div class="warper-content footer-box">
            <p>作者：
                <a href="https://2ue.github.io/" target="_blank">@2ue</a>
            </p>
            <p>邮箱：jie746635835@163.com</p>
            <p>Github：
                <a href="https://github.com/2ue" target="_blank">https://github.com/2ue</a>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'vue',
        data() {
            return {}
        },
        methods: {}
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .footer {
        margin: 20px auto;
        padding: 20px 0;
        text-align: center;
        border-top: 1px solid #ccc;
        font-size: 14px;
        color: #999;
    }

    a {
        text-decoration: underline;
    }
</style>
