<style lang="less">
  .editor-main-wrapper{
    height: 100%;
    display: flex;
    >div:not(.editor-wrapper){
      flex: 1;
    }
    .editor-wrapper{
      width: 600px;
      flex-shrink: 0;
      background: #eee;
      display: flex;
      align-items: center;
      justify-content: center;
      .editor-inner{
        background: #aaa;
        width: 375px;
        height: 614px;
      }
      iframe{
        height: 100%;
        width: 100%;
      }
    }
  }
</style>

<template>
  <div class="editor-main-wrapper">
    <div class="widgets-wrapper"></div>
    <div class="editor-wrapper">
      <div class="editor-inner">
        <iframe src="/?inner=true" frameborder="0"></iframe>
      </div>
    </div>
    <div class="controls-wrapper"></div>
  </div>
</template>
