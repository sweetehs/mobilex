<template>
  <div :style="style">
    <control ref="control" :class="item.id == currentId ? 'active' : ''" v-for="(item,i) in datas" :key="i">
      <component :is="item.wid" :style="item.controls.style" v-bind="item.controls.props">
        <controlwrapper :datas="item.children" :currentId="currentId"></controlwrapper>
      </component>
    </control>
  </div>
</template>

<script>
  import control from "./control"
  export default {
    name: "controlwrapper",
    components: {
      control
    },
    props: ["datas", "currentId"],
    data() {
      return {
        style: {
          
        }
      }
    },
    mounted() {
      setTimeout(() => {
        const display = document.defaultView.getComputedStyle(this.$refs.control[0].$el).display
        this.$set(this.style, "display", display)
      }, 0) 
    }
  }
</script>

