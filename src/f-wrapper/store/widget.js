import Vue from "vue"
import {
  clone,
  compare,
  extendDeep,
  loop,
  randomId
} from "@/util/util"
export default {
  namespaced: true,
  state: {
    widget: {
      datas: [],
      hidden: []
    }, // 数据列表
    currentTab: "",
    currentWidget: "", // 当前选中的数据
    currentCopy: "", // 当前复制的数据
    currentDrag: "" // 当前拖拽的组ID
  },
  mutations: {
    setTab(state, tab) {
      state.currentTab = tab
    },
    setAll(state, data) {
      state.widget = data
    },
    add(state, widget) {
      let currendData = state.widget[state.currentTab]
      if (state.currentWidget && state.currentWidget.isWrapper) {
        let getData = ""
        loop(currendData, (data) => {
          return data.id === state.currentWidget.id
        }, (data) => {
          getData = data
        })
        getData.children.push(widget)
        currendData = clone(currendData)
      } else {
        currendData.push(widget)
      }
    },
    setCur(state, id) {
      let currendData = state.widget[state.currentTab]
      if (id) {
        loop(currendData, (data) => {
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
      let currendData = state.widget[state.currentTab]
      let getData = ""
      loop(currendData, (data) => {
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
      let currendData = state.widget[state.currentTab]
      loop(currendData, (data) => {
        return data.id === id
      }, (data, index, list) => {
        list.splice(index, 1)
      })
      state.widget[state.currentTab] = clone(currendData)
    },
    setCopy(state, id) {
      let currendData = state.widget[state.currentTab]
      if (id) {
        loop(currendData, (data) => {
          return data.id === id
        }, (data) => {
          state.currentCopy = clone(data)
        })
      } else {
        state.currentCopy = ""
      }
    },
    setPaste(state, id) {
      let currendData = state.widget[state.currentTab]
      let currentCopy = clone(state.currentCopy)
      currentCopy.id = randomId()
      // 如果此时的状态是lock，要设置lock
      const {
        isLock
      } = state.currentCopy.controls.base
      if (state.currentCopy.id === isLock) {
        currentCopy.controls.base.isLock = currentCopy.id
      }
      loop(currentCopy.children, () => true, (_data) => {
        _data.id = randomId()
        if (isLock) {
          _data.controls.base.isLock = _data.id
        }
      })
      if (id) {
        loop(currendData, (data) => {
          return data.id === id
        }, (data) => {
          // 遍历每个元素重新设置ID
          data.children.push(currentCopy)
          state.currentCopy = ""
        })
      } else {
        currendData.push(currentCopy)
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
      let currendData = state.widget[state.currentTab]
      var _arr = []
      var index1 = 0
      var index2 = 0
      loop(currendData, (data) => {
        return data.id === id1
      }, (data, index, arr, parent) => {
        index1 = index
        index2 = arr.findIndex(_d => _d.id === id2)
        _arr = arr
      })
      let temp = clone(_arr[index1])
      _arr[index1] = clone(_arr[index2])
      _arr[index2] = temp
      state.widget[state.currentTab] = clone(currendData)
    },
    setLock(state, id) {
      let currendData = state.widget[state.currentTab]
      loop(currendData, (data) => data.id == id, (data, index, arr, parent) => {
        let isLock = !data.controls.base.isLock
        if (isLock) {
          data.controls.base.isLock = data.id
        } else {
          data.controls.base.isLock = false
        }
        //子元素设置lock
        loop(data.children, () => true, (data1) => {
          // 
          if (isLock) {
            data1.controls.base.isLock = data.id
          } else {
            data1.controls.base.isLock = false
          }
        })
      })
    }
  },
  actions: {
    setTab(context, tab) {
      context.commit('setTab', tab)
    },
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
    setLock(context, id) {
      context.commit('setLock', id)
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
    setAll(context, data) {
      context.commit('setAll', data)
    }
  }
}
