<template>
    <input class="vui-input" v-model="val" :disabled="disabled" :style="{ width: widthSize }" :readonly="readonly"  @input="input">
</template>

<script>
    export default {
        name: 'vInput',
        data() {
            return {
                val: this.value
            }
        },
        computed: {
          widthSize: function () {
            let width = this.width;
            if (this.$util.isNumber(width)) width = width + 'px';
            return width;
          },
        },
        watch: {
          val: function () {
            this.value = this.val;
          }
        },
        props: {
            value: {
                default: ''
            },
            width: {
              type: [String, Number]
            },
            disabled: {
                type: [Boolean, String],
                default: false
            },
            readonly: {
              type: [Boolean, String],
              default: false
            }
        },
        methods: {
          focus: function(event){
            this.$emit('focus', event);
          },
          input: function(event){
            this.$emit('input', event);
          }
        }
    }

</script>

<style scoped>

</style>
