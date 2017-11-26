<template>
    <div>
        <v-date-picker :formate="formate" :selectedVal="selectedVal"></v-date-picker>
    </div>
</template>

<script>
    export default {
        name: 'switch',
        data() {
            return {
                formate: 'YYYY-MM-DD',
                selectedVal: new Date()
            }
        },
        methods: {
            onChange: function (event, checked) {
                console.log('checked==>', this.checked)
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
