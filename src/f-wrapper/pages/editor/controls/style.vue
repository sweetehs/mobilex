<template>
  <div class="control-style-wrapper">
    <el-form>
      <!--需要特殊处理-->
      <el-form-item v-if="!item.disabled" v-for="(item,i) in props" :key="i" :label="item.name" label-width="80px">
        <el-input v-if="!item.radio" v-model="item.value"></el-input>
        <el-radio-group v-if="item.radio" v-model="item.value">
          <el-radio :label="r" v-for="r in item.radio" :key="r">{{r}}</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
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
      const that = this
      const defaultData = [{
        name: "布局",
        key: "display",
        value: "",
        radio: ["flex", "block", "inline-block"],
        disabled: false
      }, {
        name: "flex值",
        key: "flex",
        value: "",
        disabled: false
      }, {
        name: "定位",
        key: "position",
        value: "",
        radio: ["relative", "absolute", "fixed"],
        disabled: false
      }, {
        name: "left",
        key: "left",
        value: "",
        disabled: false
      }, {
        name: "right",
        key: "right",
        value: "",
        disabled: false
      }, {
        name: "宽度",
        key: "width",
        value: "auto",
        disabled: false
      }, {
        name: "高度",
        key: "height",
        value: "auto",
        disabled: false
      }, {
        name: "外边距",
        key: "margin",
        value: "",
        disabled: false
      }, {
        name: "内边距",
        key: "padding",
        value: "",
        disabled: false
      }, {
        name: "颜色",
        key: "color",
        value: "",
        disabled: false
      }, {
        name: "背景颜色",
        key: "background-color",
        value: "",
        disabled: false
      }, {
        name: "圆角",
        key: "border-radius",
        value: 0,
        disabled: false
      }, {
        name: "对齐",
        key: "text-align",
        value: 'left',
        radio: ["left", "center", "right"],
        disabled: false
      }]
      return {
        props: defaultData
      }
    },
    methods: {
      getItem(key) {
        return this.props.find(d => d.key === key)
      },
      $change() {
        const position = this.getItem("position")
        this.props.forEach((_data) => {
          if (_data.key == "left" || _data.key == "right") {
            let flag = ""
            if (position.value == "absolute" || position.value == "fixed") {
              flag = false
            } else {
              flag = true
              _data.value = ""
            }
            _data.disabled = flag
          }
        })
      },
      $parseData(bdata) {
        const defaultData = this.props.map((_data) => {
          _data.value = ""
          return clone(_data)
        })
        defaultData.forEach((_data) => {
          if (_data.key === "flex") {
            if (this.tdata && this.tdata.parentFlex) {
              _data.disabled = false
            } else {
              _data.disabled = true
            }
          }
          if (_data.key === "display") {
            if (this.tdata && this.tdata.disabledFlex) {
              _data.radio = _data.radio.filter((data) => data !== "flex")
            }
          }
          _data.value = bdata[_data.key]
        })
        return defaultData
      },
      $reverseData() {
        return this.props.reduce((_data, next) => {
          if (next.reverse) {
            _data[next.key] = next.reverse()
          } else {
            _data[next.key] = next.value
          }
          return _data
        }, {})
      }
    }
  }
</script>

