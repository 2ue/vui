<template>
    <div>
        <v-menu :menuData="menuData" :showOne="true" :mapTable="mapTable"></v-menu>
    </div>
</template>

<script>
    import menuData from "../../data/menu.json";
    export default {
        name: 'menu',
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
