<template>
  <div>
    <div>{{ title }}</div>
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
  created() {
    app = this
    logger.debug(app)
  },
}
</script>
<style scoped></style>
