<template>
  <div>
    <div v-loading="Visible.Allloading">
      <el-page-header id="toStyle" @back="jumpRouting()" content="用户"> </el-page-header>
      <div class="conter">
        <!-- 背景图片 -->
        <div class="index_top">
          <!-- IP属地 -->
          <div>
            <img src="https://klcxy.top/oss-manage-service/ossinfo/queryOssUrl?tbOssInfo.oiid=545" alt="" />
            <div>
              <i class="fa-solid fa-location-dot"></i>
              <span>IP属地未知</span>
            </div>
          </div>
          <!-- 头像 -->
          <div class="index_touxiang">
            <img v-if="isUser" :src="user.tbUserInfo.img" alt="" />
            <img v-else :src="users.tbUserInfo.img" alt="" />
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
              <div v-if="isUser">{{ user.tbUser.nickname }}</div>
              <div v-else>{{ users.tbUser.nickname }}</div>
              <span @click="showModifyNickname()" v-if="Visible.ModifyVisible"><i class="iconfont">&#xe651;</i>修改</span>
            </div>
            <div v-if="isUser" class="tbUserInfo">{{ user.tbUserInfo.info }}</div>
            <div v-else class="tbUserInfo">{{ users.tbUserInfo.info }}</div>
          </div>
          <div class="MondifytbUserNickname" v-else>
            <div style="display: flex">
              <div style="width: 60px">昵称:</div>
              <div>
                <div> <el-input clearable v-model="updateModifyINfo.nickname"></el-input></div>
                <div><el-button @click="modifyNickname()">修改</el-button></div>
                <el-button @click="Visible.nickname = true">取消</el-button>
              </div>
            </div>
            <div v-if="isUser" class="tbUserInfo">{{ user.tbUserInfo.info }}</div>
            <div v-else class="tbUserInfo">{{ users.tbUserInfo.info }}</div>
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
                  <div v-if="isUser">{{ user.tbUserInfo.wechat }}</div>
                  <div v-else>{{ users.tbUserInfo.wechat }}</div>
                </div>
                <div class="tbUserInfoFlex">
                  <div>QQ:</div>
                  <div v-if="isUser">{{ user.tbUserInfo.qq }}</div>
                  <div v-else>{{ users.tbUserInfo.qq }}</div>
                </div>
                <div class="tbUserInfoFlex">
                  <div>电话:</div>
                  <div v-if="isUser">{{ user.tbUserInfo.phone }}</div>
                  <div v-else>{{ users.tbUserInfo.phone }}</div>
                </div>
                <div class="tbUserInfoFlex">
                  <div>邮箱:</div>
                  <div v-if="isUser">{{ user.tbUserInfo.email }}</div>
                  <div v-else>{{ users.tbUserInfo.email }}</div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
          <!-- 当为自己的用户界面时可以编辑自己的用户信息 -->
          <div v-if="Visible.Iusername">
            <div>
              <el-button v-if="Visible.ModifyVisible == false" @click="showClikenModifyNuckname()" type="primary">编辑个人信息</el-button>
              <div @click="closeClikeModifyNickname()" v-else> <span>返回我的主页</span><i class="iconfont">&#xe65f;</i> </div>
            </div>
            <div>
              <el-badge :value="12" class="item">
                <el-button>私信</el-button>
              </el-badge>
            </div>
          </div>
          <div v-else>
            <div>
              <el-button>关注</el-button>
            </div>
            <div>
              <el-button>私信</el-button>
            </div>
          </div>
        </div>
      </div>
      <!-- 修改用户附加信息 -->
      <div class="mondifyUser" v-if="Visible.ModifyVisible != false">
        <div>
          <el-form>
            <el-form-item>
              <div class="modifyUser_item">
                <div>性别:</div>
                <div style="border-bottom: 1px solid #dcdfe6; padding-left: 15px" v-if="Visible.ModifyInfoVisible">
                  {{ isSex() }}
                </div>
                <el-radio-group v-else v-model="updateModifyINfo.sex">
                  <el-radio label="m">男</el-radio>
                  <el-radio label="n">女</el-radio>
                  <el-radio label="f">保密</el-radio>
                </el-radio-group>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="modifyUser_item">
                <div>介绍:</div>
                <div style="border-bottom: 1px solid #dcdfe6; padding-left: 15px" v-if="Visible.ModifyInfoVisible">{{ user.tbUserInfo.info }}</div>
                <el-input v-else v-model="updateModifyINfo.info"></el-input>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="modifyUser_item">
                <div>Q Q:</div>
                <div style="border-bottom: 1px solid #dcdfe6; padding-left: 15px; margin-left: 15px" v-if="Visible.ModifyInfoVisible">{{ user.tbUserInfo.qq }}</div>
                <el-input v-else style="margin-left: 15px" v-model="updateModifyINfo.qq"></el-input>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="modifyUser_item">
                <div>微信:</div>
                <div style="border-bottom: 1px solid #dcdfe6; padding-left: 15px" v-if="Visible.ModifyInfoVisible">{{ user.tbUserInfo.wechat }}</div>
                <el-input v-else v-model="updateModifyINfo.wechat"></el-input>
              </div>
            </el-form-item>
          </el-form>
          <div @click="iconfontClickModifyInfo()" v-if="Visible.ModifyInfoVisible">
            <i class="iconfont">&#xe651;</i>
            <div>修改</div>
          </div>
          <div @click="Visible.ModifyInfoVisible = true" v-else>
            <i class="iconfont">&#xe651;</i>
            <div>取消修改</div>
          </div>
          <span slot="footer" v-if="!Visible.ModifyInfoVisible">
            <el-button @click="Visible.ModifyInfoVisible = true">取 消</el-button>
            <el-button type="primary" @click="modifyTranslation()">保 存</el-button>
          </span>
        </div>
      </div>
      <div class="user_body_main" v-else>
        <div class="user_body_main_left">
          <el-tabs v-model="activeName" @tab-click="ifTabs">
            <el-tab-pane label="动态" name="first">
              <div v-if="messagePage.total != 0" v-loading="Visible.firstLoading">
                <div v-for="d in messageList" :key="d.umid" class="forListMessageConern">
                  <div class="messageList" @click="queryMessage_date(d.umid)">
                    <div>
                      <div>
                        <img :src="d.userInfo.img" alt="" />
                      </div>
                      <div>
                        <span>{{ d.user.nickname }}</span>
                        <span>（{{ d.user.username }}）</span>
                      </div>
                    </div>
                    <div><i class="iconfont">&#xe634;</i>发布于：{{ d.lastupdate | formatDate }}</div>
                    <div>{{ d.title }} </div>
                    <div>
                      <span><i class="iconfont">&#xe604;</i> {{ d.hits }}</span>
                      <span><i class="iconfont">&#xec7f;</i> {{ d.praiseCount }}</span>
                    </div>
                    <div></div>
                  </div>
                </div>
                <div class="pageStyle" v-if="messagePage.pageCount > 1">
                  <page-comp :page.sync="messagePage" @change-page="queryMessageAjax()" layout=" total,prev,pager,next"></page-comp>
                </div>
              </div>
              <div v-else>
                <el-empty description="还没有动态"></el-empty>
              </div>
            </el-tab-pane>
            <el-tab-pane label="评论" name="second">
              <div v-if="replyPage.total != 0" v-loading="Visible.secondLoading">
                <div v-for="d in replyByList" :key="d.umrid" class="forListMessageConern">
                  <div class="messageList" @click="queryMessage_date(d.umid)">
                    <div>
                      <div>
                        <img :src="d.userInfo.img" alt="" />
                      </div>
                      <div>
                        <span>{{ d.user.nickname }}</span>
                        <span>（{{ d.user.username }}）</span>
                      </div>
                    </div>
                    <div><i class="iconfont">&#xe634;</i>发布于：{{ d.lastupdate | formatDate }}</div>
                    <div>{{ d.info }} </div>
                    <div> </div>
                  </div>
                </div>
                <div class="pageStyle" v-if="replyPage.pageCount > 1">
                  <page-comp :page.sync="replyPage" @change-page="queryReplyByAjax()" layout=" total,prev,pager,next"></page-comp>
                </div>
              </div>
              <div v-else>
                <el-empty description="还没有评论"></el-empty>
              </div>
            </el-tab-pane>
            <el-tab-pane label="关注" name="third">
              <div v-if="concernPage.total != 0" v-loading="Visible.thirdLoading">
                <div v-for="d in concernList" :key="d.user.username" class="forListMessageConern">
                  <div class="conernStyle">
                    <div>
                      <div>
                        <img :src="d.userInfo.img" alt="" />
                      </div>
                      <div>
                        <span>{{ d.user.nickname }}</span>
                        <span>（{{ d.user.username }}）</span>
                      </div>
                    </div>
                    <div>
                      <div v-if="isUser == true">
                        <el-button @click="queryReturnAjax(d)" v-if="d.judgment == true">取消关注</el-button>
                        <el-button @click="queryReturnAjax(d)" v-else type="primary">关注</el-button>
                      </div>
                    </div>
                    <div class="conernStyleHr"></div>
                  </div>
                </div>
                <div class="pageStyle" v-if="concernPage.pageCount > 1">
                  <page-comp :page.sync="concernPage" @change-page="queryConcernAjax()" layout=" total,prev,pager,next"></page-comp>
                </div>
              </div>
              <div v-else>
                <el-empty description="还没有关注的人"></el-empty>
              </div>
            </el-tab-pane>
            <el-tab-pane label="粉丝" name="fourth">
              <div v-if="followersPage.total != 0" v-loading="Visible.fourthLoading">
                <div v-for="d in followersList" :key="d.user.username" class="forListMessageConern">
                  <div class="conernStyle">
                    <div>
                      <div>
                        <img :src="d.userInfo.img" alt="" />
                      </div>
                      <div>
                        <span>{{ d.user.nickname }}</span>
                        <span>（{{ d.user.username }}）</span>
                      </div>
                    </div>
                    <div>
                      <div v-if="isUser == true">
                        <el-button @click="queryReturnAjax(d)" v-if="d.judgment == true">取消关注</el-button>
                        <el-button @click="queryReturnAjax(d)" v-else type="primary">关注</el-button>
                      </div>
                    </div>
                  </div>
                  <div class="conernStyleHr"></div>
                </div>
                <div class="pageStyle" v-if="followersPage.pageCount > 1">
                  <page-comp :page.sync="followersPage" @change-page="queryConcernAjax()" layout=" total,prev,pager,next"></page-comp>
                </div>
              </div>
              <div v-else>
                <el-empty description="还没有小迷弟哦"></el-empty>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="user_body_main_right">
          <div><i class="iconfont">&#xe672;</i> 用户创作信息</div>
          <div class="user_body_main_right_input">
            <el-button>发表动态</el-button>
          </div>
          <div>
            <div>
              <div>关注数</div>
              <div v-if="user.isLogin == true">{{ user.userOtherInfo.follow }}</div>
              <div v-else>{{ users.userOtherInfo.follow }}</div>
            </div>
            <div>
              <div>粉丝数</div>
              <div v-if="user.isLogin == true">{{ user.userOtherInfo.followMe }}</div>
              <div v-else>{{ users.userOtherInfo.followMe }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import tools from '@/js/tools'
import logger from '@/js/logger'
import PageComp from '@/components/PageComp.vue'

let app
export default {
  components: { PageComp },
  name: 'UserBody',
  data() {
    return {
      title: '我的主页',
      isUser: false,
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
        ModifyInfoVisible: true,
        Allloading: false,
        firstLoading: true,
        secondLoading: true,
        thirdLoading: true,
        fourthLoading: true,
      },
      updateModifyINfo: {
        img: '',
        info: '',
        nickname: '',
        qq: '',
        sex: '',
        wechat: '',
      },
      // 标签
      activeName: 'first',
      // 个人动态
      queryMessage: {
        orderBy: 1,
        info: '',
        username: '',
      },
      messageList: [],
      messagePage: { pageSize: 5 },
      // 个人评论
      replyByList: [],
      replyPage: { pageSize: 5 },
      // 关注列表和粉丝列表
      queryusername: {},
      concernList: [],
      concernPage: { pageSize: 5 },
      followersList: [],
      followersPage: { pageSize: 5 },
      // 判断动态、评论、关注、粉丝是否有值
    }
  },

  methods: {
    queryLocstionUser() {
      this.Visible.All = true
      this.queryString = decodeURIComponent(this.$route.params.username)
      this.queryUser()
    },
    // 判断性别
    isSex() {
      if (this.user.tbUserInfo.sex == 'm') {
        return '男'
      } else if (this.user.tbUserInfo.sex == 'n') {
        return '女'
      } else {
        return '保密'
      }
    },
    // 获取信息
    queryUser() {
      this.isUser = true
      if (this.user.tbUser.username != this.queryString) {
        //查看别人登录界面
        this.isUser = false
        this.Visible.Iusername = false
        tools.ajax('/user/auth/getUserInfoByName', { username: this.queryString }, (data) => {
          this.users.tbUser = data.tbUser
          this.users.tbUserInfo = data.tbUserInfo
          this.users.userOtherInfo = data.userOtherInfo
        })
      }
      this.Visible.All = false
    },
    // 退出
    jumpRouting() {
      if (decodeURIComponent(this.$route.hash)) {
        this.$router.push('/index/userbody/' + encodeURIComponent(decodeURIComponent(this.$route.hash).replace('#', '')))
      } else {
        this.$router.push('/index')
      }
    },
    // 修改头像
    avatarModify() {
      let fid = tools.isDowkiadUrl(this.user.tbUserInfo.img)
      this.Visible.ModifyVisible = true
      this.file.files = ''
      tools.openFile((selfile) => {
        // logger.debug('选择的文件', selfile)
        this.file.files = selfile
        if (!this.file.files) {
          // logger.debug('没有选择图片')
        } else {
          tools.upload('/user/file/upload', { fileinfo: this.file.fileInfo }, this.file.files.file, (data) => {
            if (data.success) {
              this.queryfile()
              this.Visible.ModifyVisible = false
              this.updateModifyINfo.img = tools.getDownloadUrl(data.data.fid)
              if (fid != -1) {
                tools.ajax('/user/file/delete', { fid: fid }, () => {})
              }
              this.modifyAjax()
            } else {
              this.$message.error(data.message)
            }
          })
        }
      })
    },
    // 修改昵称
    showModifyNickname() {
      this.Visible.nickname = false
      this.showModinfyInfo()
    },
    modifyNickname() {
      this.modifyAjax()
      this.Visible.nickname = true
    },
    modifyTranslation() {
      this.Visible.ModifyInfoVisible = true
      this.modifyAjax()
    },
    // 修改附加信息的ajax
    modifyAjax() {
      tools.ajax('/user/auth/updateUserInfo', this.updateModifyINfo, (data) => {
        data.success ? this.$message({ type: 'success', message: data.message }) : this.$message.error(data.message)
        if (data.success == true) {
          this.$message({ type: 'success', message: data.message })
          this.$store
            .dispatch('updateUserInfo')
            .then(app.showModinfyInfo, (app.Visible.All = false))
            .catch()
        }
      })
    },
    showClikenModifyNuckname() {
      this.Visible.ModifyVisible = true
      this.showModinfyInfo()
    },
    closeClikeModifyNickname() {
      this.Visible.ModifyVisible = false
      this.Visible.nickname = true
    },
    // 将用户信息放入页面修改的modify
    showModinfyInfo() {
      this.updateModifyINfo.img = this.user.tbUserInfo.img
      this.updateModifyINfo.info = this.user.tbUserInfo.info
      this.updateModifyINfo.nickname = this.user.tbUser.nickname
      this.updateModifyINfo.qq = this.user.tbUserInfo.qq
      this.updateModifyINfo.sex = this.user.tbUserInfo.sex
      this.updateModifyINfo.wechat = this.user.tbUserInfo.wechat
    },
    iconfontClickModifyInfo() {
      this.showModinfyInfo()
      this.Visible.ModifyInfoVisible = false
    },
    // 个人动态
    queryMessageAjax() {
      this.Visible.firstLoading = true
      if (this.queryString != this.user.tbUser.username) {
        this.queryMessage.info = this.queryString
      } else {
        this.queryMessage.info = this.user.tbUser.username
      }
      tools.ajax('/message/queryAll', tools.concatJson(this.queryMessage, this.messagePage), (data) => {
        logger.debug('sadfiojlmgrnlkmhg;动态', this.queryusername.username)
        this.messageList = data.list
        this.Visible.firstLoading = false
        this.messagePage = data.page
      })
    },
    queryMessage_date(umid) {
      this.$router.push({
        path: '/index/messagedata/' + encodeURIComponent(umid),
        hash: encodeURIComponent(this.queryString),
      })
    },
    // 个人评论
    queryReplyByAjax() {
      if (this.queryString != this.user.tbUser.username) {
        this.queryMessage.username = this.queryString
      } else {
        this.queryMessage.username = this.user.tbUser.username
      }
      this.Visible.secondLoading = true
      tools.ajax('/message/queryReplyByUsername', tools.concatJson(this.queryMessage, this.replyPage), (data) => {
        logger.debug('sadfiojlmfjhhgrnlkm;评论', this.queryusername.username)
        this.Visible.secondLoading = false
        this.replyByList = data.list
        this.replyPage = data.page
      })
    },
    // 取消关注与回关
    queryReturnAjax(usernameS) {
      this.loading = true
      usernameS.judgment = false
      tools.ajax('/message/followUser', { username: usernameS.user.username }, (data) => {
        if (data.success) {
          this.$message({ message: data.message, type: 'success' })
          // this.queryConcernAjax()
          if (data.message == '关注用户成功') {
            usernameS.judgment = true
          }
        } else {
          this.$message.error(data.message)
        }
        this.loading = false
      })
    },
    // 关注
    queryConcernAjax() {
      if (this.queryString != this.user.tbUser.username) {
        this.queryusername.username = this.queryString
      } else {
        this.queryusername.username = this.user.tbUser.username
      }
      this.Visible.thirdLoading = true
      tools.ajax('/message/queryFollowUserList', tools.concatJson(this.queryusername, this.concernPage), (data) => {
        logger.debug('sadfiojlm,jhmgrnlkm;关注', this.queryusername.username)
        this.Visible.thirdLoading = false
        this.concernList = data.list
        for (let i = 0; i < this.concernList.length; i++) {
          this.concernList[i].judgment = true
        }
        this.concernPage = data.page
      })
    },
    // 粉丝
    queryFollowersAjax() {
      if (this.queryString != this.user.tbUser.username) {
        this.queryusername.username = this.queryString
      } else {
        this.queryusername.username = this.user.tbUser.username
      }
      this.Visible.fourthLoading = true
      tools.ajax('/message/queryFollowMeUserListByName', tools.concatJson(this.queryusername, this.followersPage), (data) => {
        logger.debug('sadfiojlmgrmdfxgnxnlkm;粉丝', this.queryusername.username)
        this.followersList = data.list
        this.followersPage = data.page
        for (let i = 0; i < this.followersList.length; i++) {
          this.followersList[i].judgment = true
        }
        this.Visible.fourthLoading = false
      })
    },
    ifTabs() {
      if (this.activeName == 'first') {
        this.queryMessageAjax()
      }
      if (this.activeName == 'second') {
        this.queryReplyByAjax()
      }
      if (this.activeName == 'third') {
        this.queryConcernAjax()
      }
      if (this.activeName == 'fourth') {
        this.queryFollowersAjax()
      }
      window.scrollTo({
        top: document.documentElement.scrollTop,
        behavior: 'smooth',
      })
    },
    handleWatchEnter(e) {
      var key = window.event ? e.keyCode : e.which
      console.log('查看按键', key)
    },
  },
  computed: {
    user() {
      return this.$store.state.loginUser
    },
  },
  mounted() {
    const that = this
    window.addEventListener('keydown', that.handleWatchEnter)
    logger.debug('-------------', document.documentElement.scrollTop)
    if (document.documentElement.scrollTop == 50) {
      logger.debug('---------------------------------')
      // el-page-header
      // document.getElementById('toStyle').style.backgroundColor = '#000'
    }
  },
  created() {
    app = this
    this.queryLocstionUser()
    this.queryMessageAjax()
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  },
  destroyed() {
    window.removeEventListener('keydown', this.handleWatchEnter) //  离开页面清除（移除）滚轮滚动事件
  },
}
</script>
<style scoped>
@import url(@/css/user/UserBody.css);
@import 'https://cdn.bootcdn.net/ajax/libs/font-awesome/6.2.0/css/all.css';
</style>
