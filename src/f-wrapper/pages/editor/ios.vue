<style lang="less">
  .ios-wrapper {
    background-color: #fff;
    padding: 60px 20px;
    border-radius: 20px;
    box-shadow: 0 0 8px #b6b6b6;
    position: relative;
    .ios-inner {
      background-color: #eee;
      box-shadow: 0 0 4px #eee;
      position: relative;
    }
    .ios-radius {
      height: 38px;
      width: 38px;
      border-radius: 38px;
      background: #fff;
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translate(-50%, 0);
      box-shadow: 0 0 8px #b6b6b6 inset;
      border: 2px solid #b6b6b6;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover{
        cursor: pointer;
      }
      a{
        font-size: 18px;
        color: #b6b6b6;
        box-shadow: 0 0 5px #eee;
      }
    }
    .ios-top {
      width: 100px;
      height: 4px;
      border-radius: 6px;
      background: #b6b6b6;
      box-shadow: 0 0 5px #b6b6b6;
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
      top: 30px;
    }
    .ios-share{
      a{
        color: #b6b6b6;
      }
      position: absolute;
      right: 20px;
      top: 26px;
      font-size: 18px;
    }
  }
</style>
>
<template>
  <div class="ios-wrapper">
    <div class="ios-top"></div>
    <div class="ios-share" @click="eventPreview">
      <a href="javascript:;" class="fa fa-share"></a>
    </div>
    <div class="ios-inner">
      <slot></slot>
    </div>
    <div class="ios-radius" @click="eventSave">
      <a href="javascript:;" class="fa fa-save"></a>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      eventSave(){
        this.$emit("save")
      },
      eventPreview(){
        window.open("/preview.html")
      }
    }
  }
</script>

