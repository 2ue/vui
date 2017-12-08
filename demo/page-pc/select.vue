<template>
    <div>
        <v-select :selectOptions="selectOptions1" @onChange="onChange" selectedVal="selectedVal"></v-select>
        <br>
        <v-select :selectOptions="selectOptions2" :selectedVal="selectedVal" @onChange="onChange"></v-select>
        <br>
        <v-select-group :selectOptions="selectOptions" :selectedVal="selectedVal2" @onChange="onChange"></v-select-group>
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
                selectedVal: 'John Taylor',
                selectedVal2: ['范伟', 'Mark Thompson', '292244']
            }
        },
        methods: {
            onChange(selected, index) {
                console.log(selected)
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
