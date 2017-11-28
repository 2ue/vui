<template>
    <div>
        <v-select :listData="listData" :showOne="true"></v-select>
    </div>
</template>

<script>
    import listData from "../../data/select-list.json";
    export default {
        name: 'select',
        data() {
            return {
                listData: [...listData.selectList]
            }
        },
        methods: {
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
