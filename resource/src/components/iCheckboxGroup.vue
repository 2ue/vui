<template>
    <div class="i-checkbox-group">
        <slot></slot>
    </div>
</template>
<script>
    // 唯一有效的子组件名字
    const CHILD_COMPONENT_NAME = 'ICheckbox';

    export default {
        name : 'ICheckboxGroup',
        props : {
            value : {
                type : Array,
                default () {
                    return [];
                }
            }
        },
        data () {
            return {
                currentValue : this.value,
                children : []
            }
        },
        mounted () {
            var _self = this;
            _self.updateCheckboxGroupValue(true);
        },
        methods : {
            change (data) {
                this.currentValue = data;
                this.$emit('input', data);
            },
            updateCheckboxGroupValue (update) {
                const value = this.value;
                if (!this.children.length) {
                    this.$children.map(child => {
                        if (child.$options.name === CHILD_COMPONENT_NAME) {
                            this.children.push(child);
                        }
                    });
                }

                if (this.children) {
                    this.children.map(child => {
                        child.model = value;
                        if (update) {
                            child.currentValue = value.indexOf(child.label) > -1;
                            child.group = true;
                        }
                    });
                }

                // // 清空
                // this.currentValue = [];
                // // map 收集当前 checked 状态的
                // this.children.map(child => {
                //     if (child.currentValue) {
                //         this.currentValue.push(child.model.join());
                //     }
                // });

                /*let hasCurrentValueLength = !!(this.currentValue.length);




                if (hasCurrentValueLength && fristUpdateTag) {
                    this.children.map(child => {
                        child.currentValue = this.currentValue.indexOf(child.label) > -1;
                    });
                } else {
                    let currentValue = currentVm && currentVm.currentValue;

                    if (currentValue) {
                        this.currentValue.push(currentVm.label);
                    } else if (currentVm) {
                        let _index = this.currentValue.indexOf(currentVm.label);
                        this.currentValue.splice(_index, 1);
                    }
                }*/

                /*// 更新 child model
                this.children.map(child => {
                    child.model = this.value;
                });*/

                /*// 更新到 model 上
                this.$emit('input', this.currentValue);*/

            }
        },
        watch : {
            value () {
                this.updateCheckboxGroupValue(true);
            }
        }
    };
</script>