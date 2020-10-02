<template>
  <div id="app" @click="showMessage">
    点我出现message
  </div>
</template>

<script>

export default {
  name: 'App',
  data: function () {
    return {
      id: 1
    }
  },
  methods: {
    showMessage() {
      //this.$message("Hello");
      this.$message({
        message: `Hello world${this.id++}`, onClose: function (el) {
          console.log(el)
        }, type: "error"
      })
    }
  }
}
</script>

<style>

</style>
