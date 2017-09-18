<template>
    <input class="vui-input" v-model="value" :disabled="disabled" :style="{ width: widthSize }" :readonly="readonly" @click="click" @focus="focus">
</template>

<script>
    export default {
        name: 'vInput',
        data() {
            return {
            }
        },
        computed: {
          widthSize: function () {
            let width = this.width;
            if (this.$util.isNumber(width)) width = width + 'px';
            return width;
          },
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
          click: function(event){
            this.$emit('click', event);
          },
          focus: function(event){
            this.$emit('focus', event);
          },
          change: function(event){
            this.$emit('on-change', event);
          }
        }
    }

</script>

<style scoped>

</style>
