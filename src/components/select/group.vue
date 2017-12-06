<template>
    <div class="vui-select-group">
        <select-opt v-for="(options,index) in selfSelectOptions" :key="index" :selectOptions="options" @updateSelectedVal="updateSelectedVal()"></select-opt>
    </div>
</template>

<script>
    import SelectOpt from "./index.vue";
    export default {
        name: 'vSelectGroup',
        data() {
            return {
                selfSelectOptions: [[...this.selectOptions]]
            }
        },
        components: {
            SelectOpt
        },
        props: {
            selectOptions: {
                type: Array,
                default: []
            },
            selected: {
                type: [String, Number],
                default: '请选择'
            }
        },
        methods: {
            updateSelectedVal(selected, index, key) {
                console.log('selecet==>', selected)
                console.log('index==>', index)
                // this.selfSelectOptions.push([...selected.children])
            }
        }
    }

</script>

<style scoped>
</style>
