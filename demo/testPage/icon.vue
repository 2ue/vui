<template>
    <div class="vue">
      <p>测试tyoe和size</p>
      <v-icon type="jiahao"></v-icon>
      <v-icon type="jiahao" size="small"></v-icon>
      <v-icon type="jiahao" size="middle"></v-icon>
      <v-icon type="jiahao" size="larger"></v-icon>
      <v-icon type="jiahao" size="50"></v-icon>
      <v-icon type="jiahao" size="40px"></v-icon>
      <v-icon type="jiahao" size="4rem"></v-icon>
      <br/>

      <p>测试color</p>
      <v-icon type="jiahao" size="middle" color="#f30" style="fontSize: 50px"></v-icon>

      <p>测试class</p>
      <v-icon type="jiahao" size="middle" color="#f30" class="testtt"></v-icon>
    </div>
</template>

<script>
    export default {
        name: 'vue',
        data () {
            return {}
        },
        methods: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
