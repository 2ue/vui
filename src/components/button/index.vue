<template>
  <div class="vui-button">
    <button :class="'vui-' + size" :style="{width:widthVal}">测试</button>
  </div>
</template>

<script>
  export default {
    name: 'vButton',
    data () {
      return {
      }
    },
    computed: {
      widthVal: function () {
          let width = this.width;
          console.log(this.$util.isNumber(width))
        let yy = {
              uu: [{
                  jjj: ['000','pppp']
              }]
        }
          if(this.$util.isNumber(width)) width = width + 'px';
        return width;
      }
    },
    props: {
        size: {
            default: 'small'
        },
      styles: {
            type: Object
      },
      width: {
            type: [String, Number],
        value: function (val) {
          console.log(val)
          return val
        }
      }
    },
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
