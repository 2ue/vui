<template>
  <div class="loading-box" v-if="showLoading" @click="close">
    <div class="loading-inner vui-dis-selected">
      <div @click="stopPropagation" v-if="!loadingHtml">
        <p>{{ loadingText }}</p>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div @click="stopPropagation" v-else v-html="loadingHtml"></div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'loading',
    data(){
      return{
        loading:'',
        loadingText: 'Loading',
        loadingHtml: '',
        options: {

        },
        showLoading: false,
        animation: ''
      }
    },
    watch: {
      showLoading: function(val){
        this.setStyle(val);
        // if(val) {
        //   this.makeAnimation()
        // }else{
        //   clearInterval(this.animation);
        // }
      }
    },
    methods: {
      stopPropagation: function(event){
        event.stopPropagation();
      },
      setStyle: function(hidden){
        //let page don't scrolling
        document.getElementsByTagName('body')[0].style.overflow = hidden ? 'hidden' : 'auto';
      },
      //loading anmations
    //   makeAnimation: function(t){
    //     const _this = this;
    //     _this.animation = setInterval(function(){
    //       if(!!_this.loading && _this.loading.split('').length === 6) _this.loading = '';
    //       _this.loading += '.';
    //     }, t || 300)
    //   },
      show: function(options){
        if(!!options) {
          const _html = options.html, _text = options.text;
          if(_html) {
            this.loadingHtml = _html;
          }else {
            if(_text) this.loadingText = !_text ?  this.loadingText : _text;
          }
        };
        this.showLoading = true;
      },
      close: function(){
        this.showLoading = false;
      }
    }
  }

</script>

<style lang="less">
  .loading-box{
    z-index: 999999;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.9);
  }

  .loading-inner {

    position: relative;
    width:300px;
    height: 100px;
    top: 50%;
    margin: -50px auto;
    text-align: center;

    p {
        color: #fff;
        margin-bottom: 10px;
    }
    span {
      display: inline-block;
      vertical-align: middle;
      width: 10px;
      height: 10px;
      margin: 3px;
      background: #007DB6;
      border-radius: 10px;
      animation: loading 1s infinite alternate;

      &:nth-of-type(2) {
        background: #008FB2;
        animation-delay: 0.2s;
      }
      &:nth-of-type(3) {
        background: #009B9E;
        animation-delay: 0.4s;
      }
      &:nth-of-type(4) {
        background: #00A77D;
        animation-delay: 0.6s;
      }
      &:nth-of-type(5) {
        background: #00B247;
        animation-delay: 0.8s;
      }
      &:nth-of-type(6) {
        background: #5AB027;
        animation-delay: 1.0s;
      }
      /*&:nth-of-type(7) {*/
      /*background: #A0B61E;*/
      /*animation-delay: 1.2s;*/
      /*}*/
    }

  }

  @keyframes loading {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>
