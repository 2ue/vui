<template>
    <transition name="modal-fade">
    <div class="i-modal" v-if="value" @click.self="onCancel('base')">
        <div :class="['modal-content',type]">
            <div class="show-header">
                <slot name="header">
                    <div class="show-close"><i class="iconfont icon-close" @click.stop="onCancel('close')"></i></div>
                </slot>
            </div>
            <div class="show-body">
                <slot></slot>
            </div>
            <div :class="['show-footer', {'right-margin': cancelText!=''}]">
                <slot name="footer">
                    <i-button type="primary" v-if="okText!=''" :text="okText" size="small" @click="onOk"></i-button>
                    <i-button type="ghost" v-if="cancelText!=''" :text="cancelText" size="small" @click="onCancel('cancel')"></i-button>
                </slot>
            </div>
        </div>
    </div>
    </transition>
</template>
<script>
    import iButton from 'components/iButton'
    export default { 
      data() {
        return {
            selfValue: '',
            showModal: false,
        }
      },
      components:{
          iButton
      },
      props:{
          type: {
              type: String,
              default: 'normal'
          },
          value: {
              type: Boolean,
              default: false
          },
          okText: {
              type: String,
              default: '确定'
          },
          cancelText:{
              type: String,
              default: '取消'
          },
          clickBase:{
              type: Boolean,
              default: false
          }
      },
      mounted(){
          this.showModal = this.value;
      },
      methods: {
          onOk(){
              this.$emit('ok-click');
          },
          onCancel(type){
              this.showModal = false;
              if(type=='base' && !this.clickBase){
                  return;
              }
              this.$emit('input', false);
              this.$emit('cancel-click', type);
          }
      }
    }
</script>
<style lang="less">
    .modal-fade-enter-active, .modal-fade-leave-active {
        transition: opacity .5s
    }
    .modal-fade-enter, .modal-fade-leave-to {
        opacity: 0;
    }
</style>

<style lang="less" scoped>
    .i-modal{
        position: fixed;
        z-index: 999;
        top: 0;
        left: 0;
        width: 100%;  
        height: 100%;
        // background-color: rgba(204, 153,204, 0.3);
        background-color: rgba(0,0,0, 0.3);
        .modal-content{
            background-color: #ffffff;
            margin: 10% auto;
            .show-header{
                text-align: right;
                padding: 10px;
                i{
                    font-size: 24px;
                    cursor: pointer;
                    color: #c8c8cf;
                    transition: all 0.3s;
                    &:hover{
                        color: #f30;
                    }
                    &:active{
                        color: #f30;
                    }
                }
            }
            .show-footer{
                padding: 10px;
                text-align: center;
                &.right-margin .button.primary{
                    margin-right: 30px;
                }
            }
            .show-body{
                padding: 10px;
            }
            &.normal{
                width: 547px;
            }
            &.small{
                width: 386px;
            }
        }
        
    }
</style>