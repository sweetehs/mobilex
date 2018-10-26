import Vue from "vue"
import {
  clone,
  compare,
  extendDeep,
  loop,
  randomId
} from "@/util/util"
import mockData from "./mock"
export default {
  namespaced: true,
  state: {
    widget: [], // 数据列表
    currentWidget: "", // 当前选中的数据
    currentCopy: "", // 当前复制的数据
    currentDrag: "" // 当前拖拽的组ID
  },
  mutations: {
    setAll(state, data) {
      state.widget = data
    },
    add(state, widget) {
      if (state.currentWidget && state.currentWidget.isWrapper) {
        let getData = ""
        loop(state.widget.datas, (data) => {
          return data.id === state.currentWidget.id
        }, (data) => {
          getData = data
        })
        getData.children.push(widget)
        state.widget.datas = clone(state.widget.datas)
      } else {
        state.widget.datas.push(widget)
      }
    },
    setCur(state, id) {
      if (id) {
        loop(state.widget.datas, (data) => {
          return data.id === id
        }, (data, index, arr, parent) => {
          const tempData = clone(data)
          if (!tempData.controls.temp) {
            tempData.controls.temp = {}
          }
          // 特殊处理 如果parent是flex,则显示flex值得框
          if (parent) {
            if (parent.controls.style.display && parent.controls.style.display === "flex") {
              tempData.controls.temp.parentFlex = true
            }
          }
          if (!data.isWrapper) {
            // 禁止显示disable:flex
            tempData.controls.temp.disabledFlex = true
          }
          state.currentWidget = tempData
        })
      } else {
        // 在根路径上
        state.currentWidget = ""
      }
    },
    update(state, data) {
      let getData = ""
      loop(state.widget.datas, (data) => {
        return data.id === state.currentWidget.id
      }, (data) => {
        getData = data
      })
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
    },
    deletei(state, id) {
      loop(state.widget.datas, (data) => {
        return data.id === id
      }, (data, index, list) => {
        list.splice(index, 1)
      })
      state.widget.datas = clone(state.widget.datas)
    },
    setCopy(state, id) {
      if (id) {
        loop(state.widget.datas, (data) => {
          return data.id === id
        }, (data) => {
          state.currentCopy = clone(data)
        })
      } else {
        state.currentCopy = ""
      }
    },
    setPaste(state, id) {
      let currentCopy = clone(state.currentCopy)
      currentCopy.id = randomId()
      loop(currentCopy.children, () => true, (_data) => {
        _data.id = randomId()
      })
      if (id) {
        loop(state.widget.datas, (data) => {
          return data.id === id
        }, (data) => {
          // 遍历每个元素重新设置ID
          data.children.push(currentCopy)
          state.currentCopy = ""
        })
      } else {
        state.widget.datas.push(currentCopy)
        state.currentCopy = ""
      }
    },
    setDrag(state, data) {
      state.currentDrag = data
    },
    exchange(state, {
      id1,
      id2
    }) {
      var _arr = []
      var index1 = 0
      var index2 = 0
      loop(state.widget.datas, (data) => {
        return data.id === id1
      }, (data, index, arr, parent) => {
        index1 = index
        index2 = arr.findIndex(_d => _d.id === id2)
        _arr = arr
      })
      let temp = clone(_arr[index1])
      _arr[index1] = clone(_arr[index2])
      _arr[index2] = temp
      state.widget.datas = clone(state.widget.datas)
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
    },
    deletei(context, id) {
      context.commit('deletei', id)
    },
    setCopy(context, id) {
      context.commit('setCopy', id)
    },
    setPaste(context, id) {
      context.commit('setPaste', id)
    },
    setDrag(context, data) {
      context.commit('setDrag', data)
    },
    exchange(context, data) {
      context.commit('exchange', data)
    },
    setAll(context, data){
      context.commit('setAll', data)
    }
  }
}
