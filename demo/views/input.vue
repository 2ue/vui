<template>
    <div>
        <p class="vui-page-title">默认</p>
        <v-input v-model="defaultVal"></v-input>

        <p class="vui-page-title">测试width属性：支持数字，百分百和各种单位</p>
        <v-input width="300px" value="width:300px"></v-input>
        <br>
        <v-input width="30%" value="width:30%"></v-input>
        <br>
        <v-input width="30em" value="width:30em"></v-input>
        <br>
        <v-input width="30rem" value="width:30rem"></v-input>

        <p class="vui-page-title">测试value和v-model：value不会双向绑定，v-model会</p>
        <v-input v-model="vModelVal"></v-input>
        <v-input v-model="vModelVal"></v-input>
        <br>
        <v-input :value="val"></v-input>
        <v-input :value="val"></v-input>

        <p class="vui-page-title">支持各种原生属性传递：disabled，readolny，class，style等，包括一些自定义属性</p>
        <v-input disabled value="设置disabled"></v-input>
        <br>
        <v-input readonly value="readonly"></v-input>
        <br>
        <v-input class="test-input-class" value="添加了class为test-input-class"></v-input>
        <br>
        <v-input style="color:#f30;" value="设置了字体颜色为#f30"></v-input>
        <br>
        <v-input data-id="233" width="80%" value="添加了一个自定义属性data-id值为233"></v-input>

        <p class="vui-page-title">事件绑定：支持focus，blur，change，input等事件，返回两个参数，第一个是event，第二个是当前的value值</p>
        <v-input disabled value="设置disabled会禁用所有事件" @focus="focusEvent" @blur="blurEvent" @input="changeEvent" @change="inputsEvent"></v-input>
        <br>
        <v-input readonly value="设置readonly禁用了输入写入，所以仅仅不会触发change和input事件" width="80%" @focus="focusEvent" @blur="blurEvent" @input="changeEvent"
            @change="inputsEvent"></v-input>
        <br>
        <v-input value="focusEvent" @focus="focusEvent"></v-input>
        <br>
        <v-input value="blurEvent" @blur="blurEvent"></v-input>
        <br>
        <v-input value="changeEvent" @input="changeEvent"></v-input>
        <br>
        <v-input value="changeEvent" @change="changeEvent"></v-input>
        <br>
    </div>
</template>

<script>
    export default {
        name: 'input',
        data() {
            return {
                defaultVal: '默认长这样',
                vModelVal: '测试v-model双向绑定',
                val: '测试value无法双向绑定'
            }
        },
        methods: {
            focusEvent(event, value) {
                console.log('获取失焦事件==>', value)
            },
            blurEvent(event, value) {
                console.log('失焦事件==>', value)
            },
            changeEvent(event, value) {
                console.log('change事件==>', value)
            },
            inputsEvent(event, value) {
                console.log('input事件==>', value)
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .box {
        display: inline-block;
        width: 100px;
        height: 50px;
        background: #795da3;

        img {
            width: 100%;
            height: 100%;
            background: #999;
        }
        .file {
            object-fit: fill;
        }
        .contain {
            object-fit: contain;
            object-position: 50% 50%;
        }
        .cover {
            object-fit: cover;
        }
        .none {
            object-fit: none;
        }
        .scale-down {
            object-fit: scale-down;
        }
    }
</style>
