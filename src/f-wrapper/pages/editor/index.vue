<style lang="less">
  .editor-main-wrapper {
    height: 100%;
    display: flex;
    .ps-wrapper,.widgets-nav-wrapper{
      width: 200px;
      flex: none;
    }
    .editor-wrapper {
      flex: none;
      width: 500px;
      flex-shrink: 0;
      background: #eee;
      display: flex;
      align-items: center;
      justify-content: center;
      iframe {
        height: 100%;
        width: 375px;
        height: 614px;
      }
    }
    .controls-wrapper{
      flex: 1;
    }
  }
</style>

<template>
  <div class="editor-main-wrapper">
    <div class="widgets-nav-wrapper">
      <ul>
        <li v-for="(item,i) in widgetnav" :key="i" @click="eventAddWidget(item)">{{item.name}}</li>
      </ul>
    </div>
    <div class="ps-wrapper">
      <Pstree :isFirst="true" :datas="$store.state.$widget.widget.datas" :activedata="$store.state.$widget.currentWidget" />
    </div>
    <div class="editor-wrapper">
      <div class="editor-inner">
        <Ioswrapper>
          <iframe ref="editor" src="/?inner=true" frameborder="0"></iframe>
        </Ioswrapper>
      </div>
    </div>
    <div class="controls-wrapper">
      <Controls @change="peventUpdateById" @changeBase="peventUpdateBase" />
    </div>
  </div>
</template>

<script>
  import postMessage from "@/util/postMessage"
  import Controls from "./controls"
  import Pstree from "./ps-tree"
  import Ioswrapper from "./ios"
  import {
    clone,
    randomId
  } from "@/util/util.js"
  export default {
    components: {
      Controls,
      Ioswrapper,
      Pstree
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
    computed: {
      currentWidget() {
        return this.$store.state.$widget.currentWidget
      }
    },
    watch: {
      currentWidget() {
        // 当前current改变的时候通知内部
        this.$source.send("widgetcurrent", clone(this.currentWidget))
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

