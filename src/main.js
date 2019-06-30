import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

// element插件和样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入路由
import router from './router'
// 引入style全局样式
import './styles/index.less'

// 处理数字丢失精度
import JSONbig from 'json-bigint'

// import srote from "./store"

// 进度条样式
import '../node_modules/nprogress/nprogress.css'

// 加上这个就不需要每次写UTL的时候写那么长了
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// axios.defaults.baseURL = 'http://toutiao.course.itcast.cn/mp/v1_0/'

axios.defaults.transformResponse = [function(data) {
  try {
    // data 数据可能不是标准的 JSON 格式字符串，否则会导致 JSONbig.parse(data) 转换失败报错
    return JSONbig.parse(data)
  } catch (err) {
    // 无法转换的数据直接原样返回
    return data
  }
}]

// Axios 请求拦截器
axios.interceptors.request.use(config => {
  const userinfo = JSON.parse(window.localStorage.getItem('userinfo'))
  // console.log('111111')
  // config 就是本次配置的信息
  if (userinfo) {
    // console.log(config)
    // return config 就是允许这个请求通过
    config.headers.Authorization = `Bearer ${userinfo.token}`
  }

  return config
}, error => {
  // 如果有错误会执行里面的
  return Promise.reject(error)
})

// Axios 响应拦截器
// 统一处理响应的数据格式
axios.interceptors.response.use(response => { // >= 200 && < 400 会进入这里
  // 这里是定制返回数据

  // return 123  这样res.data 都会得到123
  // 由于后端的数据id超出了js 的安全正式范围，所以使用jsonbig 统一处理
  return response.data.data
}, error => { // >= 400 会进入这里
  // console.dir(error)
  const status = error.response.status
  if (status === 401) {
    window.localStorage.removeItem('userinfo')
    router.push({
      name: 'login'
    })
  }
  return Promise.reject(error)
})

Vue.use(ElementUI)

Vue.config.productionTip = false
new Vue({
  router,
  // srote,
  render: h => h(App)
}).$mount('#app')