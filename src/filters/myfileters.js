import Vue from 'vue'
// 全局过滤器定义
// 格式化时间的过滤器
// fileter的格式
Vue.filter('formatDate', function (value, format) {
  // console.log('formatDat的数据：', value, format);
  if (!value) {
    return ''
  }
  // 处理时间格式
  format = format ? format : 'yyyy-MM-dd hh:mm:ss'
  let date = new Date()
  date.setTime(value)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()
  //自己做前导补0
  month = month >= 10 ? month : '0' + month
  day = day >= 10 ? day : '0' + day
  hour = hour >= 10 ? hour : '0' + hour
  minute = minute >= 10 ? minute : '0' + minute
  second = second >= 10 ? second : '0' + second
  let result = format.replace(/yyyy/g, year)
  result = result.replace(/MM/g, month)
  result = result.replace(/dd/g, day)
  result = result.replace(/hh/g, hour)
  result = result.replace(/mm/g, minute)
  result = result.replace(/ss/g, second)
  return result
})
