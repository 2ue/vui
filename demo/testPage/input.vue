<template>
    <div>
      <v-input></v-input><br/>
      <v-input width="300"></v-input><br/>
      <v-input disabled="true"></v-input><br/>
      <v-input readonly="true"></v-input><br/>
      <v-input v-model="uuuuuu"></v-input><br/>
      <v-input :value="uuuuuu"></v-input><br/>
      <v-input @on-change="onChange" :value="testchange"></v-input><br/>
    </div>
</template>

<script>
    export default {
        name: 'vue',
        data () {
            return {
              uuuuuu: 9099009,
              testchange: 88888
            }
        },
        methods: {

          onChange: function (event) {
              console.log(this.testchange)
          }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
