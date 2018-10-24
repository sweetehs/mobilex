<style lang="less">
  .editor-main-wrapper {
    height: 100%;
    display: flex;
    .action-wrapper,.controls-wrapper {
      background: rgb(77,77,77);
      flex: 1;
      min-width: 200px;
      flex-shrink: 0;
    }
    .action-wrapper {
      // background: rgb(77,77,77);
      display: flex;
      flex-direction: column;
      .nav-wrapper,
      .ps-wrapper {
        flex: 1;
        display: flex;
        flex-direction: column;
        >header {
          text-align: center;
          flex-shrink: 0;
          height: 40px;
          line-height: 40px;
          background: #333;
          color: #fff;
          a {
            float: right;
            margin-right: 10px;
            color: #fff;
          }
        }
        >div{
          flex: 1;
          overflow: auto;
        }
      }
      .nav-wrapper {
        ul {
          li {
            // line-height: 40px;
            display: inline-block;
            padding: 10px 10px;
            background: rgb(107,107,107);
            color: rgb(221,221,221);
            margin-right: 10px;
            border-radius: 4px;
            margin-top: 10px;
            &:hover {
              cursor: pointer;
            }
            &.disabled {
              background: rgb(83,83,83);
              color: rgb(130,130,130);
              &:hover {
                cursor: not-allowed
              }
            }
          }
        }
      }
    }
    .editor-wrapper {
      flex: none;
      width: 500px;
      flex-shrink: 0;
      background: rgb(40,40,40);
      display: flex;
      align-items: center;
      justify-content: center;
      iframe {
        height: 100%;
        width: 375px;
        height: 614px;
      }
    }
  }
</style>

<template>
  <div class="editor-main-wrapper">
    <div class="action-wrapper">
      <div class="ps-wrapper">
        <header>
          <span>组件层级</span>
          <a href="javascript:;" class="btn-add" @click="setRoot">添加</a>
        </header>
        <div>
          <Pstree :isFirst="true" :datas="$store.state.$widget.widget.datas" :activedata="$store.state.$widget.currentWidget" />
        </div>
      </div>
      <div class="nav-wrapper">
        <header>
          <span>组件库</span>
        </header>
        <div>
          <ul>
            <li :class="{disabled:!currentIsWrapper}" v-for="(item,i) in widgetnav" :key="i" @click="eventAddWidget(item)">{{item.name}}</li>
          </ul>
        </div>
      </div>
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
  import Pstree from "./pstree"
  import Ioswrapper from "./ios"
  import "@/assets/less/wrapper-element.less"
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
        showNav: false,
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
      },
      currentIsWrapper() {
        debugger
        return this.currentWidget.isWrapper || this.currentWidget === ""
      },
      widgetList(){
        return this.$store.state.$widget.widget.datas
      }
    },
    watch: {
      currentWidget() {
        // 当前current改变的时候通知内部
        this.$source.send("widgetcurrent", clone(this.currentWidget))
      },
      widgetList(){
        // 当全局数据变化是通知内部组件变化
        this.postWidgetListSend()
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
      setRoot() {
        this.$store.dispatch("$widget/setCur", "")
      },
      postWidgetListSend() {
        // 发送list数据内部显示
        this.$source.send("widgetlist", this.$store.state.$widget.widget)
      },
      eventAddWidget(widget) {
        // 不是wrapper不能增加组件
        if (!this.currentIsWrapper) {
          return
        }
        // 增加一个组件
        let newWidget = Object.assign({
          id: randomId(),
          controls: {
            style: {},
            props: {}
          }
        }, clone(widget))
        this.$store.dispatch("$widget/add", newWidget)
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

