<template>
    <div>
        <v-select :selectOptions="selectOptions1" @updateSelectedVal="updateSelectedVal"></v-select>
        <br>
        <v-select :selectOptions="selectOptions2" :selectedVal="selectedVal" @updateSelectedVal="updateSelectedVal"></v-select>
        <br>
        <v-select-group :selectOptions="selectOptions" @updateSelectedVal="updateSelectedVal"></v-select-group>
    </div>
</template>

<script>
    import selectData from "../../data/select.json";
    export default {
        name: 'menu',
        data() {
            return {
                selectOptions: [...selectData.items],
                selectOptions1: [...selectData.items, ...selectData.items[2].children, ...selectData.items[3].children],
                selectOptions2: [...selectData.items[0].children, ...selectData.items, ...selectData.items[1].children],
                selectedVal: 'John Taylor'
            }
        },
        watch: {
            selected: function (val) {
                console.log('val==>', val)
            }
        },
        methods: {
            updateSelectedVal(selected, index) {
                console.log(selected)
                // console.log(index)
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
