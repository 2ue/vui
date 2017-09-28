<template>
    <div :class="['i-search',{'disable': disable}]" @click="onClick">
        <i class="iconfont icon-search"></i>
    </div>
</template>
<script>
    export default { 
      data() {
        return {
        }
      },
      props:{
          disable:{
              type: Boolean,
              default: false
          }
      },
      mounted(){
      },
      methods: { 
          onClick(){
              !this.disable && this.$emit('click');
          },
      }
    }
</script>

<style lang="less" scoped>
    .i-search{
        display: inline-block;
        width: 38px;
        height: 38px;
        text-align: center;
        line-height: 38px;
        font-size: 19px;
        color: #ffffff;
        background-color: #7c5ab7;
        border: none;
        border-radius: 50%;
        transition: all 0.3s;
        cursor: pointer;
        &:hover{
            background-color: #9059c0;
        }
        &:active{
            background-color: #5d59a9;
        }
        &.disable{
            background-color: #e2deef;
            cursor: no-drop;
        }
        
    }
</style>