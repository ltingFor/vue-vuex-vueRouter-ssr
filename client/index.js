import Vue from 'vue'
import App from './app.vue'

import './assets/styles/global.styl'

const root = document.createElement('div')
document.body.appendChild(root)

/**
*我们的css文件打包成一个buddle用extract-text-webpack-plugin插件
*我们的类包文件比较稳定，但是业务代码是经常变动的，所以要让类包文件在浏览器中尽可能的缓存
*这样可以尽可能的减少流量，加快用户的访问速度
*
**/
new Vue({
  render: (h) => h(App)
}).$mount(root)
