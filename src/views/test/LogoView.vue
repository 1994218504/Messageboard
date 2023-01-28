<template>
  <div>
    <div>{{ title }}</div>
    <div v-if="user.isLogin">
      <!-- 对用户头像的判定 -->
      <div v-if="user.tbUserInfo && user.tbUserInfo.img">
        <img style="width: 100px" :src="user.tbUserInfo.img" alt="" />
      </div>
      <div v-else> <div> 默认txiang </div></div>
      <button @click="openfile()">浏览文件</button>
      <button v-if="fileinfo" @click="upload()">上传头像</button>
      <button v-else @click="openfile()"> 请选择文件 </button>
    </div>
    <div v-else>
      <button>必须登录</button>
    </div>
  </div>
</template>
<script>
import logger from '@/js/logger'
import tools from '../../js/tools'
let app
export default {
  name: 'TestAjaxView',
  data() {
    return {
      title: 'ajax测试页面',
      fileinfo: null,
    }
  },
  // 测试ssh公钥
  methods: {
    //修改用户图片
    // 用户附加信息副本
    savUserInfo(info) {
      // 修改前的fid
      let fid = tools.isDowkiadUrl(this.user.tbUserInfo.img)
      let tbUserInfo = tools.concatJson(this.user.tbUserInfo)
      delete tbUserInfo.email
      delete tbUserInfo.phone
      tbUserInfo.img = tools.getDownloadUrl(info.data.fid)
      logger.debug('新的头像地址', tbUserInfo.img)
      tools.ajax('/user/auth/updateUserInfo', tbUserInfo, (data) => {
        if (data.success) {
          this.$store
            .dispatch('updateUserInfo')
            .then(() => {
              if (fid != -1) {
                tools.ajax('/user/file/delete', { fid: fid }, () => {})
              }
            })
            .catch()
        } else {
          alert(data.message)
        }
      })
    },
    // 上传图片
    upload() {
      tools.upload(
        '/user/file/upload',
        { fileinfo: '用户头像' },
        this.fileinfo.file,
        (info) => {
          logger.debug('上传的结果', info)
          info.success ? this.savUserInfo(info) : alert(info.message)
        },
        true
      )
    },
    openfile() {
      tools.openFile((fileinfo) => {
        this.fileinfo = fileinfo
        logger.debug(fileinfo)
      })
    },
  },
  computed: {
    user() {
      return this.$store.state.loginUser
    },
  },
  created() {
    app = this
    logger.debug(app)
    logger.debug(tools.isDowkiadUrl(this.user.tbUserInfo.img))
    logger.debug(tools.isDowkiadUrl('Https:'))
  },
}
</script>
<style scoped></style>
