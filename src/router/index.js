import Vue from 'vue'
import Router from 'vue-router'

import nprogress from 'nprogress'

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
      component: () => import('@/views/layout/'),
      children: [
        {
          name: 'home',
          path: '/home',
          component: () => import('@/views/home/')
        },
        {
          name: 'publish',
          path: '/publish',
          component: () => import('@/views/publish/')
        }
      ]
    },
    {
      name: 'Login',
      path: '/login',
      component: () => import('@/views/login/')
    }
  ]
})

// 门卫  路由拦截器
router.beforeEach((to, from, next) => {
  nprogress.start()
  console.log(to)
  if (to.path !== '/login') {
    console.log(123)
    const userinfo = window.localStorage.getItem('userinfo')
    // console.log(userinfo)
    if (!userinfo) {
      return next({ path: '/login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  nprogress.done()
})

export default router