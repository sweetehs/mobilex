// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import Preview from './preview.vue'

import "@/assets/less/reset.less"
import "@/assets/less/fn.less"
import "@/assets/less/common.less"

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { Preview },
  template: '<Preview/>'
})
