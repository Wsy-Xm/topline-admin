import Vue from 'vue'
import Router from 'vue-router'

import home from '../views/home/index'
import login from '../views/login/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'Home',
      path: '/',
      component: home
    },
    {
      name: 'Login',
      path: '/login',
      component: login
    }
  ]
})