<template>
  <div>
    <div v-loading="loading">
      <el-page-header @back="jumpRouting('/index')" content="用户"> </el-page-header>
      {{ tbUserInfo }}
      <div class="conter">
        <div class="index_top">
          <div></div>
          <div class="index_touxiang">
            <img :src="tbUserInfo.img" alt="" />
            <span @click="avatarModify()" v-if="Visible.ModifyVisible">
              <div>
                <i class="iconfont">&#xe8bc;</i>
              </div>
              <i>修改头像</i>
            </span>
          </div>
          <div v-if="Visible.nickname">
            <div style="font-size: 3rem">{{ tbUser.nickname }}</div>
            <span @click="showModifyNickname()" v-if="Visible.ModifyVisible"><i class="iconfont">&#xe651;</i>修改</span>
          </div>
          <div v-else>
            <span>昵称:</span>
            <el-input clearable v-model="modifyInfo.nickname"></el-input>
            <div>
              <el-button @click="modifyNickname()">修改</el-button>
              <el-button @click="Visible.nickname = true">取消</el-button>
            </div>
          </div>
          <div>
            <el-button v-if="Visible.ModifyVisible == false" @click="Visible.ModifyVisible = true" type="primary">编辑个人信息</el-button>
            <div @click="Visible.ModifyVisible = false" class="index_user_body" v-else><span>返回我的主页</span><i class="iconfont">&#xe65f;</i></div>
          </div>
        </div>
      </div>
      <div v-if="!Iusername">我自己的主页 </div>
      <div v-else>别的主页</div>
    </div>
    <div></div>
    <div></div>
  </div>
</template>
<script>
import tools from '@/js/tools'
import logger from '@/js/logger'

export default {
  name: 'UserBody',
  data() {
    return {
      title: '我的主页',
      username: '',
      Iusername: true,
      tbUser: {},
      tbUserInfo: {},
      userOtherInfo: {},
      Visible: {
        ModifyVisible: false, //修改头像的visible
        nickname: true,
      },
      loading: false,
      // 传递图片的格式限制
      avatarImg: ['jpg', 'jpeg', 'png', 'tif', 'bmp', 'gif', 'jfif'],
      modifyInfo: {},
    }
  },
  methods: {
    // 查询用户信息
    queryUser() {
      this.username = location.search
      logger.debug('查看我选中的用户名字', this.username)
      tools.ajax('/user/auth/getUserInfoByName', { username: this.username }, (data) => {
        this.tbUser = data.tbUser
        this.tbUserInfo = data.tbUserInfo
        this.userOtherInfo = data.userOtherInfo
      })
    },
    // 退出
    jumpRouting(index) {
      this.$router.push(index)
    },
    // 修改头像
    avatarModify() {
      let avatarImgVisible = true
      tools.openFile((file) => {
        this.loading = true
        let selectedFile = file
        let selectedFileIndexImg = selectedFile.name.substring(selectedFile.name.lastIndexOf('.') + 1)
        if (selectedFile == null) {
          this.$alert('没有选中图片')
          return
        }
        this.avatarImg.forEach((item) => {
          if (selectedFileIndexImg == item) {
            avatarImgVisible = false
            tools.upload(selectedFile, { fileinfo: '修改头像' }, (data) => {
              if (data.success) {
                tools.ajax('/user/file/queryAll', {}, (data) => {
                  let file = data.list
                  tools.ajax('/user/auth/updateUserInfo', { img: tools.getDownladUrl(file[0].fid) }, () => {
                    data.success ? this.$message({ type: 'success', message: data.message }) : this.$alert(data.message)
                    this.queryUser()
                    this.loading = false
                  })
                })
              }
            })
          }
        })
        // 关闭遮罩层
        this.Visible.ModifyVisible = false
        if (avatarImgVisible) {
          this.$alert('您上传的不是图片')
          this.Visible.ModifyVisible = true
          this.loading = false
        }
      })
    },
    // 修改昵称
    showModifyNickname() {
      this.Visible.nickname = false
      let info = JSON.parse(JSON.stringify(this.tbUserInfo))
      delete info.email
      delete info.phone
      info.nickname = this.tbUser.nickname
      this.modifyInfo = info
    },
    modifyNickname() {
      tools.ajax('/user/auth/updateUserInfo', this.modifyInfo, (data) => {
        logger.debug(data.success)
        data.success == true ? this.$message({ type: 'success', message: data.message }) : this.$message.error(data.message)
        this.queryUser()
        this.Visible.nickname = true
      })
    },
  },
  created() {
    this.queryUser()
  },
}
</script>
<style scoped>
@import url(@/css/user/UserBody.css);
</style>
