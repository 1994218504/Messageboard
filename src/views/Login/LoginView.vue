<template>
  <div class="main">
    <el-card>
      <div slot="header">{{ title }}</div>
      <div>
        <el-form v-loading="loading" status-icon :model="user" :rules="rules" ref="myform">
          <el-form-item prop="username">
            <el-input v-model="user.username" placeholder="登录名" clearable>
              <i slot="prefix" class="el-input__icon iconfont">&#xe653;</i>
              <i slot="prepend">账号:</i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" show-password v-model="user.password" placeholder="密码">
              <i slot="prefix" class="el-input__icon iconfont">&#xe749;</i>
              <i slot="prepend">密码:</i>
            </el-input>
          </el-form-item>
          <el-form-item class="tc">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="danger" @click="reset">重填</el-button>
            <el-button type="primary" @click="denglu"><i class="iconfont">&#xe653;</i>注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
import tools from '@/js/tools'
let app
export default {
  name: 'TestAjaxView',
  data() {
    return {
      title: '用户登录',
      user: {
        username: '',
        password: '',
      },
      loading: false,
      // 校验规则
      rules: {
        username: [
          { required: true, message: '登录名称必须填写' },
          { min: 4, max: 16, message: '登录名称长度在 3 到 5 个字符' },
        ],
        password: [
          { required: true, message: '密码必须填写' },
          { min: 3, max: 18, message: '登录密码长度为6-18位' },
        ],
      },
    }
  },
  methods: {
    denglu() {
      app.$router.push('/user/RegView')
    },
    login() {
      app.user.password = tools.md5(app.user.password)
      app.loading = true
      tools.ajax('/user/auth/login', app.user, (data) => {
        app.loading = false
        app.user.password = ''
        app.$message({
          message: data.tbUser.nickname + '登录成功',
          type: 'success',
        })
        if (data.success) {
          this.$router.push('/index')
          return
        }
        // app.$alert(data.message, '黑暗骑士')
      })
    },
    reset() {
      app.user = {
        username: '',
        password: '',
      }
    },
  },
  created() {
    app = this
    console.log(app.title)
  },
}
</script>

<style scoped>
.main {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
