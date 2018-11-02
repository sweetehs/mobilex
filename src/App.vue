<template>
  <div id="app">
    <Inner v-if="isInner"/>
    <Preview v-else-if="isPreview"/>
    <Wrapper v-else/>
  </div>
</template>

<script>
  import Inner from "Inner"
  import Wrapper from "Wrapper"
  import Preview from "./f-preview/index.vue"
  export default {
    components: {
      Inner,
      Wrapper,
      Preview
    },
    name: 'App',
    data(){
      return {
        isInner: location.href.indexOf("inner=true") !== -1,
        isPreview: location.href.indexOf("preview=true") !== -1
      }
    }
  }
</script>

<style>
  #app {
   
  }
</style>
