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
            <span @click="avatarModify()" v-if="Visible.imgModifyVisible">
              <div>
                <i class="iconfont">&#xe8bc;</i>
              </div>
              <i>修改头像</i>
            </span>
          </div>
          <div>{{ tbUser.nickname }}</div>
          <div>
            <el-button @click="ModifyInfo()" type="primary">编辑个人信息</el-button>
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
let app
export default {
  name: 'TestAjaxView',
  data() {
    return {
      title: '我的主页',
      username: '',
      Iusername: true,
      tbUser: {},
      tbUserInfo: {},
      userOtherInfo: {},
      Visible: {
        imgModifyVisible: false, //修改头像的visible
      },
      loading: false,
      // 传递图片的格式限制
      avatarImg: ['jpg', 'jpeg', 'png', 'tif', 'bmp', 'gif', 'jfif'],
    }
  },
  methods: {
    // 获取地址栏信息
    queryLoction() {
      let Names = location.search
      let index = Names.lastIndexOf('&')
      if (index > -1) {
        this.username = Names.substring(index + 1)
        let usernames = Names.substring(1, index)
        this.queryUser()
        if (this.username == usernames) return (this.Iusername = false)
      } else {
        this.username = Names.substring(1)
        this.Iusername = false
        this.queryUser()
      }
    },
    // 查询用户信息
    queryUser() {
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
    ModifyInfo() {
      this.Visible.imgModifyVisible = true
    },
    // 修改头像
    avatarModify() {
      let avatarImgVisible = true
      tools.openFile((file) => {
        this.loading = true
        let selectedFile = file
        console.log(file)
        let selectedFileIndex = selectedFile.name.lastIndexOf('.')
        let selectedFileIndexImg = selectedFile.name.substring(selectedFileIndex + 1)
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
                    this.loading = false
                    this.queryUser()
                  })
                })
              }
            })
          }
        })
        if (avatarImgVisible) {
          this.$alert('您上传的不是图片')
          this.loading = false
        }
        // 关闭遮罩层
        this.Visible.imgModifyVisible = false
      })
    },
  },
  created() {
    app = this
    app.queryLoction()
  },
}
</script>
<style scoped>
@import url(@/css/user/UserBody.css);
</style>
