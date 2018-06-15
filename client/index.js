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

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#root')
