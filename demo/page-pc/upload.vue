<template>
    <div>
        <v-upload width="150" multiple="true1" :format="['xls','doc']" size="3kb"></v-upload>
        <br>
        <v-upload width="150px" multiple="multiple" accept="image/*"></v-upload>
    </div>
</template>

<script>
    export default {
        name: 'upload',
        data() {
            return {}
        },
        methods: {
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
