<template>
    <!-- 外部包裹元素 -->
    <div :class="wrapperClass">
        <!-- radio 占位元素 -->
        <span :class="radioClass">
            <!-- 样式覆盖原生 radio 元素 -->
            <span :class="innerClass"></span>
            <!-- 原生 radio 类 -->
            <input
              type="radio"
              :class="inputClass"
              :disabled="disabled"
              :checked="currentValue"
              :id="id"
              @change="change"
            >
        </span>
        <!-- 没有插槽的时候显示 label 内容 -->
        <slot>{{ label || '' }}</slot>
    </div>
</template>
<script>
    const baseClass = 'i-radio';
    const PARENT_COMPONENT_NAME = 'IRadioGroup';
    export default {
        name: 'IRadio',
        props : {
            // 是否禁用
            disabled : {
                type : Boolean,
                default : false
            },
            // v-model
            value : {
                type : [String, Boolean],
                default : false
            },
            // 没有插槽时候的展示文案
            label : {
                type : [Boolean, String, Number]
            },
            // 为配合 label 的 id 属性
            id : {
                type : String
            }
        },
        data () {
            // 检测是否有 parent
            const _parent = this.$parent.$options.name === PARENT_COMPONENT_NAME
                ? this.$parent
                : void 0;
            return {
                currentValue : this.value,
                // 有 parent 说明为群组出现
                group : !!_parent,
                parent : _parent
            };
        },
        computed: {
            /**
             * 类名设置
             *
             * - 外部包裹元素类名
             * - 占位元素类名
             * - 用于覆盖 radio 元素类名
             * - 原生 radio 类名
             */
            wrapperClass () {
                return [
                    `${baseClass}-wrapper`,
                    {
                        [`${baseClass}-wrapper-checked`] : this.currentValue,
                        [`${baseClass}-wrapper-disabled`] : this.disabled
                    }
                ];
            },
            radioClass () {
                return [
                    `${baseClass}`,
                    {
                        [`${baseClass}-checked`] : this.currentValue,
                        [`${baseClass}-disabled`] : this.disabled
                    }
                ];
            },
            innerClass () {
                return `${baseClass}-inner`;
            },
            inputClass () {
                return `${baseClass}-input`;
            }
        },
        mounted () {
            if (this.group) {
                this.parent.updatedGroupListValue();
            } else {
                this.updateValue();
            }
        },
        methods : {
            change ($event) {
                const _self = this;
                // 禁用则不处理
                if (this.disabled) {
                    return false;
                }

                // 如果有群组，优先更新群组
                if (this.group) {
                    this.parent.updatedGroupListValue({
                       value : _self.label
                    });
                } else {
                    // 改变本身的值
                    const trueInputChecked = $event.target.checked;
                    this.currentValue = trueInputChecked;
                    this.$emit('input', trueInputChecked);
                }
            },
            updateValue () {
                this.currentValue = this.value;
            }
        },
        watch : {
            value () {
                this.updateValue();
            }
        }
    }
</script>

<style lang="less" scoped>
    .i-radio-wrapper {
        display: inline-block;
    }

    .i-radio {
        position: relative;
        display: inline-block;

        width: 20px;
        height: 20px;

        vertical-align: middle;
    }

    .i-radio-inner {
        display: inline-block;

        width: 18px;
        height: 18px;

        border:1px solid #A3A6D4;
        border-radius:50%;

        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .i-radio:hover .i-radio-inner {
        background-color: #D1D2E9;
    }


    .i-radio-input {
        position: absolute;

        width: 20px;
        height: 20px;

        margin: auto;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;

        opacity: 0;

        cursor: pointer;
    }

    .i-radio-checked .i-radio-inner {
        border-width: 6px;
    }

    .i-radio-wrapper-disabled .i-radio-inner {
        border-color: #C8C8CE;

        background-color: #F6F6F8;

        cursor: not-allowed;
    }

    .i-radio-wrapper-disabled .i-radio-disabled:hover .i-radio-inner {
        background-color: #F6F6F8;
    }
</style>