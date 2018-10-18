<template>
  <div class="widget-layout-wrapper">
    layout
  </div>
</template>

<script>
  import mixin from "./hoc/mixin.js"
  export default {
    name: "layout",
    mixins: [mixin],
    data() {
      return {}
    },
    methods: {
      $change() {
        debugger
      }
    }
  }
</script>

