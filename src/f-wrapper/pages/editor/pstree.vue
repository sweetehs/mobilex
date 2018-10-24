<style lang="less">
  .ps-tree-wrapper {
    @fontColor: rgb(221, 221, 221);
    color: @fontColor;
    font-size: 12px;
    ul {
      &.root {
        padding-left: 0;
      }
    }
    li {
      &:hover {
        cursor: default;
      }
      &.active {
        color: #fff;
        >.tree-item {
          background: rgb(107, 107, 107);
          &>.action a {
            color: #fff;
          }
        }
      }
      .tree-item {
        border-bottom: 1px solid rgb(69, 69, 69);
        line-height: 30px;
        display: flex;
        justify-content: space-between;
        &.folder {
          line-height: 30px;
        }
        .action {
          margin-right: 10px;
          a {
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
          root: index === 1
        }">
      <li @click="setCurrent($event,item)" v-for="item in datas" :key="item.id" :class="{
        active:(currentWidget && item.id === currentWidget.id),
        'is-copy': (copyWidget && item.id === copyWidget.id)
      }">
        <div class="tree-item" :class="{folder:item.children}">
          <div class="name" :style="{
              'paddingLeft': (index === 1 ? 10 : index*15)+'px'
            }">
            <span class="fa" :class="{
              'fa-folder': item.children,
              'fa-file': !item.children,
              'fa-folder-open': isOpens.indexOf(item.id) !== -1
            }" @click="eventOpen($event,item)"></span>
            <span>{{item.name}}</span>
          </div>
          <div class="action">
            <a v-if="copyWidget && item.isWrapper && copyWidget.id !== item.id" class="fa fa-paste" href="javascript:;" @click="eventPasteItem(item)"></a>
            <a class="fa fa-copy" href="javascript:;" @click="eventCopyItem(item)"></a>
            <a class="fa fa-cut" href="javascript:;" @click="eventCutItem(item)"></a>
            <a class="fa fa-close" href="javascript:;" @click="eventDeleteItem($event, item)"></a>
          </div>
        </div>
        <treewrapper :index="index+1" v-if="(item.children && item.children.length !== 0) && isOpens.indexOf(item.id) !== -1" :datas="item.children" />
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "treewrapper",
    props: ["index", "datas"],
    data() {
      return {
        isOpens: []
      }
    },
    computed: {
      currentWidget(){
        return this.$store.state.$widget.currentWidget
      },
      copyWidget(){
        return this.$store.state.$widget.currentCopy
      }
    },
    methods: {
      setCurrent(e, data) {
        this.$store.dispatch("$widget/setCur", data.id)
        e.stopPropagation()
      },
      eventOpen(e, data) {
        let index = this.isOpens.indexOf(data.id)
        if (index !== -1) {
          this.isOpens.splice(index, 1)
        } else {
          this.isOpens.push(data.id)
        }
        e.stopPropagation()
      },
      eventDeleteItem(e, data) {
        this.$store.dispatch("$widget/deletei", data.id)
        e.stopPropagation()
      },
      eventCopyItem(data) {
        this.$store.dispatch("$widget/setCopy", data.id)
      },
      eventPasteItem(data){
        this.$store.dispatch("$widget/setPaste", data.id)
      },
      eventCutItem(data){}
    }
  }
</script>

