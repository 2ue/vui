<template>
    <div class="i-input">
        <input :value="selfValue" 
        @input="changeInput($event.target.value)" 
        :readonly="disable"
        @focus="onfocus($event.target.value)"
        @blur="onblur($event.target.value)"
        :placeholder="placeholder"
        :type="type" 
        :class="{'error': error!='', 'disable': disable}"
        :style="{'width': `${width-2-(icon=='' ? 10 : 45)}px`, 'padding-left':(icon=='' ? '10px' : '45px')}"/>
        <span v-if="error!=''">{{error}}</span>
        <i :class="['iconfont', icon, {'error-i': error!=''}]"></i>
    </div>
</template>
<script>
    export default { 
      data() {
        return {
            selfValue: '',
        }
      },
      watch:{
          value(value){
              this.selfValue = value;
          }
      },
      props:{
          placeholder:{
              type: String,
              default: ''
          },
          type:{
              type: String,
              default: 'text'
          },
          value: {
              type: [String, Number],
              default: ''
          },
          width: {
              type: Number,
              default: 150
          },
          icon:{
              type: String,
              default: ''
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
          onfocus(value) { 
              this.$emit('focus', value);
          },
          onblur(value) {
              this.$emit('blur', value); 
          }
      }
    }
</script>

<style lang="less" scoped>
    .i-input{
        display: inline-block;
        position: relative;
        input{
            height: 34px;
            outline: none;
            border: 1px solid #a3a5d6;
            background-color: #f9f4fb;
            box-sizing: content-box;
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
        i {
            position: absolute;
            top: 7px;
            left: 12px;
            display: inline-block;
            font-size: 17px;
            color: #a3a5d6;
            &.error-i{
                color: #ff533d;
            }
        }
    }
</style>