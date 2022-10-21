<template>
  <div class="center">
    <!-- {{ messageinfo }} -->
    <el-page-header @back="jumpRouting('/index')" content="留言详细信息"> </el-page-header>
    <div>
      <div class="box_show">
        <!-- 发帖人信息 -->
        <el-header class="main_top">
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
        </el-header>
        <!-- 帖子信息 -->
        <el-main class="userinfo">
          <div>标题：{{ messageinfo.title }}</div>
          <div class="center_info" v-html="messageinfo.info" v-if="messageinfo">
            {{ messageinfo.info }}
          </div>
          <div class="center_click">
            <div @click="praiseclick()" v-if="messageinfo.praise == false">
              <i class="el-input_icon iconfont">&#xec7f;</i>
              <span>点赞{{ messageinfo.praiseCount }}</span>
            </div>
            <div @click="praiseclick()" v-else class="praises">
              <i class="el-input_icon iconfont">&#xec7f;</i>
              <span>已点赞{{ messageinfo.praiseCount }}</span>
            </div>
            <div @click="reportVisible = true">
              <i class="el-input_icon iconfont">&#xe66b;</i>
              <span>举报</span>
            </div>
          </div>
        </el-main>
        <!-- 评论信息 -->
        <el-main class="comments_concern">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="评论" name="first">
              <div v-for="d in messagelist" :key="d.umrid">
                <div class="commentslists">
                  <li>
                    <div>
                      <img @click="Message_data(d.user.nickname)" :src="d.userInfo.img" alt="" />
                    </div>
                    <div>
                      <div @click="Message_data(d.user.nickname)">{{ d.user.nickname }}</div>
                      <p>{{ d.info }}</p>
                      <div>{{ d.lastupdate | formatDate }}</div>
                    </div>
                  </li>
                  <li>
                    <div @click="DeleMessageList(d.umrid)" v-if="d.mine">
                      <i class="input_icon iconfont">&#xe68e;</i>
                      <div>删除</div>
                    </div>
                    <div @click="Commentsclick(d.umrid)" v-if="d.praise == false">
                      <i class="input_icon iconfont">&#xec7f;</i>
                      <span>点赞{{ d.praiseCount }}</span>
                    </div>
                    <div @click="Commentsclick(d.umrid)" class="praises" v-else>
                      <i class="input_icon iconfont">&#xec7f;</i>
                      <span>已点赞{{ d.praiseCount }}</span>
                    </div>
                    <div>
                      <i class="input_icon iconfont">&#xe66b;</i>
                      <div>举报</div>
                    </div>
                  </li>
                </div>
                <hr />
              </div>
              <div class="pagecenter" v-if="messagepage.pageCount >= 2">
                <el-pagination background @current-change="querymessagedata" :current-page.sync="messagepage.pageNumber" :page-size="messagepage.pageSize" :total.sync="messagepage.total" layout=" total,prev, pager, next, jumper"> </el-pagination>
              </div>
              <div v-else> </div>
            </el-tab-pane>
            <el-tab-pane label="点赞" name="second">
              <div v-for="d in concernlist" :key="d.umrid">
                <div class="commentslistconcern">
                  <li>
                    <div style="margin-top: 20px">
                      <img :src="d.userInfo.img" alt="" />
                    </div>
                    <div>
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
            </el-tab-pane>
          </el-tabs>
        </el-main>
      </div>
    </div>
    <!-- 评论 -->

    <div class="bushcomments">
      <div>
        <el-form status-icon :model="addreplay">
          <el-form-item prop="info">
            <el-input placeholder="请输入评论内容" v-model="addreplay.info" clearable>
              <li slot="append">
                <el-button @click="AddReplayclick"> 发布评论</el-button>
              </li>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!-- 举报 -->
    <el-dialog title="举报留言" :center="true" :close-on-click-modal="false" :visible.sync="reportVisible">
      <el-input v-model="reportInfo" placeholder="举报原因">
        <li slot="prepend">举报原因</li>
      </el-input>
      <span class="reportfooter" slot="footer">
        <el-button @click="reportVisible = false">取 消</el-button>
        <el-button type="primary" @click="reportclick()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import tools from '@/js/tools'
import logger from '@/js/logger'
let app
export default {
  name: 'MessageDate',
  data() {
    return {
      title: '具体评论界面',
      umid: '',
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
      }, //发帖人的信息
      reportVisible: false,
      // 帖子举报原因
      reportInfo: '',
      // 评论和点赞
      activeName: 'first',
      messagelist: {}, //下面评论人的信息
      // 留言
      addreplay: {
        info: '',
        umid: '',
        nickname: '',
      },
      // 帖子的点赞用户信息
      concernlist: [],
    }
  },
  methods: {
    // 查询贴子信息
    querymessagedata() {
      let queryString = location.search.replace('?', '')
      this.messagequery.umid = queryString.replace('umid=', '')
      logger.debug(queryString)
      this.umid = this.messagequery.umid
      tools.ajax('/message/queryDetail', tools.concatJson(this.messagequery, this.messagepage), (data) => {
        this.messageinfo = data.info
        logger.debug('mei you tou pian jin ru zi dong fu zhi mo ren t pian')
        if (this.messageinfo == null) {
          this.messageinfo = false
        }
        if (this.messageinfo.userInfo.img == '') {
          this.messageinfo.userInfo.img = 'https://klcxy.top/oss-manage-service/ossinfo/queryOssUrl?tbOssInfo.oiid=529'
          logger.debug('mei you tou pian jin ru zi dong fu zhi mo ren t pian')
        }

        this.messagelist = data.list
        for (let i = 0; i < this.messagelist.length; i++) {
          if (this.messagelist[i].userInfo.img == '') {
            this.messagelist[i].userInfo.img = 'https://klcxy.top/oss-manage-service/ossinfo/queryOssUrl?tbOssInfo.oiid=529'
          }
        }
        this.messagepage = data.page
        logger.debug(data.page)
      })
      this.queryconcern()
    },
    // 关注和取消关注
    concern() {
      tools.ajax('/message/followUser', { username: this.messageinfo.user.username }, (data) => {
        this.querymessagedata()
        if (data.success) {
          this.$message({ type: 'success', message: data.message })
        } else {
          logger.debug(data.message)
        }
      })
    },
    // 举报
    reportclick() {
      tools.ajax('/message/examine', { umid: this.umid, info: app.reportInfo }, (data) => {
        this.reportVisible = false
        if (data.success) {
          this.$message({ message: '举报成功', type: 'success' })
          this.reportInfo = ''
        } else {
          this.$message({ message: '举报失败', tyep: 'danger' })
        }
      })
    },
    // 帖子点赞
    praiseclick() {
      tools.ajax('/message/support', { umid: this.umid }, (data) => {
        if (data.success) {
          this.$message({ type: 'success', message: data.message })
          this.querymessagedata()
        } else {
          this.$message({ type: 'success', message: '网络不好，请检查网络' })
        }
      })
    },
    // 评论和点赞
    handleClick() {},
    // 评论的点赞方法
    Commentsclick(umid) {
      tools.ajax('/message/supportReply', { umrid: umid }, (data) => {
        this.querymessagedata()
        if (data.success) {
          this.$message({ type: 'success', message: data.message })
        } else {
          this.$message({ type: 'danger', message: '点赞失败，请重试' })
        }
      })
    },
    // 发布评论
    AddReplayclick() {
      this.addreplay.umid = this.umid
      tools.ajax('/message/addReply', this.addreplay, (data) => {
        this.querymessagedata()
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
      tools.ajax('/message/querySupportUserList', { umid: this.umid }, (data) => {
        this.concernlist = data.list
        for (let i = 0; i < this.concernlist.length; i++) {
          if (this.concernlist[i].userInfo.img == '') {
            this.concernlist[i].userInfo.img = 'https://klcxy.top/oss-manage-service/ossinfo/queryOssUrl?tbOssInfo.oiid=529'
          }
        }
      })
    },
    // 点赞人员的关注和取消关注
    dianzanguanzhu(username) {
      tools.ajax('/message/followUser', { username: username }, () => {
        this.queryconcern()
      })
    },
    // 删除自己发布的评论
    DeleMessageList(umrid) {
      tools.ajax('/message/manage/deletUserMessageReply', { umrid: umrid }, (data) => {
        if (data.success) {
          this.$message({ type: 'success', message: data.message })
          this.querymessagedata()
        } else {
          this.$message({ type: 'danger', message: '点赞失败，请重试' })
        }
      })
    },
    jumpRouting(index) {
      this.$router.push(index)
    },
    // 通过留言评论进入别人的用户主页
    Message_data(nickname) {
      location = location.href + '/userbody?' + nickname
    },
    // computed: {
    //   user() {
    //     return this.$store.state.loginInfo
    //   },
    // },
  },
  created() {
    app = this
    app.querymessagedata()
    logger.debug('查看是否有角色信息', this.user)
  },
}
</script>
<style scoped>
@import url(@/css/message_data/message_data.css);
</style>
