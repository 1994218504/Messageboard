//测试模块的路由信息
let routers = [
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/test/TestInfoView.vue'),
  },
  {
    path: '/logo',
    name: 'logo',
    component: () => import('../views/test/LogoView.vue'),
  },
  {
    path: '/testlogin',
    name: 'logo',
    component: () => import('../views/test/TestLoginView.vue'),
  },
]

export default routers
