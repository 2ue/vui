<template>
    <div>
        <v-checkbox size="small"></v-checkbox>
    </div>
</template>

<script>
    export default {
        name: 'checkbox',
        data() {
            return {}
        },
        methods: {

            getInfo: function (event) {
                console.log('event==>', event)
                this.$alert('加载失败！');
                // this.$loading.show();
                // this.$loading.show({ html: '<p>{{ loadingText }}</p><span></span><span></span><span></span><span></span><span></span><span></span><hello></hello>' });
                // this.$https.get('https://api.github.com/users/2ue/repos?sort=created&per_page=100').then(function (res) {
                //     console.log('res==>', res);
                // });
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
