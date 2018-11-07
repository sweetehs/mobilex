<style lang="less">
  .editor-main-wrapper {
    height: 100%;
    width: 100%;
    display: flex;
    .editor-main-wrapper {
      color: #ddd;
      a {
        color: #ddd;
      }
      .el-textarea {
        textarea {
          height: 200px;
        }
      }
      .el-radio__label {
        color: rgb(221, 221, 221)!important;
      }
      .el-radio {
        margin-right: 10px!important;
      }
      .el-radio+.el-radio {
        margin: 0;
      }
      .el-tabs__item {
        color: rgb(221, 221, 221);
        &:hover {
          color: #fff;
        }
        &.is-active {
          color: #fff;
        }
      }
      .el-form-item__label {
        color: rgb(221, 221, 221)
      }
      .el-dialog {
        color: #333!important;
      }
    }
    .action-wrapper,
    .controls-wrapper {
      background: rgb(77, 77, 77);
      flex: 1;
      min-width: 400px;
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
        header {
          .el-tabs__nav {
            margin-left: 10px;
          }
        }
        ul {
          padding: 0 10px;
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
    .switch-body {
      position: absolute;
      left: -54px;
      .el-tabs__item {
        padding: 0 5px;
      }
    }
  }
</style>

<template>
  <div class="editor-main-wrapper">
    <div class="editor-main-wrapper">
      <div class="action-wrapper">
        <div class="ps-wrapper">
          <header><span>组件层级</span></header>
          <div>
            <header class="tree-root" :class="{active:currentWidget===''}" @click="setRoot">
              <div>
                <span class="fa fa-folder-open"></span> ROOT
              </div>
              <div class="action">
                <a v-if="copyWidget||cutWidget" class="fa fa-paste" href="javascript:;" @click="eventPaste"></a>
              </div>
            </header>
            <Pstree :index="1" :datas="widgetlist" @setAjax="setAjax" />
          </div>
        </div>
        <div class="nav-wrapper">
          <header>
            <el-tabs v-model="widgettab">
              <el-tab-pane v-for="(item,i) in widgetnav" :label="item.name" :name="i+''" :key="i"></el-tab-pane>
            </el-tabs>
          </header>
          <div v-if="widgetnav[widgettab]">
            <ul>
              <li :class="{disabled:disabledAdd}" v-for="(item,i) in widgetnav[widgettab].children" :key="i" @click="eventAddWidget(item)">{{item.name}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="editor-wrapper">
        <div class="editor-inner">
          <Ioswrapper @save="peventSave">
            <div class="switch-body">
              <el-tabs v-model="vsTabIndex" tab-position="left" @tab-click="vsTabChange">
                <el-tab-pane label="显" name="datas"></el-tab-pane>
                <el-tab-pane label="隐" name="hidden"></el-tab-pane>
              </el-tabs>
            </div>
            <iframe ref="editor" src="/inner.html" frameborder="0"></iframe>
          </Ioswrapper>
        </div>
      </div>
      <div class="controls-wrapper">
        <Controls @change="peventUpdateById" @changeBase="peventUpdateBase" />
      </div>
    </div>
    <el-dialog v-if="currentWidget.ajax" title="ajax设置" :visible.sync="ajaxDialog" width="800px">
      <el-form label-width="100px">
        <el-form-item label="url">
          <el-input v-model="currentWidget.ajax.url"></el-input>
        </el-form-item>
        <el-form-item label="repeat">
          <el-radio-group v-model="currentWidget.ajax.repeat">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="设置key">
          <Keytree :index="1" :datas="currentWidget.children" />
        </el-form-item>
      </el-form>
      <div class="action fn-center">
        <el-button type="primary" @click="saveAjax()">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import axios from "axios"
  import postMessage from "@/util/postMessage"
  import Controls from "./controls"
  import Keytree from "./widget/keytree"
  import Pstree from "./widget/pstree"
  import Ioswrapper from "./widget/ios"
  import {
    clone,
    loop,
    randomId
  } from "@/util/util.js"
  export default {
    components: {
      Controls,
      Ioswrapper,
      Pstree,
      Keytree
    },
    created() {
      axios({
        url: "/mobilex/subject/get",
        params: {
          id: "5bd29730e3cd3d3c7387b36d"
        }
      }).then((ajaxData) => {
        console.log(JSON.parse(ajaxData.data.data))
        this.$store.dispatch("$widget/setAll", JSON.parse(ajaxData.data.data))
      })
    },
    data() {
      return {
        widgettab: "0",
        vsTabIndex: "datas",
        widgetnav: [],
        showNav: false,
        ajaxDialog: false,
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
      $widget() {
        return this.$store.state.$widget.widget
      },
      widgetlist() {
        return this.$widget[this.vsTabIndex]
      },
      currentWidget() {
        return this.$store.state.$widget.currentWidget
      },
      copyWidget() {
        return this.$store.state.$widget.currentCopy
      },
      cutWidget() {
        return this.$store.state.$widget.currentCut
      },
      currentIsWrapper() {
        return (this.currentWidget && this.currentWidget.isWrapper) || this.currentWidget === ""
      },
      disabledAdd() {
        return !this.currentIsWrapper || (this.currentWidget && this.currentWidget.base.isLock)
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
      cutWidget() {
        this.$source.send("widgetcut", clone(this.cutWidget))
      },
      widgetlist() {
        this.postWidgetListSend()
      },
      $widget: {
        deep: true,
        handler() {
          this.postWidgetListSend()
        }
      }
    },
    mounted() {
      this.$store.dispatch("$widget/setTab", this.vsTabIndex)
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
      saveAjax() {
        this.$store.dispatch("$widget/setAjax").then(() => {
          this.ajaxDialog = false
        })
      },
      setAjax() {
        // 设置ajax数据
        this.ajaxDialog = true
      },
      vsTabChange(tab) {
        this.$store.dispatch("$widget/setTab", this.vsTabIndex)
      },
      setRoot() {
        this.$store.dispatch("$widget/setCur", "")
        this.$store.dispatch("$widget/setCopy", "")
      },
      postWidgetListSend() {
        // 发送list数据内部显示
        this.$source.send("widgetlist", clone({
          list: this.widgetlist,
          type: this.vsTabIndex,
          base: this.$widget.base
        }))
      },
      eventAddWidget(widget) {
        // 不是wrapper不能增加组件
        if (this.currentWidget == "" || (this.currentIsWrapper && !this.currentWidget.base.isLock)) {
          // 增加一个组件
          const newWidget = clone(widget)
          newWidget.id = randomId()
          loop(newWidget.children, () => true, (data) => {
            data.id = randomId()
          })
          this.$store.dispatch("$widget/add", newWidget)
          return
        }
      },
      eventPaste(e) {
        this.$store.dispatch("$widget/setPaste")
        e.stopPropagation()
      },
      peventUpdateById(data) {
        // 更新数据
        this.$store.dispatch("$widget/update", data).then(() => {
          this.postWidgetListSend()
        })
      },
      peventUpdateBase(data) {
        // 更新基础数据
        this.$store.dispatch("$widget/updateBase", data).then(() => {
          this.postWidgetListSend()
        })
      },
      peventSave() {
        // 报错接口
        console.log(clone(this.$widget))
        axios({
          url: "/mobilex/subject/update",
          method: "post",
          data: {
            id: "5bd29730e3cd3d3c7387b36d",
            subject: JSON.stringify(this.$widget)
          }
        }).then((ajaxData) => {
          this.$message.success("保存成功")
        })
      }
    }
  }
</script>

