<style lang="less">
  .xselect-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #f4f5f6;
    border: none;
    border-radius: 0.04rem;
    box-sizing: border-box;
    color: #999;
    height: 0.88rem;
    padding: 0 0.24rem;
    position: relative;
    width: 100%;
    select {
      color: #999;
      width: 100%;
      font-size: 0.28rem;
      opacity: 0;
      position: absolute;
      height: 100%;
      &:focus {
        outline: none;
      }
    }
  }
</style>

<template>
  <div class="xselect-wrapper">
    <div>{{selectvalue || placeholder}}</div>
    <select v-model="selectvalue">
      <option value="">请选择</option>
      <option :value="select" v-for="select in options" :key="select">{{select}}</option>
    </select>
  </div>
</template>

<script>
  export default {
    props: ['value', 'placeholder', "options"],
    data() {
      return {
        selectvalue: this.value
      }
    },
    watch: {
      value() {
        this.selectvalue = this.value
      },
      selectvalue(){
        this.$emit("input", this.selectvalue)
      }
    }
  }
</script>

