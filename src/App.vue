<template>
  <div id="app">
    <!-- 路由切换页面就是跳转该标签 -->
    <router-view />
  </div>
</template>
<script>
import logger from './js/logger'

export default {
  mounted() {
    logger.debug('根组件，顶级作用域======================》')
    if (top != window) {
      logger.debug('根组件，顶级作用域======================》=========')
      top.postMessage('loaded', '*')
    }
  },
}
</script>
<style scoped>
@import url('./css/iconfont/iconfont.css');
@import url('./css/common.css');
</style>
