import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  //路由配置说明

  // path参数是地址访问路径
  // name参数是随意
  // component参数是vue文件路径
  // 列如path是/abc,文件时AbcView.vue
  // 表示地址栏输入服务器地址/abc看到的时AbcView.vue编译后的页面问题

  {
    path: '/',
    name: 'home',
    component: () => import('../views/Login/LoginView.vue'),
  },
  {
    path: '/test',
    name: 'home',
    component: () => import('../views/TestView.vue'),
  },
  {
    path: '/index',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/index/messagedata',
    name: 'messagedatainfex',
    component: () => import('../views/Message_dataView.vue'),
  },
  {
    path: '/index/userbody',
    name: 'user',
    component: () => import('../views/user/UserbodyView.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
