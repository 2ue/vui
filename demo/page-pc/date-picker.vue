<template>
    <div>

        <p class="vui-page-title">demo</p>
        <v-date-picker :formate="formate" :selectedDate="selectedDate" @changeDate="onChange"></v-date-picker>

        <p class="vui-page-title">日期选择组件</p>
        <p>目前只支持年月日选择，支持各种输出各种格式：YYYY/yyyy表示年，MM表示月，DD/dd表示日。其中MM只能大写</p>
        <p class="mr-b10">以2017年9月12为例：</p>
        <table>
            <tr>
                <th>示例</th>
                <th>结果</th>
            </tr>
            <tr>
                <td>YYYY</td>
                <td>2017</td>
            </tr>
            <tr>
                <td>yyyy</td>
                <td>2017</td>
            </tr>
            <tr>
                <td>MM</td>
                <td>09</td>
            </tr>
            <tr>
                <td>M</td>
                <td>9</td>
            </tr>
            <tr>
                <td>DD</td>
                <td>12</td>
            </tr>
            <tr>
                <td>dd</td>
                <td>12</td>
            </tr>
            <tr>
                <td>D</td>
                <td>12</td>
            </tr>
            <tr>
                <td>d</td>
                <td>12</td>
            </tr>
            <tr>
                <td>YYYY-MM-DD</td>
                <td>2017-09-12</td>
            </tr>
            <tr>
                <td>YYYY/MM/DD</td>
                <td>2017/09/12</td>
            </tr>
            <tr>
                <td>MM/DD/YYYY</td>
                <td>09/12/2017</td>
            </tr>
            <tr>
                <td>DD/MM/YYYY</td>
                <td>12/09/2017</td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'datePicker',
        data() {
            return {
                formate: 'YYYY/MM/DD',
                selectedDate: new Date()
            }
        },
        methods: {
            onChange: function (selectedDate) {
                console.log('selectedDate==>', selectedDate)
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    table {
        background: $border-color-little;
        width: 60%;
    }

    th,
    td {
        height: 30px;
        border: 1px solid $border-color-less;
        text-align: center;
    }
</style>
