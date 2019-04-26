<template>
    <div class="tag-textarea-border-container" @click.self="clickFocus" :style="{minHeight: height}">
        <div class="tag-textarea-container">
            <div v-for="(tag, i) in tags" class="tag-textarea-tag" :key="i">
                <label
                    class="tag-textarea-tag-edit"
                    :ref="`tagTextareaLabelInput${i}`"
                    contenteditable="true"
                    title="点击编辑"
                    @blur="editTag(i)">{{tag}}</label>
                <span class="tag-textarea-delete-btn" @click.stop="deleteTag(i)"><icon-svg icon-class="close"></icon-svg></span>
            </div>
            <div
                ref="tagTextareaInput"
                class="tag-textarea-input"
                placeholder="请输入发票号码，回车确认"
                contenteditable
                @keypress.enter.prevent="editText">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tags: [],
                selfVal: []
            }
        },
        props: {
            height: {
                type: [Number, String],
                default: '96px'
            },
            validateTag: Function
        },
        watch: {
            tags: {
                deep: true,
                handler(tags) {
                    this.$emit('input', tags.join(','))
                }
            }
        },
        methods: {
            editText() {
                const value = this.$refs.tagTextareaInput.innerText
                if (this.$_isNull(value)) return
                if (this.validateTag && typeof this.validateTag === 'function' && this.validateTag(value)) return
                this.tags.push(value)
                this.$refs.tagTextareaInput.innerText = ''
            },
            clickFocus() {
                this.$refs.tagTextareaInput.focus()
            },
            deleteKeyDelete() {
                const value = this.$refs.tagTextareaInput.innerText
                const len = this.tags.length
                if (this.$_isNull(value) && len > 0) {
                    this.editTagText(len - 1)
                }
            },
            editTagText(i) {
                this.$refs.tagTextareaInput.innerText = this.tags[i]
                this.tags.splice(i, 1)
                this.clickFocus()
            },
            editTag(i) {
                const value = this.$refs[`tagTextareaLabelInput${i}`][0].innerText
                console.log('value===> tagTextareaLabelInput${i}', this.$refs[`tagTextareaLabelInput${i}`])
                if (this.$_isNull(value)) {
                    this.deleteTag(i)
                }
            },
            deleteTag(i) {
                this.tags.splice(i, 1)
                this.clickFocus()
            }
        }
    }
</script>

<style lang="scss">
    .tag-textarea-border-container{
        border: 1px solid #DCDFE6;
        border-radius: 5px;
        cursor: text;
        transition: all ease-in-out 0.3s;
        &:focus, &:hover{
            outline: 0;
            border-color: $color-primary;
        }
    }
    .tag-textarea-container {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        cursor: text;
        padding: 5px 10px;
        word-break: break-all;
        .tag-textarea-tag {
            position: relative;
            display: inline-block;
            z-index: 1;
            border-radius: 3px;
            background: #ededed;
            padding: 0 6px 0 10px;
            margin-bottom: 5px;
            line-height: 25px;
            color: #484848;
            margin-right: 5px;
            cursor: pointer;
        }
        .tag-textarea-tag-edit{
            outline: none;
            font-weight: normal;
        }
        .tag-textarea-delete-btn {
            display: inline-block;
            vertical-align: top;
            margin-left: 5px;
            color: #c2c2c2;
            margin-top: -1px;
            svg{
                font-size: 12px;
                color: #cecdcd;
            }
        }
    }
    .tag-textarea-input {
        border: 1px solid transparent;
        outline: none;
        cursor: text;
        line-height: 25px;
        word-break: break-all;
        &:after {
            content: "";
            position: absolute;
            display: inline-block;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }
        &:empty:before{
            content: attr(placeholder);
            color: #97a8be;
        }
    }
</style>
