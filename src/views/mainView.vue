<template>
  <div>
    <div class="quanping">
      <el-header class="center_top">
        <div class="top_left">
          <li @click="pinghuagundong1()">
            Home
            <span :class="{ spanwidth: tab == 1 }"></span>
          </li>
          <li @click="pinghuagundong2()">
            Message
            <span :class="{ spanwidth: tab == 2 }"></span>
          </li>
          <li @click="pinghuagundong3()">
            About
            <span :class="{ spanwidth: tab == 3 }"></span>
          </li>
        </div>
        <div class="top_right">
          <div>
            <input v-model="boardquery.info" type="text" />
            <i class="el-input__icon iconfont" @click="queryboard">&#xe86e;</i>
          </div>
          <li>
            <span @click="Visible.drawerVisible = true">
              <img :src="user.tbUserInfo.img" alt="" />
            </span>
          </li>
        </div>
      </el-header>
    </div>
    <div class="data_message_main">
      <el-main v-loading="boardloging">
        <!-- {{ boardlist }} -->
        <div class="mainflex">
          <!-- 左边的留言主体信息 -->
          <div>
            <el-row v-for="d in boardlist" :key="d.umid">
              <el-card class="liuyanflex" shadow="always" @click="message_data(d.umid)">
                <div @click="userMains(d.user.username)">
                  <img :src="d.userInfo.img" alt="" />
                </div>
                <div class="userInfo">
                  <div @click="message_data(d.umid)">{{ d.title }}</div>
                  <div>
                    <div @click="userMains(d.user.username)">
                      {{ d.user.nickname }}
                    </div>
                    <div @click="userMains(d.user.username)">
                      {{ d.user.username }}
                    </div>
                  </div>
                  <div>{{ d.lastupdate | formatDate }}</div>
                  <div>
                    <div @click="message_data(d.umid)" v-if="d.replyCount != 0"><i class="el-input__icon iconfont">&#xe891;</i> {{ d.replyCount }}条评论 </div>
                    <div @click="message_data(d.umid)" v-else><i class="el-input__icon iconfont">&#xe891;</i> 我去评论 </div>
                    <div @click="praiseclick(d.umid)">
                      <span v-if="d.praise" class="praise">
                        <i class="el-input__icon iconfont">&#xec7f;</i>
                        已点赞{{ d.praiseCount }}
                      </span>
                      <span v-else>
                        <i class="el-input__icon iconfont">&#xec7f;</i>
                        点赞{{ d.praiseCount }}
                      </span>
                    </div>
                    <div @click="user.isLogin ? (Visible.reportVisible = true) : (Visible.loginVisible = false)"><i class="el-input__icon iconfont">&#xe66b;</i> 举报 </div>
                  </div>
                </div>
              </el-card>
            </el-row>
          </div>
          <!-- 右边的个人信息 -->
          <div class="userInforinght">
            <el-row>
              <el-card shadow="hover">
                <div class="reightuser">
                  <div style="cursor: pointer" @click="userMain">
                    <img :src="user.tbUserInfo.img" alt="" />
                  </div>
                  <div style="cursor: pointer" @click="userMain"> {{ user.tbUser.nickname }} </div>
                  <div style="display: flex">
                    <div>
                      <li>留言</li>
                      <li>{{ user.userOtherInfo.message }}</li>
                    </div>
                    <div>
                      <li>评论</li>
                      <li>{{ user.userOtherInfo.reply }}</li>
                    </div>
                  </div>
                  <div>
                    <el-button @click="user.isLogin ? (Visible.publishVisible = true) : (Visible.loginVisible = false)"> 留言 </el-button>
                  </div>
                </div>
              </el-card>
            </el-row>
          </div>
        </div>
      </el-main>
    </div>
    <div> 个性消息还未想好 </div>
    <div class="data_message_main">
      <div class="mainpagefooter">
        <el-pagination background @current-change="queryboard" :current-page.sync="boardpage.pageNumber" :page-size.sync="boardpage.pageSize" :total.sync="boardpage.total" layout=" total,prev, pager, next, jumper"> </el-pagination>
      </div>
    </div>
    <!-- 侧边栏 -->
    <el-drawer title="侧边栏功能导航" :visible.sync="Visible.drawerVisible" direction="rtl" :close-on-click-modal="true">
      <div class="right_drawer" v-if="!user.isLogin">
        <div @click="loctionlogin()">
          <img src="https://klcxy.top/oss-manage-service/ossinfo/queryOssUrl?tbOssInfo.oiid=529" alt="" />
        </div>
        <div>
          <el-button @click="loctionlogin()">请登录</el-button>
        </div>
      </div>
      <div class="right_drawer_login_in" v-else>
        <div @click="userMain()">
          <img :src="user.tbUserInfo.img" alt="" />
        </div>
        <div>{{ user.tbUser.username }}</div>
        <div>
          <a @click="userMain()" href="javascript:viod(0)"> <i class="iconfont">&#xe749;</i>个人主页</a>
        </div>
        <div>
          <a @click="userMain()" href="javascript:viod(0)"> <i class="iconfont">&#xe86f;</i>消息中心 </a>
        </div>
        <div>
          <a @click="userMain()" href="javascript:viod(0)"><i class="iconfont">&#xe64b;</i> 相关设计 </a>
        </div>
        <div>
          <a @click="userMain()" href="javascript:viod(0)"><i class="iconfont">&#xe605;</i> 退出登录</a>
        </div>
      </div>
    </el-drawer>
    <!-- 发布留言 -->
    <el-dialog class="publishVisible" title="发布留言" :center="true" :visible.sync="Visible.publishVisible" :close-on-click-modal="true" @closed="queryboard">
      <el-input v-model="publishquery.title">
        <i slot="prepend">留言标题</i>
      </el-input>
      <el-input v-model="publishquery.info">
        <i slot="prepend">留言信息</i>
      </el-input>
      <span class="reportfooter" slot="footer">
        <el-button @click="Visible.publishVisible = false">取 消</el-button>
        <el-button type="primary" @click="publishclick()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 举报留言 -->
    <el-dialog title="留言" :center="true" :close-on-click-modal="false" :visible.sync="Visible.reportVisible">
      <el-input v-model="reportInfo" placeholder="举报原因">
        <i slot="prepend">举报原因</i>
      </el-input>
      <span class="reportfooter" slot="footer">
        <el-button @click="Visible.reportVisible = false">取 消</el-button>
        <el-button type="primary" @click="reportclick(d.umid)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 请先登录 -->
    <el-dialog class="VisibleLogin" :center="true" :visible.sync="Visible.loginVisible" :close-on-click-modal="true">
      <div class="VisibleLogin_div">请先登录</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Visible.loginVisible = false">取 消</el-button>
        <el-button type="primary" @click="visibleLogin()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import tools from '@/js/tools'
import logger from '@/js/logger'
let app
export default {
  name: 'HomeView',
  data() {
    return {
      title: 'liuguanghui的vue脚手架项目开发中',
      tab: 1,
      // 查询留言
      boardpage: { pageSize: 5 },
      boardquery: {
        info: '',
        orderBy: 1,
      },
      boardlist: {},
      // 页面
      boardloging: false,
      reportInfo: '',
      Visible: {
        //举报loading
        reportVisible: false,
        // 发布留言信息
        publishVisible: false,
        // 侧边栏的visible
        drawerVisible: false,
        // 请先登录
        loginVisible: false,
      },
      publishquery: {
        title: '',
        info: '',
      },
    }
  },
  methods: {
    pinghuagundong1() {
      this.tab = 1
      // tabScorllto.get(this.tab)
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    },
    pinghuagundong2() {
      this.tab = 2
      window.scrollTo({
        top: 731,
        behavior: 'smooth',
      })
    },
    pinghuagundong3() {
      this.tab = 3
      window.scrollTo({
        top: 1000,
        behavior: 'smooth',
      })
    },
    // 进入login界面
    loctionlogin() {
      this.$router.push('/login')
    },
    visibleLogin() {
      this.Visible.loginVisible = false
      this.loctionlogin()
    },
    // 进入我的主页的方法
    userMain() {
      if (this.user.tbUser.username != null) {
        location = location.href + '/userbody?' + this.user.tbUser.username
      } else {
        this.loctionlogin()
      }
    },
    userMains(loction) {
      location = location.href + '/userbody?' + loction
    },
    // 退出
    userup() {
      tools.ajax('/user/auth/logout', {}, (data) => {
        if (data.success) {
          this.$store.commit('removeUserInfo')
        }
        this.$message({
          type: 'success',
          message: '成功退出',
        })
      })
    },
    // 导航条上面的点击效果
    //开始查询留言版信息
    queryboard() {
      tools.ajax('/message/queryAll', tools.concatJson(this.boardquery, this.boardpage), (data) => {
        if (data.success) {
          this.boardlist = data.list
          for (let i = 0; i < this.boardlist.length; i++) {
            if (this.boardlist[i].userInfo.img == '') {
              this.boardlist[i].userInfo.img = 'https://klcxy.top/oss-manage-service/ossinfo/queryOssUrl?tbOssInfo.oiid=529'
            }
          }
          this.boardpage = data.page
          logger.debug('留言版信息', data.list)
        } else {
          this.$message({ message: data.message, type: 'danger' })
        }
      })
    },
    //留言的点赞与取消
    praiseclick(info) {
      tools.ajax('/message/support', { umid: info }, (data) => {
        data.success ? this.$message({ message: data.message, type: 'success' }) : this.$alert(data.message)
        this.queryboard()
      })
    },
    // 举报
    reportclick(umid) {
      tools.ajax('/message/examine', { umid: umid, info: app.reportInfo }, (data) => {
        this.Visible.reportVisible = false
        if (data.success) {
          this.$message({ message: '举报成功', type: 'success' })
        } else {
          this.$message({ message: '举报失败', tyep: 'danger' })
        }
      })
    },
    // 发布留言
    publishclick() {
      this.boardloging = true
      tools.ajax('/message/add', this.publishquery, (data) => {
        this.boardloging = false
        this.Visible.publishVisible = false
        if (data.success) {
          this.$message({ type: 'success', message: this.publishquery.title + '发布成功' })
          this.queryboard()
        } else {
          this.$message({ type: 'danger', message: data.message })
        }
      })
    },
    // 点击留言跳转评论
    message_data(umid) {
      location.href = location.href + '/messagedata?umid=' + umid
    },
  },
  computed: {
    user() {
      return this.$store.state.loginUser
    },
  },
  created() {
    app = this
    this.queryboard()
    if (this.user.tbUserInfo.img == null) {
      this.user.tbUserInfo.img = 'https://klcxy.top/oss-manage-service/ossinfo/queryOssUrl?tbOssInfo.oiid=529'
      logger.debug('查看没有登录有哪些参数', this.user.tbUser.accessKey)
    } else {
      logger.debug('查看没有登录有哪些参数', this.user)
    }
  },
}
</script>

<style scoped>
@import url(@/css/index.css);
.reportfooter {
  display: flex;
  justify-content: flex-end;
}
</style>
