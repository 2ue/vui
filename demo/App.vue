<template>
  <div id="app">
    <v-header></v-header>
    <div class="vui-warper-content vui-content">
      <v-button size="small"></v-button>
      <v-button size="middle"disabled="true"></v-button>
      <v-button size="larger"></v-button>
      <br/>
      <v-button size="small" disabled="true"></v-button>
      <v-button size="middle" disabled="true"></v-button>
      <v-button size="larger" :disabled="false"></v-button>
      <br/>
      <v-button size="small" type="ghost"></v-button>
      <v-button size="middle" type="primary"></v-button>
      <v-button size="larger" type="dashed" disabled="true"></v-button>
      <br/>
      <v-button size="middle" text="middle" disabled="true"></v-button>
      <v-button size="larger" text="larger"></v-button>
      <v-button width="100" text="small 100" @click="getInfo"></v-button>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import VHeader from './components/header'
  import VFooter from './components/footer'

  export default {
    name: 'app',
    data(){
      return{
      }
    },
    components: {
      VHeader,
      VFooter
    },
    methods: {
      getInfo: function (event) {
          console.log('event==>',event)
        this.$alert('加载失败！');
        // this.$loading.show();
        // this.$loading.show({ html: '<p>{{ loadingText }}</p><span></span><span></span><span></span><span></span><span></span><span></span><hello></hello>' });
        // this.$https.get('https://api.github.com/users/2ue/repos?sort=created&per_page=100').then(function (res) {
        //     console.log('res==>', res);
        // });
        // this.$https({
        //     method: 'get',
        //     url: 'https://api.github.com/users/2ue/repos',
        //     loading: true,
        //     data: {
        //         sort: 'created',
        //         per_page: 100,
        //         loading: true
        //     }
        // });
      }
    }
  }

</script>

<style lang="less">
  body{
    font: 12/1.5 "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    color: #333;
  }

  .vui-warper{
    width: 100%;
    min-width: 1200px;
  }
  .vui-warper-content{
    width: 1200px;
    margin: 0 auto;
  }
  .vui-content{
    margin: 100px auto;
  }
</style>
