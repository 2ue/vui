<template>
    <div>
        <v-input></v-input>
        <br/>
        <v-input width="300"></v-input>
        <br/>
        <v-input disabled="true" width="30%"> </v-input>
        <br/>
        <v-input readonly="true"></v-input>
        <br/>
        <v-input v-model="val1" @input="changeVal1"></v-input>
        <br/>
        <v-input v-model="val1" @focus="changeVal1"></v-input>
        <br/>
        <v-input v-model="val2" @change="changeVal2"></v-input>
        <div>{{val2}}</div>
    </div>
</template>

<script>
    export default {
        name: 'input',
        data() {
            return {
                val1: 9099009,
                val2: 88888
            }
        },
        methods: {
            changeVal1(event) {
                console.log('val1==>', this.val1)
            },
            changeVal2(event) {
                console.log('val1==>', this.val2)
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
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
