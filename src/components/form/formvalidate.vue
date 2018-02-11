<template>
    <div class="form">
        <button v-if="hideBtn" @click="submit">提交</button>
        <solt></solt>
    </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {}
        },
        props:{
            hideBtn: {
                type: Boolean,
                default: false
            },
            formData:{
                type: Object
            },
            validateRules:{
                type: Object
            }
        },
        computed:{
            selfFormData(){
                return this.formData;
            },
            selfValidateRules(){
                return this.validateRules;
            }
        },
        methods:{
            submit(){

            },
            validateForm(){

            }
        }
    }
</script>

<style>

</style>
