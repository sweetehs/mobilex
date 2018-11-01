<template>
  <div class="xlink-wrapper">
    <div class="xlink-inner">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['link', 'target']
  }
</script>

