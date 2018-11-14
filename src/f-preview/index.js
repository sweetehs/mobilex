import {
  clone,
  handelCssData
} from "@/util/util"
export default {
  functional: true,
  props: {
    datas: {},
    hidden: {},
    parentMiddle: {},
    type: {}
  },
  render(h, context) {
    const loop = (arr) => {
      let temp = []
      temp = arr.reduce((result, data) => {
        let childtemp = []
        if (data.children) {
          childtemp = loop(data.children)
        }
        const {
          action
        } = data
        const className = {}
        className[`x${data.id}`] = true
        var base = h(data.wid, {
          props: data.props,
          class: className,
          nativeOn: {
            click() {
              if (action && action.type === 'xdialog') {
                context.listeners.changeParent(action.xdialog.id, true)
              }
            }
          }
        }, childtemp)
        if (data.action.type === 'xlink') {
          base = h('xlink', {
            props: data.action.xlink
          }, [base])
        }
        base.xid = data.id
        result.push(base)
        return result
      }, [])
      return temp
    }
    const base = loop(clone(context.props.datas)).map((_data, index) => {
      if (context.props.type === "xdialog") {
        return h('xdialog', {
          props: {
            visible: context.parent.middle[_data.xid]
          },
          on: {
            changeVisible(flag) {
              context.listeners.changeParent(_data.xid, flag)
            }
          }
        }, [_data])
      } else {
        return _data
      }
    })
    return base
  }
}
