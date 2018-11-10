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
    <img ondragstart="return false;" :src="url" />
  </div>
</template>

<script>
  export default {
    props: ["url"]
  }
</script>

