<template>
    <div :class="['button', type, {'disable': disable}, size]" @click.stop="onClick">{{text}}</div>
</template>
<script>
    export default {
      data() {
        return {
        }
      },
      props: {
          type: {
              type: String,
              default: 'primary'
          },
          text: {
              type: String,
              default: '确认'
          },
          disable: {
              type: Boolean,
              default: false
          },
          size: {
              type: String,
              default: 'small'
          }
      },
      methods: { 
          onClick(){
              this.$emit('click');
          }
      }
    }
</script>

<style lang="less" scoped>
    .button{
        height: 38px;
        font-size: 16px;
        border-radius: 19px;
        line-height: 38px;
        color: #ffffff;
        display: inline-block;
        transition: all 0.3s;
        &.primary {
            background-color: #fe6a8a;
            border: none;
            cursor: pointer;
            &.disable{
                cursor: no-drop;
                background-color: #f6f6f8;
                color: #ceced4;
                &:hover{
                    background-color: #f6f6f8;
                    color: #ceced4;
                }
                &:active{
                    background-color: #f6f6f8;
                    color: #ceced4;
                }
            }
            &.small{
                padding: 0 37px;
            }
            &.normal{
                padding: 0 48px;
            }
            &.large{
                padding: 0 107px;
            }
            &:hover{
                background-color: #ff446c;
            }
            &:active{
                background-color: #d53659;
            }
        }
        &.ghost {
            background-color: #ffffff;
            border: 1px solid #ff6989;
            height: 36px;
            cursor: pointer;
            color: #ff6989;
            &.disable{
                cursor: no-drop;
                background-color: #f6f6f8;
                color: #ceced4;
                border: 1px solid #c8c8cf;
                &:hover{
                    background-color: #f6f6f8;
                    color: #ceced4;
                    border: 1px solid #c8c8cf;
                }
                &:active{
                    background-color: #f6f6f8;
                    color: #ceced4;
                    border: 1px solid #c8c8cf;
                }
            }
            &.small{
                padding: 0 37px;
            }
            &.normal{
                padding: 0 48px;
            }
            &.large{
                padding: 0 107px;
            }
            &:hover{
                background-color: #ffc7d3;
                border: 1px solid #ff446c;
                color: #ff446c;
            }
            &:active{
                background-color: #fe6a8a;
                border: 1px solid #fe6a8a;
                color: #ffffff;
            }
        }
        
    }
</style>