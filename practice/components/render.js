import Vue from 'vue'

/* 1、具名插槽
*  2、作用域插槽，就是可以访问到局部组件的插槽中的数据
*/

const ChildComponent = {
  template: '<div>ChildComponent:{{data.value}}</div>',
  inject: ['yeye', 'data'], // 爷孙辈 通信交互
  mounted () {
    console.log(this.$parent.$options.name)
    console.log(this.yeye)
  }
}

const component = {// props 是标识出这个组件所能做的事情
  name: 'componentOne',
  components: {
    ChildComponent
  },
  template: `
  <div :style='style'>
    <div class="header">
      <slot name='header'></slot>
    </div>
    <div class="footer">
      <slot name='footer' value='123' :text='text'></slot>
    </div>
    <child-component></child-component>
  </div>`,
  data () {
    return {
      style: {
        border: '1px solid #aaa',
        width: '200px',
        height: '200px'
      },
      text: 'this is component'
    }
  }
}

new Vue({
  el: '#root',
  components: {
    comOne: component
  },
  data () {
    return {
      value: 'Haha,I am the father'
    }
  },
  provide () {
    const data = {}
    // vue原理的 根本，但官网已经不推荐使用，因为后期就不按照这样来了
    Object.defineProperty(data, 'value', {
      get: () => this.value,
      enumerable: true
    })

    return {
      yeye: this,
      data
    }
  },
  mounted () {
    // console.log(this.$refs.comA) // 但不推荐这么去做，因为如果想要操作子组件可以通过事件，props，
    // 对于团队协作来讲，容易让别人找不到你的逻辑，造成混乱
    // console.log(this.$refs.comA.text)
    // console.log(this.$refs.comB)
  },
  template: `
    <div>
      <com-one ref='comA'>
        <span slot='header' ref='comB'>this is header</span>
        <span slot='footer' slot-scope='props'>{{props.text}} {{props.value}} {{value}}</span>
      </com-one>
    </div>
  `
})
