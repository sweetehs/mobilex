<template>
  <div class="control-style-wrapper">
    <el-form>
      <el-form-item v-for="(item,i) in list" :key="i" :label="item.name">
        <span class="fn-mr5" v-for="(item1,j) in item.values" :key="j">
                              <el-input v-model="item1.value" class="small"></el-input>px
                            </span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {
    clone
  } from "@/util/util"
  export default {
    props: ["styledata"],
    data() {
      return {
        list: [{
          name: "内边距",
          key: "margin",
          values: [{
            name: "左",
            value: 0
          }, {
            name: "上",
            value: 0
          }, {
            name: "右",
            value: 0
          }, {
            name: "下",
            value: 0
          }],
          default () {
            this.values.map((_data) => {
              _data.value = 0
            })
          },
          parse(text) {
            var values = text.split(" ")
            this.values.forEach((_data, i) => {
              _data.value = values[i].replace("px", "")
            })
          },
          reverse() {
            return this.values.map(_data => _data.value + "px").join(" ")
          }
        }]
      }
    },
    created() {
      this.parseData()
    },
    watch: {
      styledata: {
        deep: true,
        handler() {
          this.parseData()
        }
      },
      list: {
        deep: true,
        handler() {
          this.$emit("change", {
            style: this.reverseData()
          })
        }
      }
    },
    methods: {
      parseData() {
        this.list.forEach((_data) => {
          let _style = this.styledata[_data.key]
          if (_style) {
            if (_data.parse) {
              _data.parse(_style)
            }
          } else {
            _data.default()
          }
        })
      },
      reverseData() {
        return this.list.reduce((_data, next) => {
          if (next.reverse) {
            _data[next.key] = next.reverse()
          }
          return _data
        }, {})
      }
    }
  }
</script>

