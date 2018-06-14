import Vue from 'vue'

/* data必须是一个return的函数，否则定义的子组件中的数据是共享的，失去了意义
*
*/

const component = {// props 是标识出这个组件所能做的事情
  props: {
    propOne: String,
    active: Boolean
  },
  template: `<div>
    <input type="text" v-model='text'/>
    <p @click='handleChange'>{{propOne}}</p>
    <span v-show='active'>see me if active is true</span>
  </div>`,
  methods: {
    handleChange () { // 方法一，进行父组件通知子组件进行改变
      this.$emit('change') // 方法二，直接调用emit
    }
  },
  data () {
    return {
      text: 0
    }
  },
  beforeCreate () {
    // console.log('component beforeCreate')
  },
  created () {
    // console.log('component creat')
  },
  beforeMount () {
    // console.log('component beforeMount')
  },
  mounted () {
    // console.log('component mounted')
  }
}

/* const ComVue = Vue.extend(component) // 相当于Vue的一个子类

new ComVue({
  el: '#root',
  propsData: {
    propOne: 'XXX'
  },
  data () {
    return {
      text: '123'
    }
  },
  beforeCreate () {
    console.log('extend beforeCreate')
  },
  created () {
    console.log('extend create')
  },
  beforeMount () {
    console.log('extend beforeMount')
  },
  mounted () {
    console.log('extend mounted')
  }
}) */
const parent = new Vue({
  name: 'parent'
})

const com2 = {
  extends: component,
  data () {
    return {
      text: '111'
    }
  },
  beforeCreate () {
    // console.log('child component beforeCreate')
  },
  created () {
    // console.log('child component create')
  },
  beforeMount () {
    // console.log('child component beforeMount')
  },
  mounted () {
    console.log("parent's name== " + this.$parent.$options.name)
    this.$parent.text = 'Haha,I changed you,I am the child component'
    // console.log('child component mounted')
  }
}

new Vue({
  parent: parent,
  name: 'Root',
  el: '#root',
  components: {
    comp: com2
  },
  data () {
    return {
      text: '1'
    }
  },
  template: `
    <div>
      <span>{{text}}</span>
      <comp></comp>
    </div>
    `,
  beforeCreate () {
    // console.log('father component beforeCreate')
  },
  created () {
    // console.log('father component create')
  },
  beforeMount () {
    // console.log('father component beforeMount')
  },
  mounted () {
    console.log("parent's name== " + this.$parent.$options.name)
    // console.log('father component mounted')
  }
})
