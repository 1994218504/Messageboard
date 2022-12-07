<template>
  <div id="app">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 10,
    }
  },
  mounted: function () {
    console.group('------mounted 挂载结束状态(父）------')
    console.log('%c%s', 'color:red', 'el     : ' + this.$el)
    console.log(this.$el)
    console.log('%c%s', 'color:red', 'data   : ' + this.$data)
    console.log('%c%s', 'color:red', 'message: ' + this.message)

    this.message += 1
    console.log('%c%s', 'color:red', 'message: ' + this.message)
  },
  beforeUpdate: function () {
    console.group('beforeUpdate 更新前状态(父）===============》')
    console.log('%c%s', 'color:red', 'el     : ' + this.$el)
    console.log(this.$el)
    console.log('%c%s', 'color:red', 'data   : ' + this.$data)
    console.log('%c%s', 'color:red', 'message: ' + this.message)
  },
  updated: function () {
    console.group('updated 更新完成状态(父）===============》')
    console.log('%c%s', 'color:red', 'el     : ' + this.$el)
    console.log(this.$el)
    console.log('%c%s', 'color:red', 'data   : ' + this.$data)
    console.log('%c%s', 'color:red', 'message: ' + this.message)
  },
}
</script>
<style>
.eac {
  background: lightgreen;
}
li {
  display: inline;
  margin: 10px;
}
</style>
