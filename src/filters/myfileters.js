import tools from '@/js/tools'
import Vue from 'vue'
// 全局过滤器定义
// 格式化时间的过滤器
// fileter的格式

// 日期格式化的过滤器
Vue.filter('formatDate', function (value, format) {
  console.log('in formatDate====>', value, format)
  return value ? tools.formatDate(value, format) : ''
})
// 文件大小的过滤器
Vue.filter('filesize', function (info) {
  console.log('in filesize====>', info)
  if (info === 0) {
    return '0 B'
  }
  let k = 1024
  let sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'], //单位值
    i = Math.floor(Math.log(info) / Math.log(k))
  return (info / Math.pow(k, i)).toPrecision(3) + '' + sizes[i]
})
