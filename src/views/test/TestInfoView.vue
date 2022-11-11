<template>
  <div>
    <div>{{ info }}</div>
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
      title: '接口出错了，报错了',
      info: '',
      index: 1,
    }
  },
  methods: {
    thistest() {
      logger.debug('查看是否可以进入methods')
    },
    suijiwenan() {
      fetch('https://api.gmit.vip/Api/WaSentence')
        .then((response) => response.json())
        .then((res) => {
          if (res.code == 200) {
            this.title = ' '
            this.title = res.data.text
            logger.debug('调用')
            this.chuxian()
          }
        })
        .catch(console.error())
    },
    // 字体出现
    chuxian() {
      let time
      time = setInterval(() => {
        this.info = this.title.substring(0, this.index)
        this.index++
        if (this.index > this.title.length) {
          clearInterval(time)
          this.xiaoshi()
        }
      }, 200)
    },
    xiaoshi() {
      let time
      time = setInterval(() => {
        this.info = this.title.substring(0, this.index)
        this.index--
        if (this.index == 0) {
          clearInterval(time)
          this.suijiwenan()
        }
      }, 200)
    },
  },
  created() {
    app = this
    logger.debug(app)
    this.suijiwenan()
  },
}
</script>
<style scoped></style>
