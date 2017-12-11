<template>
    <div class="vui-select-group">
        <select-opt v-for="(options,index) in selfSelectOptions" :selectedKey="selectedKey" :disabled="disabled" :key="index" :index="index" :selectOptions="options"
            :selectedVal="selfSelectedVal[index]" @onChange="onChange"></select-opt>
    </div>
</template>

<script>
    import SelectOpt from "./index.vue";
    export default {
        name: 'vSelectGroup',
        data() {
            return {
                selfSelectOptions: [[...this.selectOptions]],
                selfSelectedVal: [],
                selfSelectedValMap: [],
            }
        },
        components: {
            SelectOpt
        },
        props: {
            selectOptions: {
                type: Array,
                default: function () {
                    return []
                }
            },
            selectedVal: {
                type: [Array, String],
                default: function () {
                    return []
                }
            },
            selectedKey: {
                type: String,
                default: 'value'
            },
            width: [Number, String],
            disabled: [Boolean, String, Number]
        },
        created() {
            this.fixedSelectedVal();
        },
        methods: {
            fixedSelectedVal() {
                const selectedVal = this.selectedVal, key = this.selectedKey, options = this.selfSelectOptions;
                for (let i = 0; i < selectedVal.length; i++) {
                    let val = selectedVal[i], res = false;
                    for (let j = 0; j < options[i].length; j++) {
                        const item = options[i][j];
                        if (val === item[key]) {
                            if (item.children) options.push([...item.children]);
                            res = true;
                        }
                    }
                    if (!res) return false;
                    this.selfSelectedVal.push(val);
                    this.selfSelectedValMap.push(val);
                }
            },
            onChange(selected, index, parentIndex) {
                let oldOptions = [...this.selfSelectOptions];
                if (selected.children) this.selfSelectOptions = [...oldOptions.slice(0, parentIndex + 1), selected.children];
                //用于展示数据，展示数据永远取value字段
                this.selfSelectedVal[parentIndex] = selected.value;
                this.selfSelectedVal = this.selfSelectedVal.slice(0, parentIndex + 1);
                //用于返回数据，返回数据根据selectedKey为准
                this.selfSelectedValMap[parentIndex] = selected[this.selectedKey];
                this.selfSelectedValMap = this.selfSelectedValMap.slice(0, parentIndex + 1);
                this.$emit('onChange', [...this.selfSelectedValMap])
            }
        }
    }

</script>

<style scoped>
</style>
