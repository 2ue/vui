<template>
    <div id="app">
        <img src="./assets/logo.png" @click="getInfo">
        <hello></hello>
    </div>
</template>

<script>

    export default {
        name: 'app',
        methods: {
            getInfo: function () {
                this.$loading.show();
//                 this.$https.get('https://api.github.com/users/2ue/repos?sort=created&per_page=100').then(function (res) {
//                     console.log('res==>', res);
//                 });
                // this.$https({
                //     method: 'get',
                //     url: 'https://api.github.com/users/2ue/repos',
                //     loading: true,
                //     data: {
                //         sort: 'created',
                //         per_page: 100,
                //         loading: true
                //     }
                // });
            }
        }
    }

</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
