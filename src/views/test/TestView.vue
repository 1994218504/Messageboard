<template>
  <div>
    <div>{{ textinfo }}</div>
  </div>
</template>
<script>
// import tools from "../../js/tools";
import logger from '@/js/logger'

export default {
  name: 'TestAjaxView',
  data() {
    return {
      title: 'ajax测试页面',
      textinfo: '',
    }
  },
  methods: {
    postusidbf() {
      fetch('https://api.gmit.vip/Api/WaSentence')
        .then((response) => response.json())
        .then((res) => {
          if (res.code == 200) {
            this.textinfo = ' '
            this.textinfo = res.data.text
            logger.debug('调用')
          }
        })
        .catch((this.textinfo = '报错了,出bug了!'))
    },
  },
  created() {
    this.postusidbf()
  },
}
</script>
<style scoped></style>
