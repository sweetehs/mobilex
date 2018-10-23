<style lang="less">
  .item-control-wrapper {
    position: relative;
    .overlay {
      position: absolute;
      height: 100%;
      width: 100%;
      left: 0;
      top: 0;
      box-sizing: border-box;
    }
    &.hover {
      >.overlay{
        border: 4px dashed #e12134;
      }
    }
    &.active{
       >.overlay {
        border: 4px dashed #48D1CC;
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

