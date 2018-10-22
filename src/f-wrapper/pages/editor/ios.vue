<style lang="less">
.ios-wrapper{
  background-color: #fff;
  padding: 60px 20px;
  border-radius: 20px;
  box-shadow: 0 0 8px #888;
  position: relative;
  .ios-inner{
    background-color: #eee;
  }
  .ios-radius{
    height: 35px;
    width: 35px;
    border-radius: 35px;
    background: #fff;
    border: 2px solid #eee;
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translate(-50%,0);
    box-shadow: 0 0 5px #888 inset;
  }
}
</style>
>
<template>
  <div class="ios-wrapper">
    <div class="ios-inner">
      <slot></slot>
    </div>
    <div class="ios-radius"></div>
  </div>
</template>
