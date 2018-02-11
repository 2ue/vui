<template>
    <div>
        <v-tree-menu :menuData="menuData" :showOne="true" :mapTable="mapTable"></v-tree-menu>
    </div>
</template>

<script>
    import menuData from "../../data/menu.json";
    export default {
        name: 'tree-menu',
        data() {
            return {
                menuData: [...menuData.items],
                mapTable: {
                    key: 'id',
                    name: 'cname'
                }
            }
        },
        methods: {
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
