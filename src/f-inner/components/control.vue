<style lang="less">
  .item-control-wrapper {
    position: relative;
    margin: -1px;
    &.lock{
      .overlay:not(.lock-root){
        border: none;
      }
    }
    .overlay {
      position: absolute;
      height: 100%;
      width: 100%;
      left: 0;
      top: 0;
      box-sizing: border-box;
      overflow: hidden;
      pointer-events: none;
      border: 1px dashed #333;
      &:hover{
        cursor: pointer;
      }
    }
    &.hover {
      >.overlay {
        border: 2px solid #e12134;
        z-index: 4;
      }
    }
    &.active {
      >.overlay {
        border: 2px solid #48D1CC;
        z-index: 3;
      }
    }
  }
</style>

<template>
  <div :class="{
    'item-control-wrapper':true,
    'hover':isHover,
    'lock': base.isLock
  }" :style="style" @click="eventItemClick" @mouseover="eventEnter" @mouseout="eventLeave">
    <div class="overlay" :class="{
      'lock-root': base.isLock == id
    }"></div>
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
        return !this.base.isLock
      },
      eventItemClick(e) {
        if (this.canClick()) {
          event.$emit("setControl", this.id)
        }
        e.stopPropagation()
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

