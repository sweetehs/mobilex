<style lang="less">
  .item-control-wrapper {
    position: relative;
    margin: -1px;
    .overlay {
      position: absolute;
      height: 100%;
      width: 100%;
      left: 0;
      top: 0;
      box-sizing: border-box;
      border: 2px dashed #333;
      overflow: hidden;
      box-sizing: border-box;
    }
    &.hover {
      >.overlay {
        border: 2px dashed #e12134;
      }
    }
    &.active {
      >.overlay {
        border: 2px dashed #48D1CC;
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
    name: "control",
    props: ["id", "base"],
    data() {
      return {
        style: {},
        isHover: false
      }
    },
    methods: {
      canClick() {
        return !this.base.isLock || this.id === this.base.isLock
      },
      eventItemClick(e) {
        if (this.canClick()) {
          event.$emit("setControl", this.id)
          e.stopPropagation()
        }
      },
      eventEnter(e) {
        if (this.canClick()) {
          this.isHover = true
          e.stopPropagation()
        }
      },
      eventLeave(e) {
        if (this.canClick()) {
          this.isHover = false
          e.stopPropagation()
        }
      }
    }
  }
</script>

