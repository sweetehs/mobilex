<style lang="less">
  .ximage-wrapper {
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>

<template>
  <div class="ximage-wrapper">
    <img :src="url" alt="">
  </div>
</template>

<script>
  export default {
    props: ["url"]
  }
</script>

