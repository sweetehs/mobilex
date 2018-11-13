import { clone, handelCssData } from "@/util/util"
import control from "./control"
export default {
  functional: true,
  components: {
    control
  },
  props: {
    datas: {
      type: Array
    },
    currentId: {},
    copyId: {},
    cutId: {},
    isDialog: {},
    position: {}
  },
  render(h, context) {
    const loop = (arr, index) => {
      index++
      let temp = []
      temp = arr.reduce((result, _data) => {
        const data = clone(_data)
        let childtemp = []
        if (data.children) {
          childtemp = loop(data.children, index)
        }
        if (index === 1 && context.props.isDialog) {
          result.push(h("div", {
            style: {
              height: "30px",
              lineHeight: "30px",
              borderBottom: "2px solid #409EFF",
              margin: "10px 0",
              textAlign: "center"
            }
          }, "弹层"))
        }
        result.push(h(control, {
          class: {
            "active": data.id === context.props.currentId,
              "is-copy": data.id === context.props.copyId,
              "is-cut": data.id === context.props.cutId
          },
          props: {
            id: data.id,
            base: data.base,
            position: data.style.position
          },
          style: handelCssData(data.style)
        }, [h(data.wid, {
          style: {
            // 个别样式要放在元素本上上
            "border-radius": data.style["border-radius"],
            "height": data.style["height"],
            "width": data.style["width"]
          },
          props: {
            ...data.props,
            style: data.style
          }
        }, childtemp)]))
        return result
      }, [])
      return temp
    }
    return loop(context.props.datas, 0)
  }
}
