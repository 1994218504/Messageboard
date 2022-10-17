<template>
  <div>
    <div></div>
  </div>
</template>
<script>
import tools from '@/js/tools'
export default {
  name: 'LoginAndIndex',
  data() {
    return {
      title: '登录界面',
    }
  },
  methods: {},
  created() {
    tools.ajax(
      '/user/auth/getUserInfo',
      {},
      (data) => {
        if (data.success) {
          this.$router.push('/index')
        } else {
          this.$router.push('/login')
        }
      },
      true
    )
  },
}
</script>
<style scoped></style>
