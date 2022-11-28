//测试模块的路由信息
let routers = [
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/test/TestInfoView.vue'),
  },
]

export default routers
