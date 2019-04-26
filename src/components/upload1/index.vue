<template>
    <div class="r-upload">
        <span class="r-upload-button-warp">
            <div class="r-upload-button">
                <slot><r-button type="light">选择文件</r-button></slot>
            </div>
            <input
                :id="selfRefName"
                :ref="selfRefName"
                class="r-upload-input"
                type="file"
                :multiple="multiple"
                @change="changeFile">
        </span>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                files: [],
                successFiles: [],
                failedFiles: [],
                uploadLen: 0
            }
        },
        props: {
            multiple: Boolean,
            accept: {
                type: [Array, String],
                default: () => ['image/jpg', 'image/jpeg', 'image/png']
            },
            params: Object,
            action: String,
            beforeUpload: Function,
            beforeChange: Function,
            refName: {
                type: String,
                default: `upload`
            },
            // 每次选择新文件之后的方式
            // clear会置空上一次的选择
            // push会在上次选择上追加，且只对multiple=true时有效
            changeType: {
                type: String,
                default: 'clear'
            },
            maxSize: {
                type: Number,
                default: 5
            },
            maxNumber: Number
        },
        watch: {
            uploadLen(len) {
                const { failedFiles, successFiles, files } = this
                if (len === files.length) this.uploadComplete(failedFiles.length === 0, successFiles, failedFiles)
            }
        },
        computed: {
            selfRefName() {
                return `${this.refName}-${new Date().getTime()}`
            }
        },
        created() {
            this.initStatus()
        },
        methods: {
            getPDFUrl(sourceId) {
                let url;
                if (navigator.userAgent.indexOf("MSIE")>=1) { // IE
                    url = document.getElementById(sourceId).value;
                } else if(navigator.userAgent.indexOf("Firefox")>0) { // Firefox
                    url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
                } else if(navigator.userAgent.indexOf("Chrome")>0) { // Chrome
                    url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
                } else {
                    url = document.getElementById(sourceId).value;
                }
                return url;  //返回url
            },
            initStatus() {
                console.info(this.changeType, 'event')
                const { changeType, multiple } = this
                if (!multiple || changeType === 'clear') this.files = []
                this.uploadLen = 0
                this.successFiles = []
                this.failedFiles = []
            },
            validateType(files) {
                let res = true
                const accept = this.accept
                const type = typeof accept === 'object' ? accept : this.accept.split(',')
                files.some(file => {
                    if (type.indexOf(file.type) === -1) {
                        res = false
                        return true
                    }
                })
                return res
            },
            validateSize(files) {
                let res = true
                files.some(file => {
                    if (this.maxSize * 1024 * 1024 < file.size) {
                        res = false
                        return true
                    }
                })
                return res
            },
            validateNumber(files) {
                return files.length > this.maxNumber
            },
            changeFile(event) {
                console.info(event, 'event')
                this.initStatus()
                const files = Array.prototype.slice.call(event.raw || event.target.files)
                let url = undefined
                if(files && files.length === 1 && files[0].type.indexOf('pdf') !== -1) {
                    url = this.getPDFUrl(this.selfRefName)
                }
                const { beforeChange } = this
                if (beforeChange && typeof beforeChange === 'function') {
                    if (beforeChange(files)) {
                        this.clearError()
                        return
                    }
                } else {
                    if (this.validateNumber(files)) {
                        this.$message({
                            type: 'error',
                            message: `超出最大限制个数：${this.maxNumber}`
                        })
                        this.clearError()
                        return
                    }
                    if (!this.validateType(files)) {
                        this.$message({
                            type: 'error',
                            message: `文件类型不匹配`
                        })
                        this.clearError()
                        return
                    }
                    if (!this.validateSize(files)) {
                        this.$message({
                            type: 'error',
                            message: `超出最大尺寸限制: ${this.maxSize}M`
                        })
                        this.clearError()
                        return
                    }
                }
                files.map(file => {
                    const reader = new FileReader()
                    reader.onload = (e) => {
                        let data = e.target.result
                        if (typeof data === 'object') data = window.URL.createObjectURL(new Blob([e.target.result]))
                        this.files.push(file)
                        // this.clearFile(true)
                        this.$emit('changeFile', { url: data, raw: file }, this.files, files, url)
                    }
                    reader.readAsDataURL(file)
                })
            },
            clearError() {
                const inputFile = document.getElementById(this.selfRefName)
                inputFile.value = ''
            },
            clearFile(action = true) {
                this.files = []
                // 清空上传框的值
                this.selfVal = undefined
                const inputFile = document.getElementById(this.selfRefName)
                inputFile.value = ''
                if (action) this.$emit('deleteFile', this.index)
            },
            deleteFile(index) {
                if (this.files && this.files.length > 1) {
                    this.files.splice(index, 1)
                } else {
                    this.clearFile()
                }
            },
            submit() {
                const { beforeUpload } = this
                if (beforeUpload && typeof beforeUpload === 'function' && beforeUpload()) return
                const files = this.files
                files.map((file, index) => {
                    const formData = new FormData()
                    formData.append('_t', new Date().getTime())  // 添加时间戳
                    formData.append('file', file)  //添加图片信息的参数
                    // 额外参数
                    this.params && Object.keys(this.params).map(k => {
                        formData.append(k, this.params[k])
                    })
                    this.$https({
                        url: this.action,
                        method: 'POST',
                        list: true,
                        data: formData,
                        timeout: 1000000
                    }).then(res => {
                        const response = { response: res, raw: file }
                        this.uploadLen += 1
                        if (res.code === 10000){
                            this.uploadSuccess(res)
                            this.successFiles.push(res)
                        } else {
                            this.uploadFailed(response)
                            this.failedFiles.push(response)
                        }
                    })
                })
            },
            uploadSuccess(response) {
                this.$emit('uploadSuccess', response)
            },
            uploadFailed(response) {
                this.$emit('uploadFailed', response)
            },
            uploadComplete(uploadStatus, successFiles, failedFiles) {
                this.$emit('uploadComplete', uploadStatus, successFiles, failedFiles)
            }
        }
    }
</script>

<style lang="scss">
    .r-upload {
        display: inline-block;
    }
    .r-upload-button-warp{
        position: relative;
        display: inline-block;
        overflow: hidden;
        cursor: pointer;
    }
    .r-upload-button{
        display: inline-block;
        box-sizing: border-box;
        /*padding: 0 20px;*/
        width: 100%;
        height: 100%;
        cursor: pointer;
    }
    .r-upload-input{
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
    }
</style>
