<template>
    <div class="header">
        <router-link to="/personal"><i title="个人中心" class="iconfont icon-person-center"></i></router-link>
        <a @click="logout"><i title="登出" class="iconfont icon-login-out"></i></a>
    </div>
</template>
<script>
    export default {
      data() {
        return { 
            url:'/home'
        }
      },
      methods: { 
          logout(){
              //登出操作
              this.$ajaxFetch.post('/logout',{},res=>{
                  this.$tips.success(res.msg, ()=>{
                      window.location.href="/login";
                  });
              },error=>{
                  this.$tips.error(error);
              })
              
          }
      }
    }
</script>

<style lang="less" scoped>
    .header{
        height: 64px;
        line-height: 64px;
        padding-left: 176px;
        background-color: #ffffff;
        text-align: right;
        a{
            color: #6d6d6d;
            cursor: pointer;
            margin-right: 32px;
            text-decoration: none;
            transition: all 0.3s;
            &:hover, &:active{
                color: #fe89a3;
            }
            i{
                font-size: 19px;
            }
        }
    }
</style>