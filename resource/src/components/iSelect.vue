<template>
    <div class="i-select">
        <div :class="['show-base',{'disable': disable}]" :style="{'width': `${width-14}px`}" @click="showOptionsList">
            <span>{{currentOption.label}}</span>
            <i class="iconfont icon-down"></i>
        </div>
        <div v-if="showOptions" class="no-click" :style="{'width': `${width}px`}"></div>
        <transition :name="bounce">
            <div ref="optionListUl" :class="['option-list',postionOption]" :style="{'width': `${width-2}px`, 'height': `${datas.length>=3 ? 90 : datas.length*30}px`}" v-show="showOptions">
                <ul >
                    <li v-for="(option, index) in datas" :key="index" @click="selectOption(option.value)" :class="{'select': currentValue === option.value}">
                        {{option.label}}
                        <i class="iconfont icon-checkbox" v-if="currentValue === option.value"></i>
                    </li>
                <ul>
            </div>
        </transition>
    </div>
</template>
<script>
    export default {
      data() {
        return {
            bounce: 'bounce',
            postionOption:'position1',
            showOptions: false,
            currentOption: {},
            currentValue: 0
        }
      },
      props: {
          pop: {
              type: String,
              default: ''
          },
          datas: {
              type: Array,
              default: []
          }, 
          value: { 
          },
          width: {
              type: Number,
              default: 150
          },
          disable:{
              type: Boolean,
              default: false
          }
      },
      mounted(){
          var _this = this;
          
          _this.currentOption = _this.datas.filter(item => item.value=== _this.value)[0] || {};
          _this.currentValue = _this.currentOption.value;
      },
      watch:{
          value(){
              var _this = this;
              _this.currentOption = _this.datas.filter(item => item.value=== _this.value)[0] || {};
              _this.currentValue = _this.currentOption.value;
          },
          showOptions(value){
              var _this = this;
              var bodyElement =document.getElementsByTagName('body')[0];
              if (value){
                  bodyElement.addEventListener('click',this.activeShowOptions,true);
              }else{
                  bodyElement.removeEventListener('click',this.activeShowOptions,true);
              }
          }
      },
      methods: {
          activeShowOptions(){
              var _this = this;
              _this.showOptions && (_this.showOptions=false);
          },
          showOptionsList(event){
              var _this = this;
              if (_this.pop == 'top') {
                  _this.bounce = 'bounce1';
                  _this.postionOption ='position2';
              } else if(_this.pop=='buttom') {
                  _this.bounce = 'bounce';
                  _this.postionOption ='position1';
              } else {
                  if(event.pageY>document.body.scrollHeight-150){
                      _this.bounce = 'bounce1';
                      _this.postionOption ='position2';
                  }
              }
              if(!_this.disable && _this.datas.length&&!_this.showOptions){
                  _this.showOptions=true;
                  if(_this.datas.length>3){
                      let currentIndex = 0;
                      _this.datas.forEach((item,index) =>{
                          if(item.value==_this.currentValue) currentIndex = index;
                      })
                      if(currentIndex>=3){
                          let scrollTop = 0;
                          if(_this.datas.length>=currentIndex+2){
                              screenTop = (currentIndex-1)*30;
                          }else{
                              screenTop = (currentIndex-2)*30;
                          }
                          _this.$nextTick(function(){
                              document.getElementsByClassName('option-list')[0].scrollTop=screenTop;
                          });
                      }
                  }
              }
          },
          selectOption(value){
              var _this = this;
              _this.currentOption = _this.datas.filter(item => item.value=== value)[0];
              _this.currentValue = _this.currentOption.value;
              _this.showOptions = false;
              _this.$emit('input',value);
          }
      }
    }
</script>
<style>
    .bounce-enter,.bounce-leave-to{
        top: 37px !important;
        opacity: 0;
    }
    .bounce-enter-to,.bounce-leave{
        top:45px;
        opacity: 1;
    }
    .bounce-enter-active, .bounce-leave-active {
        transition: all .5s
    }
    .bounce1-enter,.bounce1-leave-to{
        top: -90px !important;
        opacity: 0;
    }
    .bounce1-enter-to,.bounce1-leave{
        top:-100px !important;
        opacity: 1;
    }
    .bounce1-enter-active, .bounce1-leave-active {
        transition: all .5s
    }
</style>

<style lang="less" scoped>
    .i-select{
        position: relative;
        display: inline-block;
        .no-click{
            height: 38px;
            position: absolute;
            top: 0;
            left: 0;
            cursor: pointer;
        }
        .option-list{
            position: absolute;
            z-index: 99;
            text-align: left;
            border: 1px solid #c8c8ce;
            height: 90px;
            overflow: auto;
            background-color: #ffffff;
            font-size: 14px;
            &.position1{
                top: 45px;
            }
            &.position2{
                top: -100px;
            }
            ul{
                padding: 0px;
                margin: 0px;
                li{
                    list-style: none;
                    height: 30px;
                    padding-left: 14px;;
                    line-height: 30px;
                    cursor: pointer;
                    transition: all 0.3s;
                    &.select{
                        color: #5c5aa4;
                    }
                    i{
                        float: right;
                        margin-right: 9px;
                    }
                    &:hover{
                        color: #ffffff;
                        background-color: #5d59a9;
                    }
                }
            }
        }
        .show-base{
            border: 1px solid #c8c8ce;
            color: #333333;
            text-align: left;
            height: 36px;
            position: relative;
            padding-left:12px;
            line-height: 36px; 
            background-color: #ffffff;
            font-size: 14px;
            cursor: pointer;
            &.disable{
                border: 1px solid #c8c8cf;
                background-color: #f6f6f8;
                color: #c8c8cf;
                cursor: no-drop;
                i{
                    color: #c8c8cf;
                }
            }
            i{
                position: absolute;
                right:9px;
                color: #5c5aa4;
                font-size: 20px;
            }
        }
    }
</style>