<template>
    <label :class="wrapperClass">
        <span :class="checkboxClass">
            <span :class="innerClass"></span>
            <input
                    type="checkbox"
                    :class="inputClass"
                    v-if="group"
                    v-model="model"
                    :disabled="disabled"
                    :value="label"
                    @change="change"
                    @click.stop="()=>{}"
            >
            <input
                    type="checkbox"
                    :class="inputClass"
                    v-if="!group"
                    :disabled="disabled"
                    :checked="currentValue"
                    @change="change"
                    @click.stop="()=>{}"
            >
        </span>
        <slot><span v-if="checkShowText(text)" class="i-checkbox-default-text">{{ text }}</span></slot>
    </label>
</template>

<script>
    const baseClass = 'i-checkbox';
    const PARENT_COMPONENT_NAME = 'ICheckboxGroup';

    export default {
        name : 'ICheckbox',
        data : function () {
            const _parent = this.$parent.$options.name === PARENT_COMPONENT_NAME
                ? this.$parent
                : void 0;
            return {
                group : !!_parent,
                currentValue : this.value,
                model : [],
                parent : _parent
            };
        },
        props : {
            disabled : {
                type : Boolean,
                default : false
            },
            value : {
                type : Boolean,
                default : false
            },
            label : {
                type : [String, Boolean, Number]
            },
            // 显示文案
            text : [String, Boolean, Number]
        },
        mounted () {
            if (this.group) {
                // 调用群组方法更新视图
                this.parent.updateCheckboxGroupValue();
            } else {
                // 自身依据 value 更新
                this.updateValue();
            }
        },
        computed : {
            wrapperClass () {
                return [
                    `${baseClass}-wrapper`,
                    {
                        [`${baseClass}-wrapper-checked`] : this.currentValue,
                        [`${baseClass}-wrapper-disabled`] : this.disabled
                    }
                ];
            },
            checkboxClass () {
                return [
                    `${baseClass}`,
                    {
                        [`${baseClass}-checked`] : this.checked,
                        [`${baseClass}-disabled`] : this.disabled
                    }
                ];
            },
            innerClass () {
                return [
                    `${baseClass}-inner`,
                    {
                        [`${baseClass}-inner-checked`] : this.currentValue
                    }
                ];
            },
            inputClass () {
                return `${baseClass}-input`
            }
        },
        methods : {
            checkShowText (text) {
                // 屏蔽除了 0 以外的其他假值
                // 0 的两种情况：
                // :text="0" 输入时为 0
                // text="0" 时输入为 '0'
                return Boolean(text) || text === '0' || text === 0;
            },
            change ($event) {
                // 如果禁用，不作处理
                if (this.disabled) {
                    return;
                }

                let checked = $event.target.checked;

                this.currentValue = checked;
                this.$emit('input', checked);
                this.$emit('click', $event, this);
                if (this.group) {
                    debugger;
                    this.parent.change(this.model);
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
<style>
    .i-checkbox-input {
        position: absolute;

        width: 18px;
        height: 18px;

        margin: auto;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;

        opacity: 0;
        cursor: pointer;
    }

    .i-checkbox {
        position: relative;
        display: inline-block;

        width: 18px;
        height: 18px;

        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;

        vertical-align: top;
    }

    .i-checkbox-wrapper {
        display: inline-block;

        height: 18px;

        line-height: 18px;
    }

    .i-checkbox-wrapper-disabled .i-checkbox:hover .i-checkbox-inner {
        background-color: #F6F6F8;
    }

    .i-checkbox:hover .i-checkbox-inner {
        background: #D1D2E9;
    }

    .i-checkbox:hover .i-checkbox-inner-checked {
        background: #A3A6D4;
    }

    .i-checkbox-group .i-checkbox-wrapper {
        margin-right: 10px;
    }

    .i-checkbox-inner {
        display: inline-block;

        width: 18px;
        height: 18px;

        border: 1px solid #A3A6D4;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .i-checkbox-inner-checked {
        background-color: #A3A6D4;
    }

    .i-checkbox-inner-checked:before {
        position: absolute;
        display: block;
        content: '';

        width: 18px;
        height: 10px;

        top: -2px;
        left: -1px;

        border-left:2px solid #fff;
        border-bottom:2px solid #fff;

        transform: rotate(-45deg);
    }

    .i-checkbox-wrapper-disabled .i-checkbox-inner {
        border: 1px solid #C8C8CE;

        background-color: #F6F6F8;
    }

    .i-checkbox-wrapper-disabled .i-checkbox-input {
        cursor: not-allowed;
    }

    .i-checkbox-default-text {
        display: inline-block;
        height: 18px;
        font-size: 14px;
    }
</style>
