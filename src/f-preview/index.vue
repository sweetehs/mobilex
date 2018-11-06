<style>
  .preview-wrapper {
    height: 100%;
    box-sizing: border-box;
    font-size: 0.28rem;
  }
</style>

<template>
  <div class="preview-wrapper" :style="style">
    <previewinner v-if="loadView" :datas="datas" @changeParent="changeData" />
    <!-- <previewinner :datas="hidden" @changeParent="changeData" type="xdialog" /> -->
  </div>
</template>

<script>
  import previewinner from "./index.js"
  import axios from "axios"
  import Vue from "vue"
  import widgetlistcommon from "@/components/widgets/list-elements-common"
  import widgetlist from "@/components/widgets/list-elements"
  import rem from "@/util/rem"
  import {
    parseToRem,
    handelCssData,
    loop,
    clone
  } from "@/util/util"
  const setGlobalComponents = () => {
    widgetlist.forEach((data) => {
      data.list.map((_c)=>{
        Vue.component(_c.wid, _c.component)
      })
    });
  }
  setGlobalComponents()
  export default {
    mixins: [widgetlistcommon],
    components: {
      previewinner
    },
    data() {
      return {
        loadView: false,
        ajaxList: {},
        style: {},
        datas: [],
        hidden: [],
        middle: {}
      }
    },
    mounted() {
      rem(750)
      axios({
        url: "/mobilex/subject/get",
        params: {
          id: "5bd29730e3cd3d3c7387b36d"
        }
      }).then((ajaxData) => {
        const allData = JSON.parse(ajaxData.data.data)
  
        let datas = allData.datas
        parseToRem(datas)
        this.datas = datas
  
        const hidden = allData.hidden
        parseToRem(hidden)
        this.hidden = hidden
  
        this.style = handelCssData(allData.base.style)
        // 收集所有的ajax函数
        const promise = []
        loop(datas, () => true, (data) => {
          if (data.ajax.flag == true) {
            promise.push(axios({
              url: data.ajax.url
            }).then((ajaxData) => {
              this.ajaxList[data.id] = ajaxData.data
            }))
          }
        })
        Promise.all(promise).then(() => {
          // 设置props
          let tempDatas = []
          let tempParent = {}
          loop(datas, () => true, (data, index, arr, parent) => {
            // 需要重新生成一个树
            if (data.ajax.flag) {
              if (data.ajax.repeat) {
                // flag = false
                const ajaxData = this.ajaxList[data.id]
                const list = ajaxData.map((_data) => {
                  const widget = clone(data)
                  // 查找有ajax的元素
                  loop(widget.children, (_d) => _d.ajax && _d.ajax.id == data.id, (_child) => {
                    _child.props[_child.ajaxkey] = _data[_child.key]
                  })
                  return widget
                })
                if (parent && parent.children) {
                  Array.prototype.splice.apply(tempParent.children, [tempParent.children.length, 0].concat(list))
                } else {
                  // 如果没有父元素 则需要删除原来的项数，在增加几项
                  Array.prototype.splice.apply(tempDatas, [tempDatas.length, 0].concat(list))
                }
                // 子元素不在进行遍历
                return false
              }
            } else {
              if (parent && parent.children) {
                tempParent.children.push(clone(data))
              } else {
                tempParent = clone(arr[index])
                tempParent.children = []
                tempDatas.splice(tempDatas.length, 0, tempParent)
              }
            }
            this.datas = tempDatas
            // if (data.ajaxkey && data.ajax.id) {
            //   const ajaxData = this.ajaxList[data.ajax.id]
            //   data.props[data.ajaxkey] = ajaxData[data.key]
            // }
          })
          setTimeout(() => {
            this.loadView = true
            console.log(clone(this.datas))
          }, 1000)
        })
        // 需要注册弹出层的数据
        this.hidden.forEach((_d) => {
          this.$set(this.middle, _d.id, false)
        })
      })
    },
    methods: {
      changeData(key, value) {
        this.middle[key] = value
      }
    }
  }
</script>

