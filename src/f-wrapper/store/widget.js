import Vue from "vue"
import {
  clone,
  compare,
  extendDeep,
  loop
} from "@/util/util"
export default {
  namespaced: true,
  state: {
    widget: {
      base: {
        name: "测试专题"
      },
      datas: [
        {
        name: "布局",
        wid: "layout",
        id: "id294859",
        isWrapper: true,
        controls: {
          style: {
            margin: "0 0 0 0",
            padding: "10px 10px 10px 10px",
            color: "#abcdef",
            'background-color': "#000",
            'border-radius': "10px"
          },
          props: {}
        },
        children: [{
          name: "按钮",
          wid: "xbutton",
          id: "id246259",
          controls: {
            style: {
              margin: "10px 10px 10px 10px",
              color: "#abcdef",
              'background-color': "#000",
            },
            props: {}
          }
        }, {
          name: "文字",
          wid: "xtext",
          id: "id2584859",
          controls: {
            style: {
              padding: "10px 10px 10px 10px",
              color: "#abcdef",
              'background-color': "#000",
            },
            props: {
              text: "这是一段文字"
            }
          }
        }]
      }, 
      {
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
      }, {
        name: "按钮",
        wid: "xbutton",
        id: "id234529",
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
        }, (data) => {
          state.currentWidget = clone(data)
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
    }
  }
}
