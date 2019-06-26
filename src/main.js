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

import '../node_modules/nprogress/nprogress.css'

// 加上这个就不需要每次写UTL的时候写那么长了
// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/';
axios.defaults.baseURL = 'http://toutiao.course.itcast.cn/mp/v1_0/'

Vue.use(ElementUI)

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')