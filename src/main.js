import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//饿了吗ui导入
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 导入过滤器 路径@符号表示src目录
import '@/filters/myfileters'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
