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
            <el-input type="password" show-password v-model="pwodpss" placeholder="密码">
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
import logger from '@/js/logger'
let app
export default {
  name: 'LoginLogout',
  data() {
    return {
      title: '用户登录',
      user: {
        username: '',
        password: '',
      },
      pwodpss: '',
      loading: false,
      // 校验规则
      rules: {
        username: [
          {
            validator: (r, v, cb) => {
              tools.regValidate(r, v, cb, /^[a-zA-Z][\S]{3,15}$/g, '用户名必须以字母且开头长度为4-16')
            },
          },
        ],
      },
      password: [{ required: true, message: '密码必须填写' }],
    }
  },
  methods: {
    denglu() {
      app.$router.push('/user/RegView')
    },
    login() {
      this.user.password = tools.md5(this.pwodpss)
      app.loading = true
      tools.ajax('/user/auth/login', app.user, () => {
        app.loading = false
        this.$store
          .dispatch('updateUserInfo')
          .then(this.$router.push('/index'))
          .catch((app.loading = false))
      })
      app.loading = false
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
    logger.debug(app.title)
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
