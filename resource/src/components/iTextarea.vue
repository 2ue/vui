<template>
    <div class="i-textarea">
        <textarea :value="selfValue" 
        @input="changeInput($event.target.value)" 
        :readonly="disable"
        :class="{'error': error!='', 'disable': disable}" 
        :style="{'width': `${width==0 ? '100%': width+'px'}`}">
        </textarea>
        <span v-if="error!=''">{{error}}</span>
    </div>
</template>
<script>
    export default { 
      data() {
        return {
            selfValue: ''
        }
      },
      props:{
          value: {
              type: String,
              default: ''
          },
          width: {
              type: Number,
              default: 0
          },
          error:{
              type: String,
              default: ''
          },
          disable:{
              type: Boolean,
              default: false
          }
      },
      mounted(){
          this.selfValue = this.value;
      },
      methods: { 
          changeInput(value){
              this.$emit('input', value);
          },
      }
    }
</script>

<style lang="less" scoped>
    .i-textarea{
        position: relative;
        width: 98%;
        textarea{
            height: 78px;
            padding: 5px;
            outline: none;
            border: 1px solid #a3a5d6;
            background-color: #f9f4fb;
            font-size: 14px;
            &:focus{
                border: 1px solid #5d59a9;
            }
            &.error{
                background-color: #ffe4e0;
                border: 1px solid #ff4c35;
                &.focus{
                    border: 1px solid #ff4c35;
                }
            }
            &.disable{
                background-color: #f6f6f8;
                border: 1px solid #c8c8cf;
                cursor: no-drop;
                &.focus{
                    border: 1px solid #c8c8cf;
                }
            }
        }
        span{
            position: absolute;
            top: 0px;
            left: 46px;
            margin-top: -14px;
            color: #ff5842;
            font-size: 12px;
        }
    }
</style>