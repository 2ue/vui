<template>
    <div>
        <p class="vui-page-title">测试</p>
        <div class="vui-p">
            <v-range :sectionValue="[-20,199]" value="199"></v-range>
        </div>
        <div class="vui-p">
            <v-range :sectionValue="[-20,80]" :value="[-10,40]"></v-range>
        </div>
        <div class="vui-p">
            <v-range :sectionValue="[-30,199]" value="100"></v-range>
        </div>
        <div class="vui-p">
            <v-range :sectionValue="[0,200]" value="300"></v-range>
        </div>
        <div class="vui-p">
            <v-range :sectionValue="[0,200]" value="150" :disabled="true" showDataTips="always"></v-range>
        </div>
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
