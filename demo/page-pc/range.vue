<template>
    <div>
        <p class="vui-page-title">测试</p>
        <div class="vui-p">
            <v-range :sectionValue="[-20,199]" value="199"></v-range>
        </div>
        <v-range sectionValue="-20" :value="[-10,100]"></v-range>
        <br>
        <v-range sectionValue="199" value="300"></v-range>
    </div>
</template>

<script>
    export default {
        name: 'range',
        data() {
            return {
            }
        },
        methods: {
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
