import mockData from "../f-wrapper/store/mock"

import Vue from "vue"
import widgetlist from "@/components/widgets/list-elements"
const setGlobalComponents = () => {
  widgetlist.forEach((_c) => {
    Vue.component(_c.wid, _c.component)
  });
}
setGlobalComponents()
export default {
  functional: true,
  render(h) {
    const loop = (arr) => {
      let temp = []
      temp = arr.map((data) => {
        let childtemp = []
        if (data.children) {
          childtemp = loop(data.children)
        }
        return h(data.wid, {
          props: data.controls.props,
          style: data.controls.style
        }, childtemp)
      })
      return temp
    }
    return loop(mockData.datas)
  }
}