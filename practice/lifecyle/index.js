import Vue from 'vue'

new Vue({
  el: '#root',
  template: '<div>{{text}}</div>',
  data: {
    text: 'this is content'
  },
  beforeCreate () {
    console.log('beforeCreate')
  },
  create () {
    console.log('create')
  },
  beforeMount () {
    console.log('beforeMount')
  },
  mount () {
    console.log('mount')
  },
  beforeUpdate () {
    console.log('beforeUpdate')
  },
  updated () {
    console.log('updated')
  },
  activated () {
    console.log('activated')
  },
  deactivated () {
    console.log('deactivated')
  },
  beforeDestroy () {
    console.log('beforeDestroy')
  },
  destroyed () {
    console.log('destroyed')
  }
})
