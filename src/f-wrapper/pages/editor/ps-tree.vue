<style lang="less">
  .ps-tree-wrapper {
    li {
      padding-left: 10px;
      line-height: 30px;
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
      <li @click="setCurrent($event,item)" v-for="item in datas" :key="item.id" :class="{active:(activedata && item.id === activedata.id)}">
        <span>{{item.name}}</span>
        <treewrapper v-if="item.children && item.children.length !== 0" :datas="item.children" :activedata="activedata"/>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "treewrapper",
    props: ["datas", "activedata"],
    methods: {
      setCurrent(e, data) {
        debugger
        this.$store.dispatch("$widget/setCur", data.id)
        e.stopPropagation()
      }
    }
  }
</script>

