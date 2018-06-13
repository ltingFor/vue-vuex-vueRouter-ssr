import Vue from 'vue'

/* data必须是一个return的函数，否则定义的子组件中的数据是共享的，失去了意义
*
*/

const component = {
  template: '<div>{{text}}</div>',
  data () {
    return {
      text: '123'
    }
  }
}

/*
// 全局注册
Vue.component('ComeOne', component)
*/

new Vue({
  components: {
    ComeOne: component
  },
  el: '#root',
  template: '<come-one></come-one>'
})
