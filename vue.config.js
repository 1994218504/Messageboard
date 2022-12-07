const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 生成环境不需要map文件
  productionSourceMap: !process.env.NODE_ENV === 'production',//production生产模式//development开发模式
  // 项目输出路径
  outputDir: 'D:\\code\\git-project\\liuguanghui.vip.server\\message',
  // 服务器虚拟路径
  publicPath: process.env.NODE_ENV === 'production' ? '/message/' : '/',
})
