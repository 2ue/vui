<template>
    <transition name="loading-fade">
        <div class="loading" v-if="isShow">
            <img class="loading-gif" src="../../assets/img/loading.gif"/>
        </div>
    </transition>
</template>
<script>
// <div class="spinner">
//                 <div class="rect1"></div>
//                 <div class="rect2"></div>
//                 <div class="rect3"></div>
//                 <div class="rect4"></div>
//                 <div class="rect5"></div>
//             </div>
    export default {
      data() {
        return {
            isShow: false
        }
      },
      methods:{
          show(){
              this.isShow = true;
          },
          hide(){
              this.isShow = false;
          }
      }
    }
</script>
<style>
    .loading-fade-enter-active, .loading-fade-leave-active {
        transition: opacity .5s
    }
    .loading-fade-enter, .loading-fade-leave-to {
        opacity: 0
    }
    .spinner {
        top: 100px;
        margin: 100px auto;
        width: 100%;
        height: 60px;
        text-align: center;
        font-size: 10px;
    }
    
    .spinner > div {
        background-color: #775cb2;
        height: 100%;
        width: 6px;
        display: inline-block;
        
        -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
        animation: stretchdelay 1.2s infinite ease-in-out;
    }
    
    .spinner .rect2 {
        -webkit-animation-delay: -1.1s;
        animation-delay: -1.1s;
    }
    
    .spinner .rect3 {
        -webkit-animation-delay: -1.0s;
        animation-delay: -1.0s;
    }
    
    .spinner .rect4 {
        -webkit-animation-delay: -0.9s;
        animation-delay: -0.9s;
    }
    
    .spinner .rect5 {
        -webkit-animation-delay: -0.8s;
        animation-delay: -0.8s;
    }
    
    @-webkit-keyframes stretchdelay {
        0%, 40%, 100% { -webkit-transform: scaleY(0.4) } 
        20% { -webkit-transform: scaleY(1.0) }
    }
    
    @keyframes stretchdelay {
        0%, 40%, 100% {
            transform: scaleY(0.4);
            -webkit-transform: scaleY(0.4);
        }  20% {
            transform: scaleY(1.0);
            -webkit-transform: scaleY(1.0);
        }
    }
</style>

<style lang="less" scoped>
    .loading{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding-top:10%; 
        background-color: rgba(0,0,0, 0.3);
        .loading-gif{
            display: block;
            margin: 0 auto;
        }
    }
</style>