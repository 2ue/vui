<template>
    <div class="i-radio-group">
        <!-- 直接是一个插槽 -->
        <slot></slot>
    </div>
</template>
<script>
    import Vue from 'vue';
    // 唯一有效的子组件名字
    const CHILD_COMPONENT_NAME = 'IRadio';

    export default {
        name : 'IRadioGroup',
        props : {
            value : {
                type : [String, Number]
            }
        },
        mounted () {
            this.updatedGroupListValue();
        },
        data () {
            return {
                currentValue : this.value,
                children : []
            };
        },
        methods : {
            updatedGroupListValue (data) {
                data && (this.$emit('input', data.value));
                this.currentValue = this.value;
                const _value = this.value;

                // 筛选出唯一支持的 IRadio 组件
                if (!this.children.length) {
                    this.$children.map(child => {
                        if (child.$options.name === CHILD_COMPONENT_NAME) {
                            this.children.push(child);
                        }
                    })
                }

                // 子组件的
                this.children.map(child => {
                    child.currentValue = _value === child.label;
                });
            }
        },
        watch : {
            value () {
                this.updatedGroupListValue();
            }
        }

    };
</script>