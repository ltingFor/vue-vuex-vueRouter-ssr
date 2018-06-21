import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'

import './assets/styles/global.styl'
import creatRouter from './config/router'

Vue.use(VueRouter)

/**
*我们的css文件打包成一个buddle用extract-text-webpack-plugin插件
*我们的类包文件比较稳定，但是业务代码是经常变动的，所以要让类包文件在浏览器中尽可能的缓存
*这样可以尽可能的减少流量，加快用户的访问速度
**/

const router = creatRouter()

// 注册全局的导航守卫
router.beforeEach((to, from, next) => { // 可用来做一些登录校验等
  /* if (to.fullPath === '/app') {
    next('/login')
  } else {
    next()
  } */
  console.log('before each invoked')
  next()
})
router.beforeResolve((to, from, next) => {
  console.log('before Resolve invoked')
  next()
})
router.afterEach((to, from) => { // 已经执行完成
  console.log('after each invoked')
})

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#root')
