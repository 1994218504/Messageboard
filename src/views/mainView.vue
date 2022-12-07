<template>
  <div>
    <div class="quanping">
      <div class="center_top">
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
            <input v-model="boardquery.info" type="text" placeholder="搜索文章" />
            <i class="el-input__icon iconfont" @click="queryboard">&#xe86e;</i>
          </div>
          <li>
            <span @click="Visible.drawerVisible = true">
              <img v-if="user.isLogin" :src="user.tbUserInfo.img" alt="" />
              <img v-else src="https://klcxy.top/oss-manage-service/ossinfo/queryOssUrl?tbOssInfo.oiid=544" alt="" />
            </span>
          </li>
        </div>
      </div>
      <div class="wenan">
        <p>{{ text.info }}<span>|</span></p>
      </div>
    </div>
    <div class="data_message_main">
      <div v-loading="boardloging">
        <!-- {{ boardlist }} -->
        <div class="mainflex">
          <!-- 左边的留言主体信息 -->
          <div>
            <ul v-for="d in boardlist" :key="d.umid">
              <li class="liuyanflex" shadow="always">
                <div @click="userMains(d.user.username)">
                  <img :src="d.userInfo.img" alt="" />
                </div>
                <div class="userInfo">
                  <div>
                    <div @click="userMains(d.user.username)">
                      {{ d.user.nickname }}
                    </div>
                    <div @click="userMains(d.user.username)"> （{{ d.user.username }}） </div>
                  </div>
                  <div @click="message_data(d.umid)">{{ d.title }}</div>
                  <div>
                    <ul>{{
                      d.lastupdate | formatDate
                    }}</ul>
                    <ul>
                      <div><i class="iconfont">&#xe604;</i> {{ d.hits }} </div>
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
                      <div @click="reportclickLoading(d.umid)"><i class="el-input__icon iconfont">&#xe66b;</i> 举报 </div>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 右边的个人信息 -->
          <div class="userInforinght">
            <div class="box_show_row_card">
              <div class="reightuser">
                <div style="cursor: pointer" @click="userMain">
                  <img class="imgstyle" v-if="user.isLogin" :src="user.tbUserInfo.img" alt="" />
                  <img class="imgstyle" v-else src="https://klcxy.top/oss-manage-service/ossinfo/queryOssUrl?tbOssInfo.oiid=544" alt="" />
                </div>
                <div style="cursor: pointer" @click="userMain"> {{ user.tbUser.nickname }} </div>
                <div v-if="user.isLogin" style="display: flex">
                  <div>
                    <li>留言</li>
                    <li>{{ user.userOtherInfo.message }}</li>
                  </div>
                  <div>
                    <li>评论</li>
                    <li>{{ user.userOtherInfo.reply }}</li>
                  </div>
                </div>
                <div v-if="user.isLogin">
                  <el-button @click="publishclicIsLogin()"> 留言 </el-button>
                </div>
                <div v-else>
                  <el-button @click="loctionlogin()">登录</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mainpagefooter"> <page-comp :page.sync="boardpage" @change-page="queryboard" layout=" total,prev,pager,next"></page-comp></div>
    <!-- 底部个性消息 -->
    <div class="body_fotter_back">
      <div class="body_footer">
        <div>
          <div>
            <div>
              <i class="iconfont">&#xe655;</i>
              关于
            </div>
          </div>
          <div> 这里是简易留言板的操作系统，本系统由设计Element UI及刘光辉的指导设计，框架方面使用Vue2组件开发，使用便捷，操作简单，该还项目还处于开发中，系统不够完善，如果您好的意见或想法可以联系我，持续开发中。 </div>
        </div>
        <div>
          <div>
            <div>
              <i class="iconfont">&#xe749;</i>
              友情链接
            </div>
          </div>
          <div>
            <a target="_blank" href="https://liuguanghui.vip/">主页</a>
            <a target="_blank" href="">墨池CEO</a>
            <a target="_blank" href="https://huhuiyu.top/index-main.html#FrontPage">胡老师</a>
            <a target="_blank" href="https://gaopeng623.top/">高鹏</a>
            <a target="_blank" href="https://luizhen.top/">刘真</a>
          </div>
        </div>
        <div>
          <div>
            <div>
              <i class="iconfont">&#xe612;</i>
              关于作者
            </div>
          </div>
          <div>
            <img src="https://klcxy.top/oss-manage-service/ossinfo/queryOssUrl?tbOssInfo.oiid=551" alt="" />
          </div>
        </div>
      </div>
    </div>
    <!-- 侧边栏 -->
    <el-drawer title="侧边栏功能导航" :visible.sync="Visible.drawerVisible" direction="rtl" :close-on-click-modal="true">
      <div class="right_drawer" v-if="!user.isLogin">
        <div @click="loctionlogin()">
          <img src="https://klcxy.top/oss-manage-service/ossinfo/queryOssUrl?tbOssInfo.oiid=544" alt="" />
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
          <a @click="userMain()" href="javascript:viod(0)"><i class="iconfont">&#xe64b;</i> 相关设置 </a>
        </div>
        <div>
          <a @click="userup()"><i class="iconfont">&#xe605;</i> 退出登录</a>
        </div>
      </div>
    </el-drawer>
    <!-- 发布留言 -->
    <el-dialog class="publishVisible" title="发布留言" :center="true" :visible.sync="Visible.publishVisible" :close-on-click-modal="true" @closed="queryboard">
      <el-form>
        <el-form-item placeholder="标题">
          <el-input placeholder="标题" v-model="publishquery.title"></el-input>
        </el-form-item>
      </el-form>
      <wang-editor-comp @editor-created="editorCreated" @editor-change="editorChange"></wang-editor-comp>
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
import WangEditorComp from '@/components/WangEditorComp.vue'
import PageComp from '@/components/PageComp.vue'
import axios from 'axios'
const instance = axios.create()
let app
export default {
  components: { WangEditorComp, PageComp },
  name: 'MainView',
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
      // 富文本
      demo: {
        info: '',
        htmlInfo: '',
        text: '',
      },
      text: {
        textinfo: '',
        textinfos: '由于网络原因加载不出来，抱歉',
        info: '',
        index: -1,
      },
    }
  },
  methods: {
    //上面的导航条
    pinghuagundong1() {
      this.tab = 1
      // tabScorllto.get(this.tab)
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    },
    //上面的导航条
    pinghuagundong2() {
      this.tab = 2
      window.scrollTo({
        top: 731,
        behavior: 'smooth',
      })
    },
    //上面的导航条
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
    // 退出
    visibleLogin() {
      this.Visible.loginVisible = false
      this.loctionlogin()
    },
    // 进入我的主页的方法
    userMain() {
      if (this.user.tbUser.username != null) {
        this.$router.push('/index/userbody/' + encodeURIComponent(this.user.tbUser.username))
      } else {
        this.Visible.loginVisible = true
      }
    },
    // 进入别人的首页
    userMains(loction) {
      this.$router.push('/index/userbody/' + encodeURIComponent(loction))
    },
    // 退出
    userup() {
      tools.ajax('/user/auth/logout', {}, (data) => {
        if (data.success) {
          this.Visible.drawerVisible = false
          this.$store.commit('removeUserInfo')
          logger.debug('退出登录后查看信息', this.user)
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
              this.boardlist[i].userInfo.img = 'https://klcxy.top/oss-manage-service/ossinfo/queryOssUrl?tbOssInfo.oiid=544'
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
      if (this.user.isLogin == true) {
        tools.ajax('/message/support', { umid: info }, (data) => {
          data.success ? this.$message({ message: data.message, type: 'success' }) : this.$alert(data.message)
          this.queryboard()
        })
      } else {
        this.Visible.loginVisible = true
      }
    },
    // 举报前是否登录
    reportclickLoading() {
      if (this.user.isLogin == true) {
        this.Visible.reportVisible = true
      } else {
        this.Visible.loginVisible = true
      }
    },
    // 举报
    reportclick(umid) {
      if (this.user.isLogin) {
        tools.ajax('/message/examine', { umid: umid, info: app.reportInfo }, (data) => {
          this.Visible.reportVisible = false
          if (data.success) {
            this.$message({ message: '举报成功', type: 'success' })
          } else {
            this.$message({ message: '举报失败', tyep: 'danger' })
          }
        })
      } else {
        this.Visible.loginVisible = true
      }
    },
    // 发布留言前是否登录
    publishclicIsLogin() {
      if (this.user.isLogin == true) {
        this.Visible.publishVisible = true
      } else {
        this.Visible.loginVisible = true
      }
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
      this.$router.push('/index/messagedata/' + encodeURIComponent(umid))
    },
    editorCreated(editor) {
      logger.debug('富文本框实例对象，', editor)
    },
    editorChange(info, text) {
      // 富文本框值变化后触发本事件，第一个参数是第文本框的html格式内容，二个参数是纯文本内容,可以用于判定是否输入了信息
      this.demo.htmlInfo = info
      this.demo.text = text
      if (text != null) {
        this.publishquery.info = this.demo.htmlInfo
      }
    },
    // 随机文案的api
    suijiwenan() {
      instance
        .post('https://api.gmit.vip/Api/WaSentence')
        .then((res) => {
          if (res.data.code == 200) {
            this.text.textinfo = ' '
            this.text.textinfo = res.data.data.text
            this.chuxian()
          }
        })
        .catch((err) => {
          logger.debug(err)((this.text.textinfo = '由于网络原因加载不出文案'))
          this.chuxian()
        })
    },
    // 字体出现
    chuxian() {
      let time
      this.text.index = 0
      time = setInterval(() => {
        this.text.info = this.text.textinfo.substring(-1, this.text.index)
        this.text.index++
        if (this.text.index > this.text.textinfo.length) {
          clearInterval(time)
          this.xiaoshi()
        }
      }, 200)
    },
    // 文字消失
    xiaoshi() {
      setTimeout(() => {
        let time
        time = setInterval(() => {
          this.text.info = this.text.textinfo.substring(-1, this.text.index)
          this.text.index--
          if (this.text.index == -1) {
            clearInterval(time)
            this.suijiwenan()
          }
        }, 100)
      }, 2000)
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
    logger.debug('查看没有登录有哪些参数', this.user)
    this.suijiwenan()
    logger.debug(tools.md5('user-pwd'))
  },
}
</script>

<style scoped>
@import url(@/css/common.css);
@import url(@/css/index.css);
.reportfooter {
  display: flex;
  justify-content: flex-end;
}
</style>
