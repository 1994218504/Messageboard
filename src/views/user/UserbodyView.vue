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
      usernames: '',
      Iusername: true,
      tbUser: {},
      tbUserInfo: {},
      userOtherInfo: {},
    }
  },
  methods: {
    queryUser() {
      let Names = location.search
      let mark = Names.lastIndexOf('&')
      if (mark > -1) {
        this.username = Names.substring(mark + 1)
        tools.ajax('/user/auth/getUserInfoByName', { username: this.username }, (data) => {
          this.tbUser = data.tbUser
          console.log(data.success)
          this.tbUserInfo = data.tbUserInfo
          this.userOtherInfo = data.userOtherInfo
          if (!data.success) {
            this.$alert(data.message)
          }
        })
      } else {
        this.usernames = location.search.replace('?', '')
        tools.ajax('/user/auth/getUserInfoByName', { username: this.usernames }, (data) => {
          this.tbUser = data.tbUser
          console.log(data.success)
          this.tbUserInfo = data.tbUserInfo
          this.userOtherInfo = data.userOtherInfo
          if (!data.success) {
            this.$alert(data.message)
          }
        })
      }

      if (this.username == this.usernames) {
        this.Iusername = false
      }
    },
  },
  created() {
    app = this
    app.queryUser()
  },
}
</script>
<style scoped>
@import url(@/css/user/UserBody.css);
</style>
