<template>
  <div>
    <div>{{ title }}</div>
  </div>
</template>
<script>
export default {
  name: 'TestAjaxView',
  data() {
    return {
      title: 'ajax测试页面',
    }
  },
  methods: {},
  created() {
    this.$router.push('/login')
  },
}
</script>
<style scoped></style>
