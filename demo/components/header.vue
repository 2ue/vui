<template>
  <div class="vui-warper vui-box-shadow-2 vui-header">
    <div class="vui-warper-content vui-header-box">
      <span class="vui-logo"><img src="../assets/logo.png"></span>
      <span class="vui-intro">一个vue的简易框架</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.vui-header{
  background: #fff;
  padding: 20px 0;

  .vui-logo{
    display: inline-block;
    vertical-align: top;
    width: 50px;
    height: 50px;

    img{
      width:100%;
      height:auto;
    }
  }
  .vui-intro{
    margin-left:100px;
    font-size: 16px;
    vertical-align: bottom;
  }
}
</style>
