export default {
  functional: true,
  props: {
    datas: {},
    hidden: {},
    parentMiddle: {}
  },
  render(h, context) {
    const self = this
    const loop = (arr) => {
      let temp = []
      temp = arr.reduce((result, data) => {
        let childtemp = []
        if (data.children) {
          childtemp = loop(data.children)
        }
        const {
          action
        } = data.controls
        var base = h(data.wid, {
          props: data.controls.props,
          style: data.controls.style,
          nativeOn: {
            click() {
              context.listeners.changeParent(action.value, true)
            }
          }
        }, childtemp)
        result.push(base)
        if (action) {
          if (action.type === 'xdialog') {
            // 处理弹层
            const dialogData = context.props.hidden.filter(_d => _d.id === action.value)
            const dialog = h(action.type, {
              props: {
                visible: context.parent.middle[action.value]
              },
              on: {
                changeVisible(flag){
                  context.listeners.changeParent(action.value, flag)
                }
              }
            }, loop(dialogData))
            result.push(dialog)
          }
        }
        return result
      }, [])
      return temp
    }
    return loop(context.props.datas)
  }
}
