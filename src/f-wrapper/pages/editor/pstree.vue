<style lang="less">
  .ps-tree-wrapper {
    @fontColor: rgb(221,221,221);
    color: @fontColor;
    font-size: 12px;
    ul{
      padding-left: 20px;
      &.root{
        padding-left: 0;
      }
    }
    li {
      line-height: 30px;
      &:hover {
        cursor: default;
      }
      &.active {
        background: rgb(107,107,107);
        color: #fff;
        >.tree-item{
          &>.action a{
            color: #fff;
          }
        }
      }
      .name {
        padding-left: 10px;
      }
      .tree-item {
        display: flex;
        justify-content: space-between;
        .action {
          margin-right: 10px;
          a{
            color: @fontColor;
            margin-right: 6px;
          }
        }
      }
    }
  }
</style>

<template>
  <div class="ps-tree-wrapper">
    <ul :class="{
      root: isFirst
    }">
      <li @click="setCurrent($event,item)" v-for="item in datas" :key="item.id" :class="{active:(activedata && item.id === activedata.id)}">
        <div class="tree-item">
          <div class="name">
            <span class="fa" :class="{
              'fa-folder': item.children,
              'fa-file': !item.children,
              'fa-folder-open': isOpens.indexOf(item.id) !== -1
            }" @click="eventOpen($event,item)"></span>
            <span>{{item.name}}</span>
          </div>
          <div class="action">
            <!-- <a href="javascript:;" @add="eventAddItem(item)">添加</a> -->
            <a class="fa fa-copy" href="javascript:;" @click="eventCopyItem(item)"></a>
            <a class="fa fa-close" href="javascript:;" @click="eventDeleteItem($event, item)"></a>
          </div>
        </div>
        <treewrapper v-if="(item.children && item.children.length !== 0) && isOpens.indexOf(item.id) !== -1" :datas="item.children" :activedata="activedata" />
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "treewrapper",
    props: ["isFirst", "datas", "activedata"],
    data(){
      return {
        isOpens: []
      }
    },
    methods: {
      setCurrent(e, data) {
        this.$store.dispatch("$widget/setCur", data.id)
        e.stopPropagation()
      },
      eventOpen(e, data){
        let index = this.isOpens.indexOf(data.id)
        if(index !== -1){
          this.isOpens.splice(index, 1)
        }else{
          this.isOpens.push(data.id)
        }
        e.stopPropagation()
      },
      eventDeleteItem(e, data) {
        this.$store.dispatch("$widget/deletei", data.id)
        e.stopPropagation()
      },
      eventCopyItem(data) {}
    }
  }
</script>

