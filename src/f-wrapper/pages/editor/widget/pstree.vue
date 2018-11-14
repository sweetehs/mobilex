<style lang="less">
  .ps-tree-wrapper {
    // @fontColor: rgb(221, 221, 221);
    @fontColor: #b6b6b6;
    color: @fontColor;
    font-size: 12px;
    .fa{
      width: 14px;
      text-align: center;
    }
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
      .fa-lock {
        color: #888;
      }
      .btn-lock {
        display: inline-block;
        width: 12px;
        &.hidden {
          visibility: hidden;
        }
      }
      .fa.active{
        color: #409EFF!important;
        font-size: 14px;
      }
      .fa-book {
        color: #888;
        width: 12px;
        display: inline-block;
        &.hidden {
          visibility: hidden;
        }
      }
      .btn-open {
        display: inline-block;
        width: 12px;
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
            margin-right: 4px;
          }
        }
      }
    }
  }
</style>

<template>
  <div class="ps-tree-wrapper">
    <ul :class="{root: index === 1}">
      <li @click="setCurrent($event,item)" v-for="item in datas" :key="item.id" :class="{
                  active:(currentWidget && item.id === currentWidget.id),
                  'is-copy': (copyWidget && item.id === copyWidget.id),
                  'is-cut': (cutWidget && item.id === cutWidget.id),
                }">
        <div draggable="true" @dragstart="dragStart(item)" @drop="drop(item)" @dragover='allowDrop($event)' class="tree-item" :class="{folder:item.children}">
          <div :style="{'paddingLeft': (index === 1 ? 25 : index*25)+'px'}">
            <a class="fa btn-lock" :class="{
              'fa-lock': item.base.isLock,
              'fa-unlock': !item.base.isLock,
              'hidden': !item.isWrapper
            }" @click="eventToggleLock($event, item)"></a>
            <span v-if="item.children" class="fa btn-open" :class="{
              'fa-folder': item.children,
              'fa-folder-open': openlist.indexOf(item.id) !== -1
            }" @click="eventOpen($event,item)"></span>
            <span v-else class="fa" :class="getIcon(item.wid)"></span>
            <span @dblclick="eventEditName(item)" class="fn-mr10">{{item.name}}</span>
            <!--会双向绑定直接修改值，没通过vuex-->
            <input v-if="item.id == currentWidget.id && isEdit" type="text" v-model="item.label" @blur="eventSetLabelName(item)">
            <span v-else>{{item.label}}</span>
          </div>
          <div class="action">
            <a v-if="item.isWrapper && ((copyWidget && copyWidget.id !== item.id)||(cutWidget && cutWidget.id !== item.id))" class="fa fa-paste" href="javascript:;" @click="eventPasteItem(item)"></a>
            <a class="fa fa-book" :class="{
              'active': item.ajax && item.ajax.flag,
              'hidden': !item.isWrapper
            }" @click="eventSetAjax(item)"></a>
            <a :class="{
              active: copyWidget && copyWidget.id == item.id
            }" class="fa fa-copy" href="javascript:;" @click="eventCopyItem(item)"></a>
            <a :class="{
              active: cutWidget && cutWidget.id == item.id
            }" class="fa fa-cut" href="javascript:;" @click="eventCutItem(item)"></a>
            <a class="fa fa-close" href="javascript:;" @click="eventDeleteItem($event, item)"></a>
          </div>
        </div>
        <treewrapper @setAjax="eventSetAjax(item)" :index="index+1" v-if="(item.children && item.children.length !== 0) && openlist.indexOf(item.id) !== -1" :datas="item.children" />
      </li>
    </ul>
  </div>
</template>

<script>
  import {
    randomId
  } from "@/util/util"
  export default {
    name: "treewrapper",
    props: ["index", "datas"],
    data() {
      return {
        id: randomId(),
        isEdit: false
      }
    },
    computed: {
      currentWidget() {
        return this.$store.state.$widget.currentWidget
      },
      copyWidget() {
        return this.$store.state.$widget.currentCopy
      },
      cutWidget() {
        return this.$store.state.$widget.currentCut
      },
      openlist() {
        return this.$store.state.$widget.openlist
      }
    },
    methods: {
      getIcon(type){
        if(type == "ximage"){
          return "fa-image"
        }else if(type == "xtext"){
          return "fa-text-width"
        }else if(type == "xbutton"){
          return "fa-hand-pointer-o"
        }else if(type == "xform"){
          return "fa-wpforms"
        } 
        return "fa-file"
      },
      setCurrent(e, data) {
        this.$store.dispatch("$widget/setCur", data.id)
        e.stopPropagation()
      },
      eventToggleLock(e, data) {
        this.$store.dispatch("$widget/setLock", data.id).then(() => {
          if (data.base.isLock) {
            this.$store.dispatch("$widget/setCur")
            this.$store.dispatch("$widget/closeFolder", data.id)
          }
        })
      },
      eventOpen(e, data) {
        if (data.base.isLock) {
          return
        }
        if(this.openlist.indexOf(data.id) !== -1){
          this.$store.dispatch("$widget/closeFolder", data.id)
        }else{
          this.$store.dispatch("$widget/openFolder", data.id)
        }
        e.stopPropagation()
      },
      eventEditName(item) {
        this.isEdit = true
      },
      eventSetLabelName() {
        this.isEdit = false
      },
      eventDeleteItem(e, data) {
        this.$store.dispatch("$widget/deletei", data.id)
        e.stopPropagation()
      },
      eventPasteItem(data) {
        this.$store.dispatch("$widget/setPaste", data.id)
      },
      eventSetAjax(data) {
        this.$emit("setAjax", data)
      },
      dragStart(item) {
        this.$store.dispatch("$widget/setDrag", {
          groupId: this.id,
          id: item.id
        })
      },
      drop(item) {
        const {
          currentDrag
        } = this.$store.state.$widget
        if (this.id === currentDrag.groupId) {
          // 交换两个元素
          this.$store.dispatch("$widget/exchange", {
            id1: item.id,
            id2: currentDrag.id
          })
        }
      },
      allowDrop(e) {
        event.dataTransfer.dropEffect = "move"
        e.preventDefault()
      },
      eventCopyItem(data) {
        this.$store.dispatch("$widget/setCopy", data.id)
      },
      eventCutItem(data) {
        this.$store.dispatch("$widget/setCut", data.id)
      }
    }
  }
</script>

