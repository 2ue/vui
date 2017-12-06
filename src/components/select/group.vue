<template>
    <div class="vui-select-group">
        <select-opt v-for="(options,index) in selfSelectOptions" :key="index" :index="index" :selectOptions="options" :selectedVal="selfSelectedVal[index]"
            @updateSelectedVal="updateSelectedVal"></select-opt>
    </div>
</template>

<script>
    import SelectOpt from "./index.vue";
    export default {
        name: 'vSelectGroup',
        data() {
            return {
                selfSelectOptions: [[...this.selectOptions]],
                selfSelectedVal: [...this.selectedVal]
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
                type: Array,
                default: function () {
                    return []
                }
            }
        },
        methods: {
            updateSelectedVal(selected, index, parentIndex) {
                // console.log('selecet==>', selected)
                // console.log('index==>', index)
                // console.log('parentIndex==>', parentIndex)
                let oldOptions = [...this.selfSelectOptions];
                if (selected.children) this.selfSelectOptions = [...oldOptions.slice(0, parentIndex + 1), selected.children];
                this.selfSelectedVal[parentIndex] = selected.value;
                this.selfSelectedVal = this.selfSelectedVal.slice(0, parentIndex + 1);
                this.$emit('updateSelectedVal', [...this.selfSelectedVal])
            }
        }
    }

</script>

<style scoped>
</style>
