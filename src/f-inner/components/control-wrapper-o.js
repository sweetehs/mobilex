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
    copyId: {}
  },
  render(h, context) {
    const loop = (arr) => {
      let temp = []
      temp = arr.map((data) => {
        let childtemp = []
        // style 处理， control只需要display和flex值得信息
        const { display, flex } = data.controls.style
        let controlStyle = {
          display: display,
          flex: flex || 'none'
        }
        if (data.children) {
          childtemp = loop(data.children)
        }
        return h(control, {
          class: {
            active: data.id === context.props.currentId,
            "is-copy": data.id === context.props.copyId
          },
          props:{
            id: data.id
          },
          style: controlStyle
        }, [h(data.wid, {
          style: data.controls.style
        }, childtemp)])
      })
      return temp
    }
    return loop(context.props.datas)
  }
}
