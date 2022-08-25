<template>
  <div>
    <div>{{ title }}</div>
  </div>
</template>
<script>
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
    console.log(app.title)
    this.$router.push('/login')
  },
}
</script>
<style scoped></style>
