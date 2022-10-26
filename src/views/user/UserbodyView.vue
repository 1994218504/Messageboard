<template>
  <div>
    <div v-loading="loading">
      <el-page-header @back="jumpRouting('/index')" content="用户"> </el-page-header>
      <div class="conter">
        <!-- 背景图片 -->
        <div class="index_top">
          <!-- IP属地 -->
          <div>
            <img src="https://klcxy.top/oss-manage-service/ossinfo/queryOssUrl?tbOssInfo.oiid=532" alt="" />
            <div>
              <i class="fa-solid fa-location-dot"></i>
              <span>IP属地未知</span>
            </div>
            <!-- <div>
              <i class="fa-solid fa-location-dot"></i>
              <span>IP属地未知</span>
            </div> -->
          </div>
          <!-- 头像 -->
          <div class="index_touxiang">
            <img :src="users.tbUserInfo.img" alt="" />
            <span @click="avatarModify()" v-if="Visible.ModifyVisible">
              <div>
                <i class="iconfont">&#xe8bc;</i>
              </div>
              <i>修改头像</i>
            </span>
          </div>
          <!-- 修改昵称 -->
          <div v-if="Visible.nickname">
            <div class="tbUserNiCkname">
              <div>{{ users.tbUser.nickname }}</div>
              <span @click="showModifyNickname()" v-if="Visible.ModifyVisible"><i class="iconfont">&#xe651;</i>修改</span>
            </div>
            <div class="tbUserInfo">{{ users.tbUserInfo.info }}</div>
          </div>
          <div class="MondifytbUserNickname" v-else>
            <div style="display: flex">
              <div style="width: 60px">昵称:</div>
              <div>
                <div> <el-input clearable v-model="modifyInfoNickname"></el-input></div>
                <div><el-button @click="modifyNickname()">修改</el-button></div>
                <el-button @click="Visible.nickname = true">取消</el-button>
              </div>
            </div>
            <div class="tbUserInfo">{{ users.tbUserInfo.info }}</div>
          </div>
        </div>
        <!-- 隐藏信息 -->
        <div>
          <!-- 自己账户的查看详细信息 -->
          <div class="tbUserInfo">
            <el-collapse>
              <el-collapse-item title="查看详细详细" name="1">
                <div class="tbUserInfoFlex">
                  <div>微信:</div>
                  <div>{{ users.tbUserInfo.wechat }}</div>
                </div>
                <div class="tbUserInfoFlex">
                  <div>QQ:</div>
                  <div>{{ users.tbUserInfo.qq }}</div>
                </div>
                <div class="tbUserInfoFlex">
                  <div>电话:</div>
                  <div>{{ users.tbUserInfo.phone }}</div>
                </div>
                <div class="tbUserInfoFlex">
                  <div>邮箱:</div>
                  <div>{{ users.tbUserInfo.email }}</div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
          <!-- 当为自己的用户界面时可以编辑自己的用户信息 -->
          <div v-if="Visible.Iusername">
            <el-button v-if="Visible.ModifyVisible == false" @click="Visible.ModifyVisible = true" type="primary">编辑个人信息</el-button>
            <div
              @click="
                Visible.ModifyVisible = false
                Visible.nickname = true
              "
              v-else
              ><span>返回我的主页</span><i class="iconfont">&#xe65f;</i></div
            >
          </div>
          <div v-else>
            <el-button>关注</el-button>
          </div>
        </div>
      </div>
      <div></div>
      <hr />
      <div class="user_body_main">
        <div>
          <div v-if="Visible.Iusername">我自己的主页 </div>
          <div v-else>别的主页</div>
        </div>
        {{ Visible.Iusername }}
        <div style="margin: 100px">1</div>
      </div>
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
      queryString: '',
      users: {
        tbUser: {},
        tbUserInfo: {},
        userOtherInfo: {},
      },
      file: {
        files: '',
        fileInfo: '修改用户头像',
      },
      Visible: {
        Iusername: true, //是否为我的页面
        ModifyVisible: false, //修改头像的visible
        nickname: true, //修改昵称时的visible
      },
      loading: false,
      // 传递图片的格式限制
      modifyInfoNickname: '',
      heigth: 0,
    }
  },

  methods: {
    queryLocstionUser() {
      this.loading = true
      this.queryString = location.search.replace('?', '')
      this.queryUser()
    },
    // 获取信息
    queryUser() {
      logger.debug('进入信息更改页面')
      if (this.user.tbUser.username == this.queryString) {
        //是登录用户
        this.users.tbUser = this.user.tbUser
        this.users.tbUserInfo = this.user.tbUserInfo
        this.users.userOtherInfo = this.user.userOtherInfo
        this.Visible.Iusername = true
      } else {
        //查看别人登录界面
        this.Visible.Iusername = false
        tools.ajax('/user/auth/getUserInfoByName', { username: this.queryString }, (data) => {
          this.users.tbUser = data.tbUser
          this.users.tbUserInfo = data.tbUserInfo
          this.users.userOtherInfo = data.userOtherInfo
        })
      }
      this.loading = false
    },
    // 退出
    jumpRouting(index) {
      this.$router.push(index)
    },
    // 修改头像
    avatarModify() {
      this.loading = true
      this.Visible.ModifyVisible = true
      this.file.files = ''
      tools.openFile((selfile) => {
        logger.debug('选择的文件', selfile)
        this.file.files = selfile
        if (!this.file.files) {
          logger.debug('没有选择图片')
        } else {
          tools.upload('/user/file/upload', { fileinfo: this.file.fileInfo }, this.file.files.file, (data) => {
            if (data.success) {
              this.queryfile()
              this.Visible.ModifyVisible = false
            } else {
              this.$message.error(data.message)
            }
          })
        }
      })
    },
    queryfile() {
      tools.ajax(
        '/user/file/queryAll',
        {},
        (data) => {
          if (data.success) {
            let imgFid = data.list[0].fid
            tools.ajax('/user/auth/updateUserInfo', { img: tools.getDownloadUrl(imgFid), sex: this.users.tbUserInfo.sex }, (data) => {
              this.queryUser()
              if (data.success) {
                this.$message({ type: 'success', message: data.message })
                this.$store.dispatch('updateUserInfo')
                this.queryUser()
                this.loading = false
              } else {
                this.$message.error(data.message)
              }
            })
          } else {
            this.$message.error(data.message)
          }
        },
        true
      )
    },
    // 修改昵称
    showModifyNickname() {
      this.Visible.nickname = false
      let info = this.users.tbUser.nickname
      this.modifyInfoNickname = info
    },
    modifyNickname() {
      tools.ajax('/user/auth/updateUserInfo', { nickname: this.modifyInfoNickname, sex: this.users.tbUserInfo.sex }, (data) => {
        data.success ? this.$message({ type: 'success', message: data.message }) : this.$message.error(data.message)
        this.queryUser()
        // this.Visible.nickname = true
      })
    },
  },
  computed: {
    user() {
      return this.$store.state.loginUser
    },
  },
  created() {
    this.queryLocstionUser()
    logger.debug('查看user参数', this.user)
  },
}
</script>
<style scoped>
@import url(@/css/user/UserBody.css);
@import 'https://cdn.bootcdn.net/ajax/libs/font-awesome/6.2.0/css/all.css';
</style>
