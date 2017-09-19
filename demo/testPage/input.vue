<template>
    <div>
      <v-input></v-input><br/>
      <v-input width="300"></v-input><br/>
      <v-input disabled="true"></v-input><br/>
      <v-input readonly="true"></v-input><br/>
      <v-input v-model="uuuuuu"></v-input><br/>
      <v-input :value="uuuuuu"></v-input><br/>
      <v-input @on-change="onChange" :value="testchange"></v-input><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <div class="box">
            <img src="../assets/logo.png" alt="" class="file">
      </div>
      <div class="box">
            <img src="../assets/logo.png" alt="" class="contain">
      </div>
      <div class="box">
            <img src="../assets/logo.png" alt="" class="cover">
      </div>
      <div class="box">
            <img src="../assets/logo.png" alt="" class="none">
      </div>
      <div class="box">
            <img src="../assets/logo.png" alt="" class="scale-down">
      </div>
    </div>
</template>

<script>
    export default {
        name: 'vue',
        data () {
            return {
              uuuuuu: 9099009,
              testchange: 88888
            }
        },
        methods: {

          onChange: function (event) {
              console.log(this.testchange)
          }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .box{
        display: inline-block;
        width: 100px;
        height: 50px;
        background: #795da3;
        
        img{
            width: 100%;
            height: 100%;
            background: #999;
        }
        .file{
            object-fit: fill;
        }
        .contain{
            object-fit: contain;
            object-position: 50% 50%;
        }
        .cover{
            object-fit: cover;
        }
        .none{
            object-fit: none;
        }
        .scale-down{
            object-fit: scale-down;
        }
    }
</style>
