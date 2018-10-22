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
    &.active{
      .overlay{
         background: rgba(255, 255, 255, 0.5);
        border: 2px dashed #e12134;
        box-sizing: border-box;
      }
    }
    &:hover {
      .overlay {
        background: rgba(255, 255, 255, 0.5);
        border: 2px dashed #e12134;
        box-sizing: border-box;
      }
    }
  }
</style>

<template>
  <div class="item-control-wrapper" :style="style" @click="eventItemClick">
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
    },
    methods: {
      eventItemClick(){
        this.$emit("click")
      }
    }
  }
</script>

