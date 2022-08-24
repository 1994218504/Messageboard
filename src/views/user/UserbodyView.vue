<template>
  <div>
    <div>
      <div><i class="el-icon-back"> </i>返回</div>
      <div class="index_top">
        <div class="index_img"></div>
        <div class="index_touxiang"></div>
      </div>
      {{ tbUserInfo }}
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
    }
  },
  methods: {
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
    queryUser() {
      tools.ajax('/user/auth/getUserInfoByName', { username: this.username }, (data) => {
        this.tbUser = data.tbUser
        this.tbUserInfo = data.tbUserInfo
        this.userOtherInfo = data.userOtherInfo
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
