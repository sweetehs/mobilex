<template>
  <div class="xlink-wrapper" @click="to">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: ['url', 'target'],
    methods: {
      to() {
        if (this.target === "_blank") {
          window.open(this.url)
        }else{
          window.location.href = this.url
        }
      }
    }
  }
</script>

