import {
  clone,
  compare,
  extendDeep
} from "@/util/util"
export default {
  namespaced: true,
  state: {
    widget: {
      base: {
        name: "测试专题"
      },
      datas: [{
        name: "布局",
        wid: "layout",
        id: "id294859",
        controls: {
          style: {
            margin: "0 0 0 0",
            padding: "10px 10px 10px 10px",
            color: "#abcdef",
            'background-color': "#000",
            'border-radius': "10px"
          },
          props: {}
        }
      }, {
        name: "按钮",
        wid: "xbutton",
        id: "id234859",
        controls: {
          style: {
            margin: "10px 10px 10px 10px",
            color: "#abcdef",
            'background-color': "#000",
          },
          props: {}
        }
      }]
    },
    currentWidget: ""
  },
  mutations: {
    add(state, widget) {
      state.widget.datas.push(widget)
    },
    setCur(state, id) {
      state.currentWidget = clone(state.widget.datas.find((_data) => _data.id == id))
    },
    update(state, data) {
      let getData = state.widget.datas.find((_data) => _data.id == state.currentWidget.id)
      // 为了防止死循环，比较数据是否相等
      if (!compare(data, getData)) {
        extendDeep(data, getData)
      }
    },
    updateBase(state, data) {
      // 为了防止死循环，比较数据是否相等
      if (JSON.stringify(state.widget.base) !== JSON.stringify(data.base)) {
        Object.assign(state.widget, data)
      }
    }
  },
  actions: {
    add(context, widget) {
      context.commit('add', widget)
    },
    setCur(context, id) {
      context.commit('setCur', id)
    },
    update(context, data) {
      context.commit('update', data)
    },
    updateBase(context, data) {
      context.commit('updateBase', data)
    }
  }
}
