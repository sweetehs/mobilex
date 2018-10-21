<template>
  <div class="widget-text-wrapper">
    {{text}}
  </div>
</template>

<script>
  export default {
    props: {
      text: {
        default(){
          return "默认文字"
        },
      }
    },
    data() {
      return {}
    }
  }
</script>

