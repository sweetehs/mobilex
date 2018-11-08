import Vue from 'vue'
import Router from 'vue-router'
import Editor from 'Wrapper/pages/editor'
import List from 'Wrapper/pages/list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/editor/:id',
      name: 'editor',
      component: Editor
    },
    {
      path: '/list',
      name: 'list',
      component: List
    }
  ]
})
