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
    currentId: {}
  },
  render(h, context) {
    const loop = (arr) => {
      let temp = []
      temp = arr.map((data) => {
        let childtemp = []
        if (data.children) {
          childtemp = loop(data.children)
        }
        return h(control, {
          class: {
            active: data.id === context.props.currentId
          },
          props:{
            id: data.id
          }
        }, [h(data.wid, {
          style: data.controls.style
        }, childtemp)])
      })
      return temp
    }
    return loop(context.props.datas)
  }
}
