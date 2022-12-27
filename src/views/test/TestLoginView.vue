<template>
  <div>
    <div class="center">
      <span class="box01">
        <el-button class="logout">注册</el-button>
      </span>
      <div class="box02"></div>
    </div>
  </div>
</template>
<script>
import logger from '@/js/logger'
// import tools from "../../js/tools";
let app
export default {
  name: 'TestAjaxView',
  data() {
    return {
      title: 'ajax测试页面',
    }
  },
  methods: {},
  mounted() {
    const that = this
    let logout = document.querySelector('.logout')
    logout.addEventListener('click', function () {
      logger.debug('点击注册按钮', that.title)
    })
  },
  created() {
    app = this
    logger.debug(app)
  },
}
</script>
<style scoped>
.center {
  display: flex;
}
.center > span:first-child {
  display: inline-block;
  height: 100vh;
  width: 45%;
  background-color: rgb(208, 18, 14);
  display: flex;
  align-items: center;
}
.center > span:first-child > .logout {
  margin-left: 10%;
}
.center > div {
  position: absolute;
  left: 20%;
  width: 80%;
  height: 100vh;
  background-color: rgb(100, 205, 205);
  border-radius: 5000px 0 0 5000px;
}
</style>
