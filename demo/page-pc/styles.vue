<template>
    <div>
        <p class="vui-page-title">主题色彩</p>
        <div>
            <span class="color-warp" v-for="c in themeColor">
                <label class="color-value" :style="{background: c.value}">{{c.name}}</label>
                <label class="color-name">{{c.value}}</label>
            </span>
        </div>
        <p class="vui-page-title">边框色彩</p>
        <div>
            <span class="color-warp" v-for="c in borderColor">
                <label class="color-value" :style="{background: c.value}">{{c.name}}</label>
                <label class="color-name">{{c.value}}</label>
            </span>
        </div>
        <p class="vui-page-title">字体色彩</p>
        <div>
            <span class="color-warp" v-for="c in fontColor">
                <label class="color-value" :style="{background: c.value}">{{c.name}}</label>
                <label class="color-name">{{c.value}}</label>
            </span>
        </div>
        <p class="vui-page-title">辅助色色彩</p>
        <div>
            <span class="color-warp" v-for="c in extraColor">
                <label class="color-value" :style="{background: c.value}">{{c.name}}</label>
                <label class="color-name">{{c.value}}</label>
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'vModal',
        data() {
            return {
                themeColor: [
                    { value: '#565FBF', name: 'dark' },
                    { value: '#6772E5', name: 'main' },
                    { value: '#9CA3F6', name: 'light' }
                ],
                borderColor: [
                    { value: '#CCCCCC', name: 'dark' },
                    { value: '#E6E6E6', name: 'main' },
                    { value: '#F2F2F2', name: 'light' }
                ],
                fontColor: [
                    { value: '#333333', name: 'dark' },
                    { value: '#666666', name: 'main' },
                    { value: '#999999', name: 'light' },
                    { value: '#CCCCCC', name: 'little' },
                    { value: '#2d8cf0', name: 'link' }
                ],
                extraColor: [
                    { value: '#6772E5', name: 'custom' },
                    { value: '#17B265', name: 'success' },
                    { value: '#FF8800', name: 'warning' },
                    { value: '#FF3333', name: 'error' }
                ]
            }
        },
        methods: {
        }
    }

</script>

<style lang="scss">
    .color-warp {
        display: inline-block;
        width: 120px;
        margin-right: 30px;
        text-align: center;
    }

    .color-value {
        display: inline-block;
        width: 100%;
        height: 50px;
        line-height: 50px;
        border-radius: 5px;
        margin-bottom: 5px;
        color: #fff;
    }
</style>
