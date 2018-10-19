export default {
  namespaced: true,
  state: {
    widget: {
      base: {},
      datas: [{
        name: "布局",
        wid: "layout",
        id: "id294859",
        controls: {
          style: {
            margin: "10px 10px 10px 10px"
          },
          attr: {}
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
      state.currentWidget = state.widget.datas.find((_data) => _data.id == id)
    },
    update(state, data) {
      Object.assign(state.widget.datas.find((_data) => _data.id == state.currentWidget.id), data)
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
    }
  }
}
