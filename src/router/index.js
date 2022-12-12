import Vue from 'vue'
import VueRouter from 'vue-router'
import test from './test'
// import error from './error'
// import message from './message'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/LoginView.vue'),
  },
  {
    path: '/index',
    name: 'home',
    component: () => import('../views/MainMessageView.vue'),
  },
  {
    path: '/index/messagedata/:umid',
    name: 'messagedatainfex',
    component: () => import('../views/Message_dataView.vue'),
  },
  {
    path: '/index/userbody/:username',
    name: 'user',
    component: () => import('../views/user/UserbodyView.vue'),
  },
  {
    path: '/index/message/settings',
    name: 'settings',
    component: () => import('../views/setup/SettingsView.vue'),
  },
].concat(test)
// .concat(error)
// .concat([
//   //通配符路由配置*表示任意路径
//   // 所以本配置一定要在路由列表的最后
//   {
//     path: '*',
//     name: 'all_toher',
//     // redirect表示重定向到其它path
//     redirect: '/error/404',
//   },
// ])

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
