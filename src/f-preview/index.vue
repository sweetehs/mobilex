<style>
  .preview-wrapper {
    box-sizing: border-box;
    font-size: 0.28rem;
  }
</style>

<template>
  <div class="preview-wrapper" :style="style">
    <previewinner v-if="loadView" :datas="datas" @changeParent="changeData" />
    <previewinner :datas="hidden" @changeParent="changeData" type="xdialog" />
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
    loopRange,
    clone
  } from "@/util/util"
  const setGlobalComponents = () => {
    widgetlist.forEach((data) => {
      data.children.map((_c) => {
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
          id: location.search.replace("?", "").split("=")[1]
        }
      }).then((ajaxData) => {
        const allData = JSON.parse(ajaxData.data.data)
  
        let datas = allData.datas
        parseToRem(datas)
  
        const hidden = allData.hidden
        parseToRem(hidden)
        this.hidden = hidden
  
        this.style = handelCssData(allData.base.style)
        // 收集所有的ajax函数
        const promise = []
        const ajaxurls = {}
        loop(datas, () => true, (data) => {
          if (data.ajax.flag == true) {
            const ajaxurl = data.ajax.url
            if (!ajaxurls[ajaxurl]) {
              ajaxurls[ajaxurl] = true
              // url判断是否已经请求过
              promise.push(axios({
                url: ajaxurl
              }).then((ajaxData) => {
                this.ajaxList[ajaxurl] = ajaxData.data
              }))
            }
          }
        })
        Promise.all(promise).then(() => {
          // 设置props
          let tempDatas = []
          let newParent = {}
          loop(datas, () => true, (data, index, arr, parent) => {
            // 需要重新生成一个树
            if (data.ajax.flag) {
              if (data.ajax.repeat) {
                // 根据url获取得到的数据
                const ajaxData = this.ajaxList[data.ajax.url]
                const list = ajaxData.map((_data) => {
                  const widget = clone(data)
                  // 查找有ajax的元素
                  loop(widget.children, (_d) => _d.ajax && _d.ajax.id == data.id, (_child) => {
                    _child.props[_child.ajaxkey] = _data[_child.key]
                  })
                  return widget
                })
                if (parent && parent.children) {
                  Array.prototype.splice.apply(parent.newParent.children, [parent.newParent.children.length, 0].concat(list))
                } else {
                  // 如果没有父元素 则需要删除原来的项数，在增加几项
                  Array.prototype.splice.apply(tempDatas, [tempDatas.length, 0].concat(list))
                }
                // 子元素不在进行遍历
                return false
              }
            } else {
              const newData = clone(data)
              newData.children = []
              if (parent && parent.children) {
                parent.newParent.children.push(newData)
                if (data.children) {
                  data.newParent = newData
                }
              } else {
                tempDatas.splice(tempDatas.length, 0, newData)
                data.newParent = newData
              }
            }
  
          })
          this.datas = tempDatas
          this.loadView = true
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

