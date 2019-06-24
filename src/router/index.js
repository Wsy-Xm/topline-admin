import Vue from 'vue'
import Router from 'vue-router'

import home from '../views/home/index'
import login from '../views/login/index'
import layout from '../views/layout/index'
import publish from '../views/publish/index'

Vue.use(Router)

const router = new Router({
  routes: [
    // {
    //   name: 'Home',
    //   path: '/',
    //   component: home
    // },
    {
      name: 'layout',
      path: '/',
      component: layout,
      children: [
        {
          name: 'home',
          path: '/home',
          component: home
        },
        {
          name: 'publish',
          path: '/publish',
          component: publish
        }
      ]
    },
    {
      name: 'Login',
      path: '/login',
      component: login
    }
  ]
})
// if () {

// }

router.beforeEach((to, from, next) => {
  // console.log(to)
  const userinfo = window.localStorage.getItem('userinfo')
  if (to.path !== '/login') {
    // console.log(userinfo)
    if (!userinfo) {
      return next({ path: '/login' })
    }
  } else {
    next()
  }
})

export default router