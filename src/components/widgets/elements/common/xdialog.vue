<style lang="less">
  .xdialog-wrapper {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    top: 0;
    left: 0;
    visibility: hidden;
    opacity: 0;
    transition: all .25s ease;
    &.active {
      visibility: visible;
      opacity: 1;
    }
    .xdialog-inner {
      width: 80%;
      min-height: 200px;
      background: #fff;
      border-radius: 4px;
      position: absolute;
      left: 50%;
      top: 40%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>

<template>
  <div :class="`xdialog-wrapper ${visible?'active':''}`" @click="closeDialog">
    <div class="xdialog-inner" @click="stop">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['visible'],
    watch: {
      visible(){
        debugger
      }
    },
    methods: {
      stop(e){
        e.stopPropagation()
      },
      closeDialog() {
        this.$emit("changeVisible", false)
      }
    }
  }
</script>

