<template>
    <div class="loadding-box" v-if="showLoading" @click="close">
        <div class="loadding-inner" @click="stopPropagation">
            <span>loadding{{loadding}}</span>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'loadding',
        data(){
            return{
                loadding:'',
                showLoading: false,
                animation: ''
            }
        },
        watch: {
            showLoading: function(val){
                this.setStyle(val);
                if(val) {
                    this.makeAnimation()
                }else{
                    clearInterval(this.animation);
                }
            }
        },
        methods: {
            stopPropagation: function(event){
                event.stopPropagation();
            },
            //给body设置样式是页面不滚动
            setStyle: function(hidden){
                document.getElementsByTagName('body')[0].style.overflow = hidden ? 'hidden' : 'auto';
            },
            //loadding动画
            makeAnimation: function(t){
                const _this = this;
                _this.animation = setInterval(function(){
                    if(!!_this.loadding && _this.loadding.split('').length === 6) _this.loadding = '';
                    _this.loadding += '.';
                }, t || 300)
            },
            show: function(){
                this.showLoading = true;
            },
            close: function(){
                this.showLoading = false;
            }
        }
    }

</script>

<style>
    .loadding-box{
        z-index: 999999;
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(51, 51, 51, 0.4);
    }
    .loadding-inner{
        position: relative;
        width:300px;
        height: 100px;
        background: #fff;
        top: 50%;
        margin: -50px auto;
    }
    .loadding-box span{
        color: #333;
    }
</style>