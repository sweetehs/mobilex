<template>
  <div id="app">
    <Inner v-if="isInner"/>
    <Wrapper v-else/>
  </div>
</template>

<script>
  import Inner from "Inner"
  import Wrapper from "Wrapper"
  export default {
    components: {
      Inner,
      Wrapper
    },
    name: 'App',
    data(){
      return {
        isInner: location.href.indexOf("inner=true") !== -1
      }
    }
  }
</script>

<style>
  #app {
   
  }
</style>
