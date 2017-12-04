<template>
    <div>
        <v-button @click="show"></v-button>
        <v-modal :options="modalOptions" :showModal="showModal"></v-modal>
    </div>
</template>

<script>
    export default {
        name: 'modal',
        data() {
            return {
                showModal: false,
                modalOptions: {
                    title: '提示111',
                    showModal: false,
                    showFooter: false,
                    content: '',
                    callback: ''
                }
            }
        },
        methods: {
            show: function () {
                console.log('button click show')
                this.modalOptions.showModal = true
                this.showModal = true;
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
