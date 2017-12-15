<template>
    <div class="vui-upload-warp" :class="classes">
        <input type="file" ref="upload" :multiple="multiple" :name="name" :id="id" :disabled="disabled" :accept="accept" @change="onChange">
        <v-button :width="width" type="primary" @click="onClick" :disabled="disabled">{{text}}</v-button>
        <div v-if="fileList.length > 0" class="vui-upload-files-box">
            <span v-for="(file,i) in fileList" class="vui-upload-files">
                <v-icon :type="file.isImg ? 'img' : 'file'" size="small"></v-icon>
                {{file.name}}
                <v-icon class="vui-upload-remove-file" type="close" size="small" @click="removeUplaodFile(i)"></v-icon>
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'vUpload',
        data() {
            return {
                srcArr: [],
                fileList: []
            }
        },
        computed: {
            //按单位解析size统一为kb的数字
            selfSize() {
                const size = this.size;
                if (!size) return undefined;
                const matchVal = size.toString().match(/^([\d]+)(M|m|MB|mb|K|k|KB|kb)*$/);
                if (!matchVal) {
                    return undefined;
                } else {
                    return matchVal[1] * (!matchVal[2] || ['m', 'M', 'mb', 'MB'].indexOf(matchVal[2]) >= 0 ? 1024 : ['k', 'K', 'kb', 'KB'].indexOf(matchVal[2]) >= 0 ? 1 : 0);
                }

            },
            classes() {
                return this.disabled ? 'vui-upload-disabled' : undefined;
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
                let sizeFiles = this.checkSize(files), typeFiles = this.checkType(files);
                if (sizeFiles.length > 0) {
                    this.$alert('文件格式大小超出了限制，最大支持: ' + this.size);
                    return false;
                }
                if (typeFiles.length > 0) {
                    this.$alert('文件格式不支持，仅支持: ' + this.format.join(','));
                    return false;
                };
                this.fileList = this.getFIlesInfo(files);
                //图片预览
                this.srcArr = this.getImgURL(files);
                this.uploadFiles([...this.fileList]);
                e.target.value = null;
            },
            uploadFiles(files) {
                this.$emit('uploadFiles', files);
            },
            //返回超出大小限制的文件
            checkSize(files) {
                if (!this.selfSize) return [];
                return [...files].filter((file) => {
                    return this.selfSize < file.size;
                })
            },
            //返回格式限制之外的文件
            checkType(files) {
                if (this.format.length === 0) return [];
                return [...files].filter((file) => {
                    return this.format.indexOf(file.name.split('.')[1]) === -1;
                })
            },
            //解析文件列表预览
            getFIlesInfo(files) {
                return [...files].map(file => {
                    return { name: file.name, isImg: /^image\/([a-zA-Z\d])*$/.test(file.type) };
                })
            },
            //解析图片地址
            getImgURL(files) {
                return [...files].map((file) => {
                    return window.URL.createObjectURL(file);
                })
            },
            //移除某个上传文件
            removeUplaodFile(i) {
                this.fileList.splice(i, 1);
            }
        }
    }

</script>

<style scoped>
    img {
        outline: 1px solid #eee;
    }
</style>
