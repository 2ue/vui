<template>
    <div>
        <p class="vui-page-title">测试type：默认ghost，接受ghost,primary,dashed三个字符串</p>
        <v-button type="ghost"></v-button>
        <v-button type="primary"></v-button>
        <v-button type="dashed"></v-button>

        <p class="vui-page-title">测试size：默认small，接受small,middle,larger和带正确单位的字符串，如果纯数字则以px为单位</p>
        <v-button size="small">default</v-button>
        <v-button size="small">small button</v-button>
        <v-button size="middle">middle button</v-button>
        <v-button size="larger">larger button</v-button>

        <p class="vui-page-title">测试width属性：支持数字，百分百和各种单位</p>
        <v-button width="300px">width:300px</v-button>
        <br>
        <v-button width="30%">width:30%</v-button>
        <br>
        <v-button width="30em">width:30em</v-button>
        <br>
        <v-button width="30rem">width:30rem</v-button>

        <p class="vui-page-title">支持各种原生属性传递：disabled，class，style等，包括一些自定义属性</p>
        <v-button disabled>disabled</v-button>
        <v-button class="test-buuton-class">test-buuton-class</v-button>
        <v-button style="color:#f30;">字体#f30</v-button>
        <v-button data-tips="添加了一个自定义属性data-tips属性">自定义属性data-tips</v-button>

        <p class="vui-page-title">事件绑定：点击事件</p>
        <v-button @click="clickEvent"></v-button>
        <v-button disabled @click="clickEvent">disabled禁用点击事件</v-button>
    </div>
</template>

<script>
    export default {
        name: 'button',
        data() {
            return {}
        },
        methods: {
            clickEvent: function (event) {
                console.log('被点击了');
                this.$loading.show('Loading 两秒后关闭！');
                this.$loading.show({
                    text: 'Loading 两秒后关闭333！'
                });
                // this.$router.push('/input')
                // this.$loading.close(2000);
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
