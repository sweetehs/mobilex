import {
  clone
} from "@/util/util"
const actionRepeat = {}
export default {
  functional: true,
  props: {
    datas: {},
    hidden: {},
    parentMiddle: {}
  },
  render(h, context) {
    const hidden = clone(context.props.hidden)
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
        if (action) {
          if (action.type === 'xdialog') {
            // 处理弹层
            const dialogData = hidden.filter(_d => _d.id === action.value)
            const dialog = h('xdialog', {
              props: {
                visible: context.parent.middle[action.value]
              },
              on: {
                changeVisible(flag) {
                  context.listeners.changeParent(action.value, flag)
                }
              }
            }, loop(dialogData))
            result.push(dialog)
          }
        }
        var base = h(data.wid, {
          props: data.controls.props,
          style: data.controls.style,
          nativeOn: {
            click() {
              if (action.type === 'xdialog') {
                context.listeners.changeParent(action.value, true)
              }
            }
          }
        }, childtemp)
        result.push(base)
        return result
      }, [])
      return temp
    }
    return loop(clone(context.props.datas))
  }
}
