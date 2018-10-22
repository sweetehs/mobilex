<style lang="less">
  .xbutton-wrapper {
    display: inline-block;
  }
</style>

<template>
  <div class="xbutton-wrapper">
    <span>{{text}}</span>
  </div>
</template>

<script>
  export default {
    props: {
      text: {
        default () {
          return "按钮"
        }
      },
      size: {
        default () {
          return "small"
        }
      }
    }
  }
</script>

