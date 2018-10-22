<style lang="less">
  .ps-tree-wrapper {
    li {
      line-height: 30px;
      padding-left: 10px;
      &:hover{
        cursor: pointer;
      }
      &.root{
        padding-left: 0;
      }
      >.name{
        padding-left: 10px;
      }
      &.active {
        background: #48D1CC;
        color: #fff;
      }
      &:not(:last-child) {
        border-bottom: 1px solid #abc;
      }
    }
  }
</style>

<template>
  <div class="ps-tree-wrapper">
    <ul>
      <li @click="setCurrent($event,item)" v-for="item in datas" :key="item.id" 
        :class="{active:(activedata && item.id === activedata.id),root:isFirst}">
        <div class="name">{{item.name}}</div>
        <treewrapper v-if="item.children && item.children.length !== 0" :datas="item.children" :activedata="activedata"/>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "treewrapper",
    props: ["isFirst","datas", "activedata"],
    methods: {
      setCurrent(e, data) {
        this.$store.dispatch("$widget/setCur", data.id)
        e.stopPropagation()
      }
    }
  }
</script>

