<template>
  <div class="widget-text-wrapper">
    {{text||'默认文字'}}
  </div>
</template>

<script>
  // import mixin from "../mixin.js"
  export default {
    name: "layout",
    // mixins: [mixin],
    props: ['text'],
    data() {
      return {}
    },
    methods: {
      $change(data, isFirst) {
        debugger
      }
    }
  }
</script>

