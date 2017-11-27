<template>
    <div>
        <v-select :listData="listData"></v-select>
    </div>
</template>

<script>
    import listData from "../../data/select-list.json";
    console.log('listData==>', listData)
    export default {
        name: 'select',
        data() {
            return {
                listData: [...listData.selectList]
            }
        },
        created() {
            this.getInfo();
        },
        methods: {
            getInfo: function (event) {
                // this.$https({
                //     method: 'get',
                //     url: '../data/select-list.json',
                //     loading: true,
                //     type: 'json'
                // });
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
