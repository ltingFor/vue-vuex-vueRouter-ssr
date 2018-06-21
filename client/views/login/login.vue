<template>
  <div id="login">login</div>
</template>

<script>
  export default {
    props: ['id'],
    beforeRouteEnter (to, from, next) { // 路由钩子
      console.log('todo route enter')
      next()
    },
    beforeRouteUpdate (to, from, next) { // 在这里进行请求后台刷新等业务场景，根据ID查询详情，但是this是undefined的
      console.log('todo route update', this)
      next(vm => { // vm就是 this
        console.log('after enter vm.id', vm.id)
      })
    },
    beforeRouteLeave (to, from, next) { // 控制页面离开的场景
      console.log('todo route leave')
      if (global.confirm('are you sure to leave?')) {
        next()
      }
    },
    name: 'login',
    data () {
      return {
        text: '123'
      }
    },
    mounted () {
      console.log(this.id)
      // console.log(this.$route)
      // console.log(this.$route.query)
    }
  }
</script>

<style scoped>

</style>
