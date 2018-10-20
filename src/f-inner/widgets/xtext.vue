<template>
  <div class="widget-text-wrapper">
    text
  </div>
</template>

<script>
  import mixin from "./common/mixin.js"
  export default {
    name: "layout",
    mixins: [mixin],
    data() {
      return {}
    },
    methods: {
      $change(data, isFirst) {
        // debugger
      }
    }
  }
</script>

