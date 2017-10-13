<template>
    <div class="show-tip-base">
        <transition-group name="tip-animate">
            <div v-for="(item, index) in datas" class="tip-base" :style="{'left': leftpx}" :key="index">
                <div :class="['tips', item.type]">
                    <i :class="['show-icon','iconfont',icons[item.type]]"></i>{{item.msg}}
                </div>
            </div>
        </transition-group>
    </div>
</template>
<script>
    export default {
      data() {
        return {
            datas: [],
            leftpx: '50%',
            tipLength: 0,
            intervals: [],
            icons:{'success': 'icon-succes-1', 'error': 'icon-error-msg', 'warning':'icon-warn'}
        }
      },
      methods:{
          addMsg(msg, time, type, callback){
              var _this = this;
              this.tipLength = this.tipLength+1;
              const thisTipLength = this.tipLength
              _this.datas.push({msg: msg, time: time, type: type, tipLength: thisTipLength});
              setTimeout(function(){
                  var thisIndex = -1;
                  _this.datas.forEach(function(item, index){
                      if(item.tipLength == thisTipLength ){
                          thisIndex = index;
                          return;
                      }
                  })
                  if(thisIndex>=0){
                      _this.datas.splice(thisIndex, 1);
                      callback();
                  }
              }, time);
          }
      }
    }
</script>
<style>
    .tip-animate-enter{
        top: 60px !important;
        opacity: 0;
    }
    .tip-animate-enter-active{
        transition: all 0.4s;
    }
    .tip-animate-leave-active{
        transition: all 0.4s;
    }
    .tip-animate-enter-to, .tip-animate-leave{
        top: 40px !important;
        opacity: 1;
    }
    .tip-animate-leave-to{
        top: 20px !important;
        opacity: 0;
    }
</style>

<style lang="less" scoped>
    .show-tip-base{
        position: fixed;
        top: 0px;
        width: 100%;
        z-index: 9999;
        .tip-base{
            position: absolute;
            left: 50%;
            top: 40px;
            .tips{
                position: relative;
                right: 50%;
                height: 34px;
                line-height: 34px;
                padding: 0 15px;
                border-radius: 5px;
                background-color: #ffffff;
                box-shadow: 0 1px 6px rgba(0,0,0,.2);
                font-size: 12px;
                .show-icon{
                    vertical-align: middle;
                    margin-right: 5px;
                    display: inline-block;
                }
                &.success{
                    .show-icon{
                        margin-top: -2px;
                        font-size: 38px;
                        color: #19be6b;
                    }
                }
                &.error{
                    .show-icon{
                        margin-top: -2px;
                        font-size: 38px;
                        color: red;
                    }
                }
                &.warning{
                    .show-icon{
                        font-size: 22px;
                        color: #ff9900;
                        margin-top: -5px;
                    }
                }
            }
        }
    }

</style>
