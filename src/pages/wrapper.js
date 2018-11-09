// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "@/util/axios"
import Wrapper from './Wrapper.vue'
import router from 'Wrapper/config/route'
import store from "Wrapper/store"

import "@/assets/less/reset.less"
import "@/assets/less/fn.less"
import "@/assets/less/common.less"
import "@/assets/lib/font-awesome/css/font-awesome.min.css"


import upload from "@/components/upload"
Vue.component("upload", upload)

Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.prototype.$ELEMENT = {
  size: 'mini'
};
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    Wrapper
  },
  template: '<Wrapper/>'
})
