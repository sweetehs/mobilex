<style lang="less">
  .control-style-wrapper {
    .tab {
      margin-bottom: 10px;
      text-align: center;
    }
  }
</style>

<template>
  <div class="control-style-wrapper">
    <div class="tab">
      <el-radio-group v-model="styleIndex">
        <el-radio-button v-for="(item,i) in formlist" :key="i" :label="i">{{item.name}}</el-radio-button>
      </el-radio-group>
    </div>
    <xformall @imgChange="imgChange" :formlist="formlist[styleIndex].children" :props="props||{}" @send="$send" />
  </div>
</template>

<script>
  import {
    clone
  } from "@/util/util"
  import mixin from "@/components/widgets/mixin-control"
  export default {
    mixins: [mixin],
    props: ["tdata"],
    data() {
      const formlist = [{
        name: "基础",
        children: [{
          name: "布局",
          key: "display",
          type: "radio",
          values: ["flex", "block", "inline-block"],
          disabled: false
        }, {
          name: "对齐",
          key: "text-align",
          type: "radio",
          values: ["left", "center", "right"],
          disabled: false
        }, {
          name: "overflow",
          key: "overflow",
          type: "radio",
          values: ["hidden", "auto", "scroll"],
          disabled: false
        }, {
          name: "flex值",
          key: "flex",
          type: "input",
          disabled: false
        }, {
          name: "宽度",
          key: "width",
          type: "input",
          disabled: false
        }, {
          name: "高度",
          key: "height",
          type: "input",
          disabled: false
        }, {
          name: "内边距",
          key: "padding",
          type: "input",
          disabled: false
        }, {
          name: "外边距",
          key: "margin",
          type: "input",
          disabled: false
        }, {
          name: "圆角",
          type: "input",
          key: "border-radius",
          value: 0,
          disabled: false
        }]
      }, {
        name: "定位",
        children: [{
          name: "定位",
          key: "position",
          type: "radio",
          values: ["relative", "absolute", "fixed"],
          disabled: false
        }, {
          name: "left",
          key: "left",
          type: "input",
          disabled: false
        }, {
          name: "top",
          key: "top",
          type: "input",
          disabled: false
        }]
      }, {
        name: "字体",
        children: [{
          name: "字体颜色",
          key: "color",
          type: "input",
          disabled: false
        }, {
          name: "字体大小",
          key: "font-size",
          type: "input",
          disabled: false
        }]
      }, {
        name: "背景",
        children: [{
          name: "背景重复",
          type: "radio",
          key: "background-repeat",
          values: ["repeat", "no-repeat"],
          disabled: false
        }, {
          name: "背景图片",
          type: "upload",
          key: "background-image",
          disabled: false
        }, {
          name: "背景颜色",
          type: "input",
          key: "background-color",
          disabled: false
        }, {
          name: "背景尺寸",
          type: "input",
          key: "background-size",
          disabled: false
        }, {
          name: "背景位置",
          type: "input",
          key: "background-position",
          disabled: false
        }]
      }]
      return {
        styleIndex: 0,
        formlist: formlist,
        props: {}
      }
    },
    methods: {
      $change(props) {
        const {
          position
        } = this.props
        this.formlist.forEach((data) => {
          data.children.forEach((_data) => {
            if (_data.key == "left" || _data.key == "top") {
              let flag = ""
              if (position == "absolute" || position == "fixed") {
                flag = false
              } else {
                flag = true
                this.props[_data.key] = 0
              }
              _data.disabled = flag
            }
          })
        })
      },
      imgChange(size) {
        this.props.width = size.width + "px"
        this.props.height = size.height + "px"
      }
    }
  }
</script>

