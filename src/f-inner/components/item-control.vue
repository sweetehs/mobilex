<style lang="less">
  .item-control-wrapper {
    position: relative;
    .overlay {
      position: absolute;
      height: 100%;
      width: 100%;
      left: 0;
      top: 0;
    }
    &:hover {
      .overlay {
        background: rgba(255, 255, 255, 0.2);
        border: 1px dashed #e12134;
      }
    }
  }
</style>

<template>
  <div class="item-control-wrapper" :style="style">
    <div class="overlay"></div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        style: {}
      }
    },
    mounted() {
      const display = document.defaultView.getComputedStyle(this.$children[0].$el).display
      this.$set(this.style, "display", display)
    }
  }
</script>

