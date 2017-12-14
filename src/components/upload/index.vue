<template>
    <div class="vui-upload-warp">
        <input type="file" ref="upload" :multiple="multiple" :name="name" :id="id" :disabled="disabled" :accept="accept" @change="onChange">
        <v-button :width="width" type="primary" @click="onClick" :disabled="disabled">{{text}}</v-button>
        <div v-if="srcArr.length > 0">
            <img v-for="imgsrc in srcArr" :src="imgsrc" alt="" :width="width" height="auto">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'vUpload',
        data() {
            return {
                srcArr: []
            }
        },
        computed: {
            //按单位解析size统一为kb的数字
            selfSize() {
                const size = this.size;
                if (!size) return undefined;
                const matchVal = size.toString().match(/^([\d]+)(M|m|K|k|KB|kb)*$/);
                if (!matchVal) {
                    return undefined;
                } else {
                    return matchVal[1] * (!matchVal[2] || ['m', 'M'].indexOf(matchVal[2]) >= 0 ? 1024 : ['k', 'K', 'kb', 'KB'].indexOf(matchVal[2]) >= 0 ? 1 : 0);
                }

            }
        },
        props: {
            width: {
                type: [String, Number]
            },
            text: {
                type: String,
                default: '选择文件'
            },
            multiple: {
                default: undefined
            },
            disabled: {
                default: undefined
            },
            name: {
                default: undefined
            },
            id: {
                default: undefined
            },
            accept: {
                default: undefined
            },
            format: {
                type: Array,
                default: () => []
            },
            size: {
                type: [Number, String],
                default: undefined
            }
        },
        methods: {
            onClick() {
                this.$refs.upload.click();
            },
            onChange(e) {
                const files = e.target.files;
                if (!files) return;
                this.srcArr = this.getImgURL(files);
                this.uploadFiles(files);
                e.target.value = null;
            },
            uploadFiles(files) {
                // console.log('files==>', files);
            },
            //获取图片地址
            getImgURL(files) {
                return [...files].map((file) => {
                    return window.URL.createObjectURL(file);
                })
            },
            //返回超出大小限制的文件
            checkSize(files) {
                return [...files].filter((file) => {
                    console.log(file.size, this.selfSize)
                    return !!this.selfSize && this.selfSize < file.size;
                })
            },
            //返回格式限制之外的文件
            checkType(files) {
                return [...files].filter((file) => {
                    console.log("file.name.split('.')[1]==>", this.format.indexOf(file.name.split('.')[1]))
                    return this.format.indexOf(file.name.split('.')[1]) === -1;
                })
            }
        }
    }

</script>

<style scoped>
    img {
        outline: 1px solid #eee;
    }
</style>
