<template>
  <div>
    <div></div>
  </div>
</template>
<script>
// import tools from '@/js/tools'
export default {
  name: 'LoginAndIndex',
  data() {
    return {
      title: '登录界面',
    }
  },
  methods: {},
  created() {
    this.$router.push('/index')
  },
}
</script>
<style scoped></style>
