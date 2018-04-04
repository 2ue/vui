<template>
  <div class="v-step">
    <ul class="v-step-item" v-for="(step, index) in steps" :key="index" :style="getStyles">
      <li class="v-step-title">
        <slot name="title" :scope="step"><span>{{step.text}}</span></slot>
      </li>
      <li>
        <span class="v-step-icon" v-if="active <= index">{{index}}</span>
        <span class="v-step-icon v-step-icon-active" v-else>√</span>
      </li>
      <li class="v-step-des"><span>{{step.name}}</span>发起</li>
      <li class="v-step-time"><span>{{step.time}}</span></li>
      <li v-if="index !== 0" class="v-step-line" :class="{ 'v-step-line-active': step.status === 1}"></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'step',
    data() {
      return {
      }
    },
    computed: {
      getStyles() {
        const i = this.steps.length
        return { width: `${100 / i}%` }
      }
    },
    props: {
      steps: {
        type: Array,
        default: () => []
      },
      active: {
        type: Number,
        default: 0
      }
    }
  }
</script>

<style scoped lang="scss">
  .v-step{
    position: relative;
    color: #6b6f82;
    width: 100%;
    text-align: center;
  }
  .v-step-item{
    position: relative;
    display: inline-block;
    vertical-align: top;
    height: 110px;
    width: 32px;
    font-size: 0;
  }
  li{
    font-size: 14px;
  }
  .v-step-title, .v-step-des, .v-step-time{
    height: 20px;
    white-space: nowrap;
  }
  .v-step-line{
    position: absolute;
    display: inline-block;
    width: 100%;
    height: 2px;
    background: #6b6f82;
    top: 45px;
    left: 0;
    margin-left: -50%;
    z-index: 2;
  }
  .v-step-line-active{
    background: #1e9ff2;
  }
  .v-step-icon{
    position: relative;
    display: inline-block;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid #e5e8eb;
    line-height: 28px;
    margin-top: 10px;
    margin-bottom: 10px;
    background: #fff;
    z-index: 9;
  }
  .v-step-icon-active{
    border: 2px solid #1e9ff2;
    line-height: 26px;
  }
</style>
