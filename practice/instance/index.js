import Vue from 'vue'

var app = new Vue({
  data: {
    text: 0,
    obj: {}
  },
  watch: {
    text (newText, oldText) {
      console.log(`${newText} : ${oldText}`)
    }
  },
  template: '<div ref="div">this is content:{{text}},{{obj.a}}</div>'
}).$mount('#root')

var i = 0
setInterval(() => {
  // i++
  // app.text += 1
  app.obj.a = i
  app.$set(app.obj, 'a', i) // 和forceUpdate是一样的道理，推荐使用
  // app.$delete(app.obj, 'a')// 删除某些属性值
  // app.$forceUpdate()
  // app.$options.data.text += 1 not work
  // app.$data.text += 1//It works,so it has the same value as new vue's data
}, 1000)

// console.log(app.$data)
// console.log(app.$props)
// console.log(app.$options)

/* app.$options.render = (h) => {//等有下一次变化的时候进行渲染，并且不会再进行更新
  return h('div', {}, 'new rander function')
} */

// console.log(app.$root === app)
// console.log(app.$children)
// console.log(app.$slots)
// console.log(app.$scopedSlots)

// console.log(app.$refs)// 帮我们快速定位到某一个节点或组件
// console.log(app.$isServer)// 只有在做服务端渲染的时候才会用到，某些操作只能在服务端渲染运行，有些只能在客户端运行

// 上面是属性，以下是方法
// const unwatch = app.$watch('text', (newText, oldText) => { // 与在实例中的watch方法等效，只是要手动进行销毁anwatch，否则容易造成内存溢出
//   console.log(`${newText} : ${oldText}`)
// })

// setTimeout(() => { // 注销
//   unwatch()
// }, 2000)

// 下面的这两个方法要作用在一个vue实例上，否则不起作用
// $once监听只响应一次
// app.$on('test', (a, b) => {
//   console.log('test emit')
// })
// app.$emit('test', 1, 2)
