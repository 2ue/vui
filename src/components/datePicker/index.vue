<template>
    <div class="vui-datePicker-warp">
        时间选择器
        <datePickerPanel class="kk"></datePickerPanel>
    </div>
</template>

<script>
    import DatePickerPanel from "./datePickerPanel.vue"
    export default {
        name: 'vDatePicker',
        data() {
            return {}
        },
        components: {
            DatePickerPanel
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
</style>
