<template>
  <div class="center">
    <!-- {{ messageinfo }} -->
    <el-page-header @back="jumpRouting()" content="留言详细信息"> </el-page-header>
    <div>
      <div class="box_show">
        <!-- 发帖人信息 -->
        <div class="main_top">
          <div>
            <div class="main_top_left">
              <div>
                <img :src="messageinfo.userInfo.img" alt="" />
              </div>
              <div>
                <li>{{ messageinfo.user.nickname }}</li>
                <li>{{ messageinfo.lastupdate | formatDate }}</li>
              </div>
            </div>
            <div v-if="messageinfo.mine == false">
              <div class="main_top_right" v-if="messageinfo.userOtherInfo.mineFollow">
                <span @click="concern()"><el-button type="primary" plain>取消关注</el-button></span>
                <span><el-button>私信</el-button></span>
              </div>
              <div @click="concern()" v-else>
                <span> <el-button type="primary">关注</el-button></span>
              </div>
            </div>
            <div v-else>
              <div></div>
            </div>
          </div>
        </div>
        <!-- 帖子信息 -->
        <div class="userinfo">
          <div>标题：{{ messageinfo.title }}</div>
          <div class="center_info" v-if="messageinfo" v-html="messageinfo.info"> </div>
          <div class="center_click">
            <div @click="praiseclick()" v-if="messageinfo.praise == false">
              <i class="el-input_icon iconfont">&#xec7f;</i>
              <span>点赞{{ messageinfo.praiseCount }}</span>
            </div>
            <div @click="praiseclick()" v-else class="praises">
              <i class="el-input_icon iconfont">&#xec7f;</i>
              <span>已点赞{{ messageinfo.praiseCount }}</span>
            </div>
            <div @click="Visible.reportVisible = true">
              <i class="el-input_icon iconfont">&#xe66b;</i>
              <span>举报</span>
            </div>
          </div>
        </div>
        <!-- 评论信息 -->
        {{ messagepage.total }}
        <div class="comments_concern">
          <el-tabs v-model="activeName" type="card" @tab-click="ifTabs">
            <el-tab-pane label="评论" name="first" v-loading="loading.postloading">
              <div v-loading="Visible.firstLoading" v-if="messagepage.total != 0">
                <div class="hottestLatese">
                  <span @click="hottestLateseTabOne()" :class="{ fontcolor: tab == 1 }">最新<i class="iconfont">&#xe603;</i></span>
                  <span>|</span>
                  <span @click="hottestLateseTabTwo()" :class="{ fontcolor: tab == 2 }">最热<i class="iconfont">&#xe603;</i></span>
                </div>
                <div class="message_list_plun">
                  <div>
                    <textarea v-model="addreplay.info" placeholder="发条友善的评论吧"></textarea>
                  </div>
                  <div style="padding-top: 8px">
                    <el-button @click="AddReplayclick()">发送</el-button>
                  </div>
                </div>
                <div v-for="d in messagelist" :key="d.umrid">
                  <div class="commentslists">
                    <li>
                      <div>
                        <img @click="Message_data(d.user.username)" :src="d.userInfo.img" alt="" />
                      </div>
                      <div>
                        <div @click="Message_data(d.user.username)">{{ d.user.nickname }}</div>
                        <p v-html="d.info"></p>
                      </div>
                    </li>
                    <li>
                      <span>
                        <div>{{ d.lastupdate | formatDate }}</div>
                      </span>
                      <span>
                        <div v-if="d.praise == false">
                          <i @click="Commentsclick(d.umrid)" class="input_icon iconfont">&#xec7f;</i>
                          <span @click="Commentsclick(d.umrid)">点赞{{ d.praiseCount }}</span>
                        </div>
                        <div class="praises" v-else>
                          <i @click="Commentsclick(d.umrid)" class="input_icon iconfont">&#xec7f;</i>
                          <span @click="Commentsclick(d.umrid)">已点赞{{ d.praiseCount }}</span>
                        </div>
                        <div v-if="d.mine">
                          <i @click="DeleMessageList(d.umrid)" class="input_icon iconfont">&#xe68e;</i>
                          <div @click="DeleMessageList(d.umrid)">删除</div>
                        </div>
                        <div>
                          <i class="input_icon iconfont">&#xe66b;</i>
                          <div>举报</div>
                        </div>
                      </span>
                    </li>
                  </div>
                </div>
                <div class="pagecenter" v-if="messagepage.pageCount >= 2">
                  <page-comp :page.sync="messagepage" @change-page="querymessagedata" layout=" total,prev,pager,next"></page-comp>
                </div>
              </div>
              <div v-else>
                <el-empty description="没有热评"></el-empty>
              </div>
            </el-tab-pane>

            <el-tab-pane label="点赞" name="second">
              <div v-loading="Visible.secondLoading" v-if="messagepage.total != 0">
                <div v-for="d in concernlist" :key="d.umrid">
                  <div class="commentslistconcern">
                    <li>
                      <div @click="Message_data(d.user.username)" style="margin-top: 20px">
                        <img :src="d.userInfo.img" alt="" />
                      </div>
                      <div @click="Message_data(d.user.username)">
                        <div style="color: #fff">liu</div>
                        <p>{{ d.user.nickname }}</p>
                        <div></div>
                      </div>
                    </li>
                    <li>
                      <div v-if="d.userOtherInfo.mineFollow == false">
                        <span @click="dianzanguanzhu(d.user.username)"> <el-button type="primary">关注</el-button></span>
                      </div>
                      <div @click="dianzanguanzhu(d.user.username)" v-else>
                        <span> <el-button type="primary" plain>取消关注</el-button></span>
                      </div>
                    </li>
                  </div>
                  <hr />
                </div>
              </div>
              <div v-else>
                <el-empty description="没有点赞"></el-empty>
              </div>
              <div class="pagecenter" v-if="messagepage.pageCount >= 2">
                <page-comp :page.sync="messagepage" @change-page="querymessagedata" layout=" total,prev,pager,next"></page-comp>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <!-- 评论 -->
    <div class="bushcomments">
      <div>
        <el-form status-icon :model="addreplay">
          <el-form-item prop="info">
            <el-input placeholder="请输入评论内容" v-model="addreplay.info" clearable>
              <li slot="append">
                <el-button @click="AddReplayclick()"> 发布评论</el-button>
              </li>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 举报 -->
    <el-dialog title="举报留言" :center="true" :close-on-click-modal="false" :visible.sync="Visible.reportVisible">
      <el-input v-model="repsort.reportInfo" placeholder="举报原因">
        <li slot="prepend">举报原因</li>
      </el-input>
      <span class="reportfooter" slot="footer">
        <el-button @click="Visible.reportVisible = false">取 消</el-button>
        <el-button type="primary" @click="reportclick()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 提示登录的情况 -->
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
import PageComp from '@/components/PageComp.vue'
let app
export default {
  components: { PageComp },
  name: 'MessageDate',
  data() {
    return {
      title: '具体评论界面',
      umid: '',
      tab: 2, //最新与最热的区别
      messagequery: {
        umid: '',
        orderBy: 1,
      },
      messagepage: {
        pageSize: 5,
      },
      // 评论排序方式，1：按照评论时间升序(默认)，2：按照评论时间降序，3：按照点赞数降序，4：按照点赞数升序
      messageinfo: {
        user: '',
        userInfo: '',
      },
      Visible: {
        //发帖人的信息
        reportVisible: false,
        // 登录的组件
        loginVisible: false,
        // 加载评论或者关注的
        firstLoading: true,
        secondLoading: true,
      },
      // 帖子举报原因
      repsort: {
        reportInfo: '',
        umid: '',
      },
      //下面评论人的信息
      messagelist: [],
      // 留言
      addreplay: {
        info: '',
        umid: '',
        nickname: '',
      },
      // 帖子的点赞用户信息
      concernlist: [],
      loading: {
        postloading: false,
      },
      // 标签
      activeName: 'first',
    }
  },
  methods: {
    //进入登录界面
    visibleLogin() {
      this.$router.push('/login')
    },
    // 查询贴子信息
    querymessagedata() {
      this.Visible.firstLoading = true
      tools.ajax('/message/queryDetail', tools.concatJson(this.messagequery, this.messagepage), (data) => {
        this.Visible.firstLoading = false
        this.messageinfo = data.info
        if (this.messageinfo.userInfo.img == '') {
          this.messageinfo.userInfo.img = 'https://klcxy.top/oss-manage-service/ossinfo/queryOssUrl?tbOssInfo.oiid=544'
        }
        // 判断最新最热
        this.messagelist = data.list
        // 判断评论没有图片的时候
        for (let i = 0; i < this.messagelist.length; i++) {
          if (this.messagelist[i].userInfo.img == '') {
            this.messagelist[i].userInfo.img = 'https://klcxy.top/oss-manage-service/ossinfo/queryOssUrl?tbOssInfo.oiid=544'
          }
        }
        this.messagepage = data.page
      })
    },
    hottestLateseTabOne() {
      this.tab = 2
      logger.debug('点击最新', this.tab)
      this.messagequery.orderBy = 1
      this.querymessagedata()
    },
    hottestLateseTabTwo() {
      this.tab = 1
      logger.debug('点击最热', this.tab)
      this.messagequery.orderBy = 3
      this.querymessagedata()
    },
    // 关注和取消关注
    concern() {
      if (this.user.isLogin == true) {
        tools.ajax('/message/followUser', { username: this.messageinfo.user.username }, (data) => {
          this.querymessagedata()
          if (data.success) {
            this.$message({ type: 'success', message: data.message })
          } else {
            logger.debug(data.message)
          }
        })
      } else {
        this.Visible.loginVisible = true
      }
    },
    // 举报
    reportclick() {
      this.Visible.firstLoading = true
      this.repsort.umid = this.umid
      tools.ajax('/message/examine', this.repsort, (data) => {
        this.Visible.reportVisible = false
        this.Visible.firstLoading = false
        if (data.success) {
          this.$message({ message: '举报成功', type: 'success' })
          this.repsort.reportInfo = ''
        } else {
          this.$message({ message: '举报失败', tyep: 'danger' })
        }
      })
    },
    // 帖子点赞
    praiseclick() {
      this.Visible.firstLoading = true
      tools.ajax('/message/support', { umid: this.umid }, (data) => {
        this.Visible.firstLoading = false
        if (data.success) {
          this.$message({ type: 'success', message: data.message })
          this.querymessagedata()
        } else {
          this.$message({ type: 'success', message: '网络不好，请检查网络' })
        }
      })
    },

    // 评论的点赞方法
    Commentsclick(umid) {
      this.Visible.firstLoading = true
      tools.ajax('/message/supportReply', { umrid: umid }, (data) => {
        this.querymessagedata()
        this.Visible.firstLoading = false
        if (data.success) {
          this.$message({ type: 'success', message: data.message })
        } else {
          this.$message({ type: 'danger', message: '点赞失败，请重试' })
        }
      })
    },
    // 发布评论
    AddReplayclick() {
      this.Visible.firstLoading = true
      this.addreplay.umid = this.umid
      tools.ajax('/message/addReply', this.addreplay, (data) => {
        this.querymessagedata()
        this.Visible.firstLoading = false
        if (data.success) {
          this.addreplay.info = ''
          this.$message({ tyep: 'success', message: this.addreplay.info + '评论发布成功' })
        } else {
          this.$alert(data.message)
        }
      })
    },
    // 查询帖子点赞的用户信息
    queryconcern() {
      this.Visible.secondLoading = true
      tools.ajax('/message/querySupportUserList', { umid: this.umid }, (data) => {
        this.concernlist = data.list
        this.messagepage = data.page
        logger.debug('------------------------------------')
        this.Visible.secondLoading = false
        for (let i = 0; i < this.concernlist.length; i++) {
          if (this.concernlist[i].userInfo.img == '') {
            this.concernlist[i].userInfo.img = 'https://klcxy.top/oss-manage-service/ossinfo/queryOssUrl?tbOssInfo.oiid=544'
          }
        }
      })
    },

    // 点赞人员的关注和取消关注
    dianzanguanzhu(username) {
      this.Visible.firstLoading = true
      if (this.user.isLogin == true) {
        this.Visible.firstLoading = false
        tools.ajax('/message/followUser', { username: username }, () => {
          this.queryconcern()
        })
      } else {
        this.Visible.firstLoading = false
      }
    },
    // 删除自己发布的评论
    DeleMessageList(umrid) {
      this.Visible.firstLoading = true
      tools.ajax('/message/manage/deletUserMessageReply', { umrid: umrid }, (data) => {
        this.Visible.firstLoading = false
        if (data.success) {
          this.$message({ type: 'success', message: data.message })
          this.querymessagedata()
        } else {
          this.$message({ type: 'danger', message: '点赞失败，请重试' })
        }
      })
    },
    jumpRouting() {
      if (decodeURIComponent(this.$route.hash)) {
        this.$router.push('/index/userbody/' + encodeURIComponent(decodeURIComponent(this.$route.hash).replace('#', '')))
      } else {
        this.$router.push('/index')
      }
    },
    // 通过留言评论进入别人的用户主页
    Message_data(nickname) {
      this.$router.push('/index/userbody/' + encodeURIComponent(nickname))
    },
    ifTabs() {
      if (this.activeName == 'second') {
        this.queryconcern()
      }
      if (this.activeName == 'first') {
        this.querymessagedata()
      }
      window.scrollTo({
        top: document.documentElement.scrollTop,
        behavior: 'smooth',
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
    this.umid = decodeURIComponent(this.$route.params.umid)
    this.messagequery.umid = this.umid
    app.querymessagedata()
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  },
}
</script>
<style scoped>
@import url(@/css/message_data/message_data.css);
</style>
