<style lang="less">
  .editor-main-wrapper {
    height: 100%;
    display: flex;
    >div:not(.editor-wrapper) {
      flex: 1;
    }
    .editor-wrapper {
      width: 400px;
      flex-shrink: 0;
      background: #eee;
      display: flex;
      align-items: center;
      justify-content: center;
      .editor-inner {
        background: #aaa;
        width: 375px;
        height: 614px;
      }
      iframe {
        height: 100%;
        width: 100%;
      }
    }
  }
</style>

<template>
  <div class="editor-main-wrapper">
    <div class="widgets-wrapper">
      <ul>
        <li v-for="(item,i) in widgetnav" :key="i" @click="eventAddWidget(item)">{{item.name}}</li>
      </ul>
    </div>
    <div class="editor-wrapper">
      <div class="editor-inner">
        <iframe ref="editor" src="/?inner=true" frameborder="0"></iframe>
      </div>
    </div>
    <div class="controls-wrapper">
      <Controls @change="peventUpdateById" @changeBase="peventUpdateBase" />
    </div>
  </div>
</template>

<script>
  import Controls from "./controls"
  import postMessage from "@/util/postMessage"
  import {
    clone,
    randomId
  } from "@/util/util.js"
  export default {
    components: {
      Controls
    },
    data() {
      return {
        widgetnav: [],
        curwidget: {
          name: "",
          wid: "",
          id: "",
          controls: {
            style: {},
            props: {}
          }
        }
      }
    },
    mounted() {
      this.$source = new postMessage(this.$refs.editor.contentWindow, window)
      // 获取左侧菜单列表
      this.$source.receive('widgetnav', (widgetnav) => {
        this.widgetnav = widgetnav
      })
      // 得到当前widgetcontrol
      this.$source.receive('widgetcontrol', (id) => {
        this.$store.dispatch("$widget/setCur", id)
      })
      setTimeout(() => {
        this.postWidgetListSend()
      }, 1000)
    },
    methods: {
      postWidgetListSend() {
        // 发送list数据内部显示
        this.$source.send("widgetlist", this.$store.state.$widget.widget)
      },
      eventAddWidget(widget) {
        // 增加一个组件
        let newWidget = Object.assign({
          id: randomId(),
          controls: {
            style: {},
            props: {}
          }
        }, clone(widget))
        this.$store.dispatch("$widget/add", newWidget).then(() => {
          this.postWidgetListSend()
        })
      },
      peventUpdateById(data) {
        this.$store.dispatch("$widget/update", data).then(() => {
          this.postWidgetListSend()
        })
      },
      peventUpdateBase(data) {
        this.$store.dispatch("$widget/updateBase", data)
      }
    }
  }
</script>

