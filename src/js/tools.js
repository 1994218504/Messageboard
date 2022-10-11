// npm install的插件和js直接不需要路径就能导入
import qs from 'qs'
import axios from 'axios'
import sparkMd5 from 'spark-md5'
// import store from '@/store/index'
// import { MessageBox } from 'element-ui'
// import router from '@/router/index'
// 后端接口的服务器基础地址
const SERVER_BASE_URL = 'https://huhuiyu.top/teach_project_service'
// 本地存储token的名称
const SERVER_TOKEN_KEY = 'huhuiyu.teach.token'

// 保存服务器token信息
function saveToken(data) {
  if (data && data.token) {
    localStorage.setItem(SERVER_TOKEN_KEY, data.token)
  }
}

// 加载本地存储的token信息
function loadToken() {
  let token = localStorage.getItem(SERVER_TOKEN_KEY)
  return token ? token : ''
}

let tools = {}
// ajax请求对象
// ajax的要素：1：后端api的path，2：请求的参数
// 3：应答结果的处理回调function，4：请求的方式（可选，默认为post）

tools.empty = () => {}
tools.ajax = (path, params, cb, method) => {
  // 完整的请求路径
  let url = SERVER_BASE_URL + path
  // 请求参数的处理（需要qs）
  let data = qs.stringify(params, { allowDots: true })
  // method的默认处理
  method = method ? method : 'post'
  if (method == 'get') {
    url = url + '?' + data
    data = ''
  }
  console.log('请求的参数信息', params)
  // 通过axios发起ajax请求
  let promise = axios({
    url: url,
    data: data,
    method: method,
    // token需要通过头信息传递
    headers: {
      token: loadToken(),
    },
  })
  // 应答结果的处理
  promise
    .then((resp) => {
      console.log('ajax请求结果参数：', params)
      console.log('ajax请求结果结果：', resp.data)
      // 保存token
      saveToken(resp.data)
      // 回调只需要应答的服务器端数据，不需要完整的resp信息
      cb(resp.data)
    })
    // es6的箭头函数
    .catch((error) => {
      console.error('请求异常：', error)
      // 定制错误请求信息
      cb({ code: 500, success: false, message: '请求异常' })
    })
}
tools.md5 = (info) => {
  if (info && info.trim() != '') {
    return sparkMd5.hash(info)
  }
  return ''
}
// 将正则校验封装到插件
tools.regValidate = (rule, value, cb, reg, message) => {
  // logger.debug(rule)
  if (reg.test(value)) {
    cb()
  } else {
    cb(new Error(message))
  }
}

// ajax文件上传
// 参数1：上传的文件
// 参数2：请求的参数
// 参数3：请求的回调处理function
// upload(file, params, cb) {
//   if (!file) {
//     cb({ code: 500, success: false, message: '请选择文件' })
//     return
//   }
//   if (file.size >= 2 * 1024 * 1024) {
//     cb({ code: 500, success: false, message: '文件太大' })
//     return
//   }
//   // ajax文件上传必须使用FormData处理
//   let data = new FormData()
//   data.append('file', file)
//   // 处理请求参数
//   for (let key in params) {
//     data.append(key, params[key])
//   }
//   // 发起请求
//   let promise = axios({
//     url: SERVER_BASE_URL + '/user/file/upload',
//     data: data,
//     method: 'post',
//     headers: {
//       token: loadToken(),
//       'Content-Type': 'multipart/form-data',
//     },
//   })

//   // 应答结果的处理
//   promise
//     .then((resp) => {
//       // console.log('ajax请求结果：', resp)
//       // 保存token
//       saveToken(resp.data)
//       // 回调只需要应答的服务器端数据，不需要完整的resp信息
//       cb(resp.data)
//     })
//     // es6的箭头函数
//     .catch((error) => {
//       console.error('请求异常：', error)
//       // 定制错误请求信息
//       cb({ code: 500, success: false, message: '请求异常' })
//     })
// },
// 获取fid对应的文件下载链接地址
tools.getAccessKey = () => {
  return '477ae8f3-5aa3-40f2-8f25-189aed22fb6a'
}
// 获取开发者密钥
tools.getDownloadUrl = (fid) => {
  return SERVER_BASE_URL + '/user/file/download?fid=' + fid
}
// 合并json对象
tools.concatJson = (...jsons) => {
  console.log('json参数列表：', jsons)
  let result = {}
  jsons.forEach((json) => {
    for (const key in json) {
      if (Object.hasOwnProperty.call(json, key)) {
        result[key] = JSON.parse(JSON.stringify(json[key]))
      }
    }
  })
  return result
}
// 格式化日期
// 格式化日期
tools.formatDate = (value, format) => {
  try {
    // 获取日期格式参数
    format = format ? format : 'yyyy-MM-dd hh:mm:ss'
    if (!isNaN(value) && !(value instanceof Date)) {
      let time = new Date()
      time.setTime(parseInt(value))
      value = time
    }
    let year = value.getFullYear() + ''
    let month = value.getMonth() + 1
    let day = value.getDate()
    let hour = value.getHours()
    let minute = value.getMinutes()
    let second = value.getSeconds()
    month = month < 10 ? '0' + month : '' + month
    day = day < 10 ? '0' + day : '' + day
    hour = hour < 10 ? '0' + hour : '' + hour
    minute = minute < 10 ? '0' + minute : '' + minute
    second = second < 10 ? '0' + second : '' + second
    format = format.replace('yyyy', year)
    format = format.replace('MM', month)
    format = format.replace('dd', day)
    format = format.replace('hh', hour)
    format = format.replace('mm', minute)
    format = format.replace('ss', second)
    format = format.replace('ms', value.getMilliseconds())
    return format
  } catch (ex) {
    console.error(ex)
    return ''
  }
}
// 上传文件
tools.upload = (file, params, cb) => {
  console.log('文件上传参数', params)
  if (!file) {
    cb({ code: 500, success: false, message: '请选择文件' })
    return
  }
  if (file.size >= 2 * 1024 * 1024) {
    cb({ code: 500, success: false, message: '文件太大' })
    return
  }
  // ajax文件上传必须使用FormData处理
  let data = new FormData()
  data.append('file', file)
  // 处理请求参数
  for (let key in params) {
    data.append(key, params[key])
  }
  // 发起请求
  let promise = axios({
    url: SERVER_BASE_URL + '/user/file/upload',
    data: data,
    method: 'post',
    headers: {
      token: loadToken(),
      'Content-Type': 'multipart/form-data',
    },
  })

  // 应答结果的处理
  promise
    .then((resp) => {
      console.log('ajax请求结果：', resp)
      // 保存token
      saveToken(resp.data)
      // 回调只需要应答的服务器端数据，不需要完整的resp信息
      cb(resp.data)
    })
    // es6的箭头函数
    .catch((error) => {
      console.error('请求异常：', error)
      // 定制错误请求信息
      cb({ code: 500, success: false, message: '请求异常' })
    })
}
tools.openFile = (cd, accept) => {
  let file = document.createElement('input')
  file.setAttribute('type', 'file')
  if (accept) {
    file.setAttribute('accept', accept)
  }
  file.addEventListener('change', () => {
    cd(file.files[0])
  })
  file.click()
}
tools.getDownladUrl = (fid) => {
  return SERVER_BASE_URL + '/user/file/download?fid=' + fid
}
export default tools
