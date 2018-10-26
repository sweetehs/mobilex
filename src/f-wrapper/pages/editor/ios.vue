<style lang="less">
  .ios-wrapper {
    background-color: #fff;
    padding: 60px 20px;
    border-radius: 20px;
    box-shadow: 0 0 8px #888;
    position: relative;
    .ios-inner {
      background-color: #eee;
      box-shadow: 0 0 4px #eee;
    }
    .ios-radius {
      height: 35px;
      width: 35px;
      border-radius: 35px;
      background: #fff;
      border: 2px solid #eee;
      position: absolute;
      bottom: 12px;
      left: 50%;
      transform: translate(-50%, 0);
      box-shadow: 0 0 5px #888 inset;
      border: 3px solid #888;
    }
    .ios-top {
      width: 100px;
      height: 4px;
      border-radius: 6px;
      background: #888;
      box-shadow: 0 0 5px #888;
      position: absolute;
      top: 0px;
      left: 50%;
      transform: translate(-50%, 0);
      top: 30px;
    }
  }
</style>
>
<template>
  <div class="ios-wrapper">
    <div class="ios-top">
      <i></i>
      <span></span>
    </div>
    <div class="ios-inner">
      <slot></slot>
    </div>
    <div class="ios-radius" @click="eventSave"></div>
  </div>
</template>

<script>
  export default {
    methods: {
      eventSave(){
        this.$emit("save")
      }
    }
  }
</script>

