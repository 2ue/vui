<template>
    <div class="vui-upload-warp">
        <input type="file">
        <v-button :width="seflWidth">选择文件</v-button>
    </div>
</template>

<script>
    export default {
        name: 'vUpload',
        data() {
            return {
            }
        },
        computed: {
            seflWidth: function () {
                let width = this.width;
                if (this.$util.isNumber(width)) width = width + 'px';
                return width;
            },
        },
        props: {
            width: {
                type: [String, Number]
            },
        },
        methods: {
        }
    }

</script>

<style scoped>
</style>
