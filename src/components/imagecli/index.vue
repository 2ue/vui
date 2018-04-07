<template>
    <div class="index">
        <input type="file" id="img" @change="getUrl('img')" ref="img">
        <div class="img-box">
            <img :src="url" ref="imgepre" @mousemove="mousemove">
            <div v-if="showModal" class="imge-cli" :style="styles" @click="click" @mouseout.self.stop="mouseout"></div>
        </div>
        <div class="img-relax-box" v-if="showModal">
            <img :src="url" :style="styles2">
        </div>
    </div>
</template>

<script>
    export default {
        name: "image-cli",
        data() {
            return {
                url: undefined,
                file: undefined,
                top: 0,
                left: 0,
                imgLeft: 0,
                imgTop: 0,
                lock: false,
                showModal: false
            }
        },
        computed: {
            styles() {
                return { top: this.top + 'px', left: this.left + 'px'}
            },
            styles2() {
                return { top: -this.imgTop * 6 + 'px', left: -this.imgLeft * 6 + 'px'}
            }
        },
        methods: {
            getUrl() {
                var url;
                const target = document.getElementById('img')
                if (navigator.userAgent.indexOf("MSIE")>=1) { // IE
                    url = target.value;
                } else if(navigator.userAgent.indexOf("Firefox")>0) { // Firefox
                    url = window.URL.createObjectURL(target.files.item(0));
                } else if(navigator.userAgent.indexOf("Chrome")>0) { // Chrome
                    url = window.URL.createObjectURL(target.files.item(0));
                }
                this.url = url;  //返回url
            },
            // handleFileChange (e) {
            //     let inputDOM = this.$refs.img;
            //     let self = this
            //     // 通过DOM取文件数据
            //     this.file = inputDOM.files[0];
            //     var reader = new FileReader();
            //     // 将图片将转成 base64 格式
            //     reader.readAsDataURL(this.file);
            //     // 读取成功后的回调
            //     reader.onloadend = function () {
            //         self.url = this.result;
            //         self.setHeight()
            //     }
            // },
            mousemove(e) {
                if(this.lock) return
                this.showModal = true
                // const left = e.offsetX + e.target.offsetLeft - 50, top = e.offsetY + e.target.offsetTop - 50
                // this.left = left < 0 ? 0 : left > 600 ? 550 : left
                // this.top = top < 0 ? 0 : top > 600 ? 550 : top

                const dis = 50, x = e.offsetX, y = e.offsetY, t = e.target, tLeft = t.offsetLeft, tTop = t.offsetTop, w = t.offsetWidth, h = t.offsetHeight

                this.imgLeft = x < dis ? 0 : x > w - dis ? w - dis : x
                this.imgTop = y < dis ? 0 : y > w - dis ? h - dis : y
                this.left = this.imgLeft + tLeft
                this.top = this.imgTop + tTop

                // const imgLeft = e.offsetX - 50, imgTop = e.offsetY - 50
                // this.imgLeft = imgLeft < 0 ? 0 : imgLeft > 600 ? 550 : imgLeft
                // this.imgTop = imgTop < 0 ? 0 : imgTop > 600 ? 550 : imgTop
                // this.left = this.imgLeft + e.target.offsetLeft
                // this.top = this.imgTop + e.target.offsetTop
            },
            mouseout() {
                if(!this.lock) this.showModal = false
            },
            click() {
                this.lock = !this.lock
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .img-box{
        position: relative;
        width: 600px;
        height: 600px;
        border: 1px solid #eee;
        display: table-cell;
        text-align: center;
        vertical-align: middle;
        img{
            width: auto;
            height: auto;
            max-width: 100%;
            max-height: 100%;
        }
        .imge-cli{
            position: absolute;
            top: 0;
            left: 0;
            width: 100px;
            height: 100px;
            background: rgba(0, 0, 0, 0.2);
            cursor: pointer;
        }
    }
    .img-relax-box{
        position: relative;
        display: inline-block;
        margin-left: 30px;
        width: 600px;
        height: 600px;
        overflow: hidden;
        img{
            position: absolute;
            top: 0;
            left: 0;
            width: 600%;
            height: auto;
        }
    }
</style>
