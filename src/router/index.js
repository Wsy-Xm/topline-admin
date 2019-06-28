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
        // 添加
        {
          name: 'publish',
          path: '/publish',
          component: () => import('@/views/publish/')
        },
        // 编辑
        {
          name: 'publish-amend',
          path: '/publish/:id',
          component: () => import('@/views/publish/')
        },
        {
          name: 'article',
          path: '/article',
          component: () => import('@/views/article/')
        },
        {
          name: 'comment',
          path: '/comment',
          component: () => import('@/views/comment/')
        },
        {
          name: 'account',
          path: '/account',
          component: () => import('@/views/account/')
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
  // 进度条
  nprogress.start()
  const userinfo = window.localStorage.getItem('userinfo')
  // console.log(userinfo)
  // console.log(1111)
  // console.log(to.path !== '/login')
  if (to.path !== '/login') {
    // console.log(123)
    // console.log(userinfo)
    if (!userinfo) {
      return next({ path: '/login' })
    } else {
      // console.log(456)
      next()
    }
  } else {
    // console.log(2222)
    next()
  }
})

router.afterEach((to, from) => {
  // 进度条
  nprogress.done()
})

export default router