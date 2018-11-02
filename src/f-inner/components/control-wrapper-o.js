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
    isDialog: {}
  },
  render(h, context) {
    const loop = (arr, index) => {
      index++
      let temp = []
      temp = arr.reduce((result, data) => {
        let childtemp = []
        // style 处理， control只需要display和flex值得信息
        const {
          display,
          flex
        } = data.controls.style
        let controlStyle = {
          display: display,
          flex: flex || 'none'
        }
        if (data.children) {
          childtemp = loop(data.children, index)
        }
        if (index === 1 && context.props.isDialog) {
          result.push(h("div", {
            style:{
              height: "30px",
              lineHeight: "30px",
              borderBottom: "2px solid #409EFF",
              margin: "10px 0",
              textAlign: "center"
            }
          },"弹层"))
        }
        result.push(h(control, {
          class: {
            active: data.id === context.props.currentId,
              "is-copy": data.id === context.props.copyId
          },
          props: {
            id: data.id
          },
          style: controlStyle
        }, [h(data.wid, {
          style: data.controls.style,
          props: data.controls.props
        }, childtemp)]))
        return result
      }, [])
      return temp
    }
    return loop(context.props.datas, 0)
  }
}
