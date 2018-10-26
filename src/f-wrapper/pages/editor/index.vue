<style lang="less">
  .editor-main-wrapper {
    color: #ddd;
    height: 100%;
    display: flex;
    a{
      color: #ddd;
    }
    .action-wrapper,
    .controls-wrapper {
      background: rgb(77, 77, 77);
      flex: 1;
      min-width: 300px;
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
        }
        >div {
          flex: 1;
          overflow: auto;
        }
      }
      .ps-wrapper {
        .tree-root {
          color: rgb(221, 221, 221);
          line-height: 35px;
          height: 35px;
          border-bottom: 1px solid rgb(69, 69, 69);
          padding-left: 10px;
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          &.active {
            background: rgb(107, 107, 107);
            color: #fff;
            a {
              color: #fff;
            }
          }
          a {
            margin-right: 10px;
            color: #fff;
            margin-top: 12px;
            font-size: 14px;
          }
        }
      }
      .nav-wrapper {
        ul {
          li {
            // line-height: 40px;
            display: inline-block;
            padding: 10px 10px;
            background: rgb(107, 107, 107);
            color: rgb(221, 221, 221);
            margin-right: 10px;
            border-radius: 4px;
            margin-top: 10px;
            &:hover {
              cursor: pointer;
            }
            &.disabled {
              background: rgb(83, 83, 83);
              color: rgb(130, 130, 130);
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
      background: rgb(40, 40, 40);
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
        </header>
        <div>
          <header class="tree-root" :class="{active:currentWidget===''}" @click="setRoot">
            <div>
              <span class="fa fa-folder-open"></span> ROOT
            </div>
            <div class="action">
              <a v-if="copyWidget" class="fa fa-paste" href="javascript:;" @click="eventPaste"></a>
            </div>
          </header>
          <Pstree :index="1" :datas="widgetList" />
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
        <Ioswrapper @save="peventSave">
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
  import axios from "axios"
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
    created(){
      axios({
        url: "/mobilex/subject/get",
        params: {
          id: "5bd29730e3cd3d3c7387b36d"
        }
      }).then((ajaxData)=>{
        this.$store.dispatch("$widget/setAll",JSON.parse(ajaxData.data.data))
      })
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
      copyWidget() {
        return this.$store.state.$widget.currentCopy
      },
      currentIsWrapper() {
        return this.currentWidget.isWrapper || this.currentWidget === ""
      },
      widgetList() {
        return this.$store.state.$widget.widget.datas
      }
    },
    watch: {
      currentWidget() {
        // 当前current改变的时候通知内部
        this.$source.send("widgetcurrent", clone(this.currentWidget))
      },
      copyWidget() {
        this.$source.send("widgetcopy", clone(this.copyWidget))
      },
      widgetList:{
        deep: true,
        handler(){
          this.postWidgetListSend()
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
      setRoot() {
        this.$store.dispatch("$widget/setCur", "")
        this.$store.dispatch("$widget/setCopy", "")
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
      eventPaste(e) {
        this.$store.dispatch("$widget/setPaste")
        e.stopPropagation()
      },
      peventUpdateById(data) {
        this.$store.dispatch("$widget/update", data).then(() => {
          this.postWidgetListSend()
        })
      },
      peventUpdateBase(data) {
        this.$store.dispatch("$widget/updateBase", data)
      },
      peventSave(){
        axios({
        url: "/mobilex/subject/update",
        method: "post",
        data: {
          id: "5bd29730e3cd3d3c7387b36d",
          subject: JSON.stringify(this.$store.state.$widget.widget)
        }
      }).then((ajaxData)=>{
        this.$message.success("保存成功")
      })
      }
    }
  }
</script>

