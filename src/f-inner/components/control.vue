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
    &.active,
    &.hover {
      >.overlay {
        // background: rgba(255, 255, 255, 0.5);
        border: 2px dashed #e12134;
        box-sizing: border-box;
      }
    }
  }
</style>

<template>
  <div :class="{'item-control-wrapper':true,'hover':isHover}" :style="style" @click="eventItemClick" @mouseover="eventEnter" @mouseout="eventLeave">
    <div class="overlay"></div>
    <slot></slot>
  </div>
</template>

<script>
  import event from "./event"
  export default {
    props: ["id"],
    data() {
      return {
        style: {},
        isHover: false
      }
    },
    mounted() {
      const display = document.defaultView.getComputedStyle(this.$children[0].$el).display
      this.$set(this.style, "display", display)
    },
    methods: {
      eventItemClick(e) {
        event.$emit("setControl",this.id)
        e.stopPropagation()
      },
      eventEnter(e) {
        this.isHover = true
        e.stopPropagation()
      },
      eventLeave(e) {
        this.isHover = false
        e.stopPropagation()
      }
    }
  }
</script>

