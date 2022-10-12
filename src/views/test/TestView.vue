<template>
  <div>
    <div>{{ title }}</div>
    <el-dialog title="手机修改" :visible.sync="utphoneVisible">
      <el-form>
        <el-form-item>
          <el-input placeholder="输入手机号" v-model="updatePhone.phone"></el-input>
        </el-form-item>
        <el-image :src="hahha"></el-image>
        <el-form-item>
          <el-input placeholder="输入图片验证码" v-model="sendsCode.imageCode"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="手机验证码" v-model="updatePhone.code"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <button @click="sendCode">发送手机验证码</button>
        <el-button @click="utphoneVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUserPhone">确 定</el-button>
      </div>
    </el-dialog>
    <el-button type="primary" @click="utphoneVisible = true">修改手机</el-button>
  </div>
</template>
<script>
import tools from '@/js/tools'
let app = null
export default {
  name: 'PhoneView',
  data() {
    return {
      title: '手机',
      hahha: {},
      updatePhone: {
        code: '',
        phone: '',
      },
      utphoneVisible: false,
      sendsCode: {
        imageCode: '',
        phone: '',
      },
    }
  },
  methods: {
    sendCode() {
      this.sendsCode.phone = this.updatePhone.phone //这上面用v-model='updatePhone.phone'
      // this.updatePhone.phone = this.sendsCode.phone//这上面用v-model='sendsCode.phone'
      console.log('查看参数', this.sendsCode)
      tools.ajax('/tool/sendValidateCode', app.sendsCode, (data) => {
        app.$alert(data.message)
      })
    },
    getImageCode() {
      tools.ajax('/tool/getImageCode', {}, (data) => {
        this.hahha = data.message
      })
    },
    updateUserPhone() {
      tools.ajax('/user/auth/updateUserPhone', app.updatePhone, (data) => {
        app.$alert(data.message)
      })
    },
  },
  created() {
    app = this
    console.log(app.title)
    app.getImageCode()
  },
}
</script>
