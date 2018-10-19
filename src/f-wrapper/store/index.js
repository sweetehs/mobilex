import Vue from 'vue'
import Vuex from 'vuex'
import widgetStore from "./widget"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    $widget: widgetStore
  }
})
