<template>
    <div class="menu">
        <div>
            <div>
                <router-link to="/home"><div class="logo"></div></router-link>
            </div>
            <div>
                <span>OneNET Portal监控系统</span>
            </div>
        </div>
        <div>
            <ul class="menu-base-ul">
                <li v-for="(item, index) in menus" :key="index" :class="['menu-base-li',{'active': (item.nodes ? formatMenuActive==item.key : href.indexOf(`/${item.key}`)>=0)}]" @click="(item.nodes ? changeMenu(item.key) : goHref(`/${item.key}`, true, item.key))">
                    <i class="iconfont icon-logo"></i>{{item.title}}
                    <i class="iconfont icon-left" v-if="!item.nodes && href.indexOf(`/${item.key}`)>=0"></i>
                    <div class="block-line"></div>
                    <transition :name="item.transition" v-if="item.nodes">
                        <ul class="menu-body-ul" v-show="formatMenuActive==item.key">
                            <li v-for="(item2, index2) in item.nodes" :key="index2" :class="['menu-body-li',{'active': href.indexOf(item2.href)>=0}]" @click="goHref(item2.href)">{{item2.title}}<i class="iconfont icon-left" v-if="href.indexOf(item2.href)>=0"></i></li>
                        </ul>
                    </transition>
                </li>
                
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
      data() {
        return {
            url:'/home',
            href:'/',
            menuActive: '',
            adminRole: [{
                title: '系统设置',
                key: 'system',
                transition: 'bounce2',
                nodes: [
                    { title: '用户管理', href: '/systemUser' },
                    { title: '报警设置', href: '/systemCallWarn' }
                ]
            }],
            menus: [
                {
                    title: '浏览器监控',
                    key: 'browser',
                    transition: 'bounce1',
                    nodes: [
                        { title: 'JS错误', href: '/browserJsError' },
                        { title: 'ajax接口异常', href: '/browserAjaxError' },
                        { title: '慢页面', href: '/browserSlowPage' },
                        { title: '慢资源', href: '/browserSlowResource' },
                        { title: '自定义异常', href: '/browserCustomError' }
                    ]
                },
                {
                    title: '后台监控',
                    key: 'monitor',
                    transition: 'bounce2',
                    nodes: [
                        { title: '机器监控', href: '/monitorMachine' },
                        { title: '页面响应异常', href: '/monitorPage' }
                    ]
                },
                {
                    title: '日志查询',
                    key: 'logQuery'
                }
            ]
        }
      },
      watch: {
          '$route': function() {
              this.href = this.$route.path;
              this.menuActive = this.$route.name;
          }
      },
      computed: {
          formatMenuActive() {
               return this.menuActive.split("_")[0];
          }
      },
      mounted(){
          const href = this.$route.path;
          this.href = href;
          this.menuActive = this.$route.name;
          this.$ajaxFetch.get('/personal', {}, res => {
              if (res.code == 0) {
                  if (res.data.role_id == 1) {
                      this.menus.push(...this.adminRole);
                  }
              }
          }, error => {
              this.$tips.error(error);
          })
      },
      methods: {
        //   isAdminOk(path) {
        //       const href = this.$route.path;
        //       let isOk = true;
        //       this.adminRole.forEach(item => {
        //           if (item.nodes) {
        //               item.nodes.forEach(item2 => {
        //                   if (item2.href == href) {
        //                       isOk = false;
        //                       return;
        //                   }
        //               })
        //               if (!isOk) {
        //                   return;
        //               }
        //           } else { 
        //               if (`/${item.key}` == href) {
        //                   isOk = false;
        //                   return;
        //               }
        //           }
        //       });
        //       if (!isOk) {
        //           this.$tips.warning('没有权限访问该页面');
        //           this.$route.push('/');
        //       }
        //   },
        //   computedIsActive(active){
        //       return this.href.indexOf(active)>=0;
        //   },
          goHref(href, isMenu=false, type=''){
            //   this.href=href;
              this.$router.push(href);
            //   if(isMenu){
            //       this.menuActive = type;
            //   }
          },
          changeMenu(type){
              this.menuActive = type;
          }
      }
    }
</script>
<style>
    .bounce1-enter-to,.bounce1-leave{
        height: 206px;
    }
    .bounce2-enter-to,.bounce2-leave{
        height: 79px;
    }
    .bounce1-enter-active, .bounce1-leave-active,
    .bounce2-enter-active, .bounce2-leave-active {
        transition: height 0.7s
    }
    .bounce1-enter, .bounce1-leave-to,
    .bounce2-enter, .bounce2-leave-to{
        height: 0px;
    }
</style>

<style lang="less" scoped>
    .menu{
        a{
            text-decoration: none;
        }
        position: absolute;
        height: 100%;
        background-color: #775cb2;
        width: 176px;
        top: 0px;
        left: 0px;
        span{
            display: block;
            color: #ffffff;
            font-size: 13px;
            margin-top: 15px;
            text-align: center;
        }
        .logo{
            background-image: url('../assets/img/logo.png');
            background-repeat: no-repeat;
            height: 56px;
            width: 56px;
            margin-left: 60px;
            margin-top: 28px;
            border-radius: 50%;
            cursor: pointer;
        }
        .menu-base-ul{
            padding: 0px;
            position: relative;
            margin-top: 100px;
            padding-left: 19px;
            .menu-base-li{
                list-style: none;
                color: #bbaed8;
                cursor: pointer;
                font-size: 14px;
                margin-top: 9px;
                transition: all 0.3s;
                .block-line{
                    height: 10px;
                }
                .menu-body-ul{
                    padding: 0px;
                    margin-left: -19px;
                    background-color: #564594;
                    padding-top: 1px;
                    overflow: hidden;
                    .menu-body-li{
                        list-style: none;
                        padding: 10px 0px 10px 53px;
                        color: #8374b7;
                        font-size: 14px;
                        transition: all 0.3s;
                        &:hover,&.active{
                            background-color: #453484;
                            color: white;
                        }
                        &.active .icon-left {
                            float: right;
                            margin: -4px 17px 0 0;
                            color: #ec738b;
                        }
                    }
                }
                &:hover,&.active{
                    color: #e2deef;
                }
                &.active .icon-left {
                    float: right;
                    margin: 0 17px 0 0;
                    color: #ec738b;
                }
                i{
                    vertical-align: middle;
                    font-size: 20px;
                    margin-right: 15px;

                }
            }
        }
    }
</style>