<template>
    <div>
        <v-button size="small"></v-button>
        <v-button size="middle"></v-button>
        <v-button size="larger"></v-button>
        <br/>
        <v-button size="small" disabled="true"></v-button>
        <v-button size="middle" disabled="true"></v-button>
        <v-button size="larger" :disabled="false"></v-button>
        <br/>
        <v-button size="small" type="ghost"></v-button>
        <v-button size="middle" type="primary"></v-button>
        <v-button size="larger" type="dashed" disabled="true"></v-button>
        <br/>
        <v-button size="middle" text="middle" disabled="true"></v-button>
        <v-button size="larger" text="larger"></v-button>
        <v-button width="100" text="small 100" @click="getInfo"></v-button>
    </div>
</template>

<script>
    export default {
        name: 'button',
        data() {
            return {}
        },
        methods: {

            getInfo: function (event) {
                // console.log('event==>', event)
                // this.$alert('加载失败！');
                // this.$loading.show();
                // this.$loading.show({ html: '<p>{{ loadingText }}</p><span></span><span></span><span></span><span></span><span></span><span></span><hello></hello>' });
                // this.$https.get('https://api.github.com/users/2ue/repos?sort=created&per_page=100').then(function (res) {
                //     console.log('res==>', res);
                // });
                this.$https({
                    method: 'get',
                    url: 'https://api.github.com/users/2ue/repos',
                    loading: true,
                    data: {
                        sort: 'created',
                        per_page: 100,
                        loading: true
                    }
                });
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
