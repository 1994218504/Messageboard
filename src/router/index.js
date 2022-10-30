import Vue from 'vue'
import VueRouter from 'vue-router'
import test from './test'
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
    component: () => import('../views/mainView.vue'),
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
].concat(test)
// .concat(message)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
