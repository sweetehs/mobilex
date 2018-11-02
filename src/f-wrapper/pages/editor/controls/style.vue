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
        default(){
          this.radio = ["flex", "block", "inline-block"]
        }
      }, {
        name: "flex值",
        key: "flex",
        value: ""
      }, {
        name: "宽度",
        key: "width",
        value: "auto",
      }, {
        name: "高度",
        key: "height",
        value: "auto",
      }, {
        name: "外边距",
        key: "margin",
        value: ""
      }, {
        name: "内边距",
        key: "padding",
        value: ""
      }, {
        name: "颜色",
        key: "color",
        value: ""
      }, {
        name: "背景颜色",
        key: "background-color",
        value: ""
      }, {
        name: "圆角",
        key: "border-radius",
        value: 0,
      }, {
        name: "对齐",
        key: "text-align",
        value: 'left',
        radio: ["left", "center", "right"]
      }]
      return {
        props: defaultData
      }
    },
    methods: {
      filterForm(list, key, value) {
        let flag = false
        list.forEach((_data) => {
          if (_data.key === "display" && _data.value === value) {
            flag = true
          }
        })
        return flag;
      },
      setDefault() {
        this.props.forEach((_data) => {
          _data.value = _data.default ? _data.default() : ''
        })
      },
      $parseData(bdata) {
        this.setDefault()
        this.props.forEach((_data) => {
          if(_data.key === "flex"){
            if(this.tdata && this.tdata.parentFlex){
              _data.disabled = false
            }else{
              _data.disabled = true
            }
          }
          if(_data.key === "display"){
            if(this.tdata && this.tdata.disabledFlex){
              _data.radio = _data.radio.filter((data)=>data !== "flex")
            }
          }
          let _style = bdata[_data.key]
          if (_style) {
            if (_data.parse) {
              _data.parse(_style)
            } else {
              _data.value = _style
            }
          }
        })
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

