<style lang="less">
  .ps-tree-wrapper {
    li {
      line-height: 40px;
      padding-left: 10px;
      &:hover {
        cursor: default;
      }
      &.root {
        padding-left: 0;
      }
      &.active {
        background: #48D1CC;
        color: #fff;
      }
      .name {
        padding-left: 10px;
      }
      &:not(:last-child) {
        border-bottom: 1px solid #abc;
      }
      .tree-item {
        display: flex;
        justify-content: space-between;
        .action {
          margin-right: 10px;
        }
      }
    }
  }
</style>

<template>
  <div class="ps-tree-wrapper">
    <ul>
      <li @click="setCurrent($event,item)" v-for="item in datas" :key="item.id" :class="{active:(activedata && item.id === activedata.id),root:isFirst}">
        <div class="tree-item">
          <span class="name">{{item.name}}</span>
          <div class="action">
            <!-- <a href="javascript:;" @add="eventAddItem(item)">添加</a> -->
            <a href="javascript:;" @click="eventDeleteItem(item)">删除</a>
            <a href="javascript:;" @click="eventCopyItem(item)">复制</a>
          </div>
        </div>
        <treewrapper v-if="item.children && item.children.length !== 0" :datas="item.children" :activedata="activedata" />
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "treewrapper",
    props: ["isFirst", "datas", "activedata"],
    methods: {
      setCurrent(e, data) {
        this.$store.dispatch("$widget/setCur", data.id)
        e.stopPropagation()
      },
      eventAddItem(data) {},
      eventDeleteItem(data) {},
      eventCopyItem(data) {}
    }
  }
</script>

