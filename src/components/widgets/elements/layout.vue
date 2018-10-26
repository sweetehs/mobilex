<style>
  .widget-layout-wrapper{
    box-sizing: border-box;
  }
</style>

<template>
  <div class="widget-layout-wrapper" :style="flex">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "layout",
    props: ["flex"],
    data() {
      return {}
    }
  }
</script>

