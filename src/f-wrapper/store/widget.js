import Vue from "vue"
import {
  clone,
  compare,
  extendDeep,
  loop,
  randomId
} from "@/util/util"
const setParent = (arr) => {
  loop(arr, () => true, (data, index, arr, parent) => {
    if (parent && parent._path) {
      data._path = parent._path.concat([data.id])
    } else if (!data._path) {
      data._path = [data.id]
    }
  })
}
const loopParent = (data, callback) => {
  if (data.parent) {
    callback && callback(data.parent)
    loopParent(data.parent, callback)
  }
}
export default {
  namespaced: true,
  state: {
    widget: {
      base: {},
      datas: [],
      hidden: []
    }, // 数据列表
    currentTab: "datas",
    currentWidget: "", // 当前选中的数据
    currentCopy: "", // 当前复制的数据
    currentCut: "", // 当前剪切的数据
    currentDrag: "", // 当前拖拽的组ID
    openlist: [] // 当前打开的文件夹
  },
  mutations: {
    setTab(state, tab) {
      state.currentTab = tab
    },
    setAll(state, data) {
      setParent(data.datas)
      state.widget = data
    },
    add(state, widget) {
      let currendData = state.widget[state.currentTab]
      if (state.currentWidget && state.currentWidget.isWrapper) {
        let cdata = ""
        loop(currendData, (data) => {
          return data.id === state.currentWidget.id
        }, (data) => {
          cdata = data
        })
        cdata.children.push(widget)
        widget._path = cdata._path.concat([widget.id])
        setParent([widget])
        currendData = clone(currendData)
      } else {
        setParent([widget])
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
          if (!tempData.temp) {
            tempData.temp = {}
          }
          // 特殊处理 如果parent是flex,则显示flex值得框
          if (parent) {
            if (parent.style.display && parent.style.display === "flex") {
              tempData.temp.parentFlex = true
            }
          }
          if (!data.isWrapper) {
            // 禁止显示disable:flex
            tempData.temp.disabledFlex = true
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
      let updateId = data.id || state.currentWidget.id
      let getData = ""
      loop(currendData, (data) => {
        return data.id === updateId
      }, (_data) => {
        getData = _data
      })
      // 为了防止死循环，比较数据是否相等
      if (!compare(data.data, getData)) {
        extendDeep(data.data, getData)
      }
      state.widget[state.currentTab] = clone(currendData)
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
      state.currentCut = ""
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
    setCut(state, id) {
      let currendData = state.widget[state.currentTab]
      state.currentCopy = ""
      if (id) {
        loop(currendData, (data) => {
          return data.id === id
        }, (data) => {
          state.currentCut = clone(data)
        })
      } else {
        state.currentCut = ""
      }
    },
    setPaste(state, id) {
      let currendData = state.widget[state.currentTab]
      if (state.currentCopy) {
        // 复制
        let currentCopy = clone(state.currentCopy)
        currentCopy.id = randomId()
        currentCopy.ajax = {}
        // 如果此时的状态是lock，要设置lock
        const {
          isLock
        } = state.currentCopy.base
        if (state.currentCopy.id === isLock) {
          currentCopy.base.isLock = currentCopy.id
        }
        loop(currentCopy.children, () => true, (_data) => {
          // 设置子元素id和lock
          _data.id = randomId()
          if (isLock) {
            _data.base.isLock = isLock
          } else {
            _data.base.isLock = false
          }
          // 复制的元素去掉ajax
          _data.ajax = {}
          _data.key = ""
        })
        if (id) {
          // 找到元素并且复制到元素
          loop(currendData, (data) => data.id === id, (data) => {
            // 遍历每个元素重新设置ID
            currentCopy._path = data._path.concat([currentCopy.id])
            setParent(currentCopy.children)
            data.children.push(currentCopy)
          })
        } else {
          delete currentCopy._path
          currendData.push(currentCopy)
        }
        state.currentCopy = ""
      } else if (state.currentCut) {
        let currentCut = clone(state.currentCut)
        // 找到父元素删除
        loop(currendData, _d => _d.id === currentCut.id, (data, index, arr, parent) => {
          arr.splice(index, 1)
        })
        if (id) {
          // 找到新元素添加
          loop(currendData, _d => _d.id === id, (data) => {
            currentCut._path = data._path.concat([currentCut.id])
            setParent(currentCut.children)
            data.children.push(currentCut)
          })
        } else {
          delete currentCut._path
          currendData.push(currentCut)
        }
        state.currentCut = ""
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
        let isLock = !data.base.isLock
        if (isLock) {
          data.base.isLock = data.id
        } else {
          data.base.isLock = false
        }
        //子元素设置lock
        loop(data.children, () => true, (data1) => {
          // 
          if (isLock) {
            data1.base.isLock = data.id
          } else {
            data1.base.isLock = false
          }
        })
      })
    },
    setAjax(state) {
      let currendData = state.widget[state.currentTab]
      let currentWidget = clone(state.currentWidget)
      currentWidget.ajax.flag = true
      // 设置所有子元素的ajaxid为父元素的id
      loop(currentWidget.children, () => true, (data, index, arr, parent) => {
        // 嵌套情况，如果不存在才设置
        if (!data.ajax.id || !data.ajax.flag) {
          data.ajax.id = currentWidget.id
        }
      })
      // 找到元素更新值
      loop(currendData, (data) => data.id == currentWidget.id, (data, index, arr, parent) => {
        arr[index] = currentWidget
      })
      state.widget[state.currentTab] = clone(currendData)
    },
    openFolder(state, id) {
      const index = state.openlist.indexOf(id)
      if (index === -1) {
        state.openlist.push(id)
      }
      let currendData = state.widget[state.currentTab]
      loop(currendData, _d => _d.id === id, (data) => {
        data._path && data._path.forEach((_path) => {
          if (state.openlist.indexOf(_path) == -1) {
            state.openlist.push(_path)
          }
        })
      })
    },
    closeFolder(state, id) {
      const index = state.openlist.indexOf(id)
      if (index !== -1) {
        state.openlist.splice(index, 1)
      }
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
    setCut(context, id) {
      context.commit('setCut', id)
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
    },
    setAjax(context) {
      context.commit('setAjax')
    },
    openFolder(context, id) {
      context.commit('openFolder', id)
    },
    closeFolder(context, id) {
      context.commit('closeFolder', id)
    }
  }
}
