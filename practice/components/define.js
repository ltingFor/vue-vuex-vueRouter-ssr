import Vue from 'vue'

/* data必须是一个return的函数，否则定义的子组件中的数据是共享的，失去了意义
* <input v-model="searchText">  等价于
* <input
*   v-bind:value="searchText"
*   v-on:input="searchText = $event.target.value"
* >
*
*/

// 现在v-modle就在组件上完美了运行起来了
const comInput = {
  props: ['value'],
  template: `
    <div>
      <span>I'm testing components's v-model</span>
      <input
        type="text"
        v-bind:value='value'
        v-on:input="$emit('input', $event.target.value)"
      />
    </div>
  `
}

const component = {// props 是标识出这个组件所能做的事情
  /* props: {// props里面的内容不要修改，这里的值是外部组件约束子组件行为的一个方式，
    // 所以如果想要改变，应该在子组件内部定义data
    active: Boolean,
    propOne: String
    // onChange: Function
  }, */
  props: {
    propOne: {
      type: String
    },
    active: {
      type: Boolean,
      required: true
    },
    active_2: {
      required: true,
      defualt: 10,
      validator (value) {
        return typeof value === 'number'
      }
    }
  },
  template: `<div v-show="active">
    <input type="text" v-model='text'/>
    <p @click='handleChange'>{{propOne}}</p>
    see me if active is true {{text}}
  </div>`,
  methods: {
    handleChange () { // 方法一，进行父组件通知子组件进行改变
      // this.onChange()
      this.$emit('change') // 方法二，直接调用emit
    }
  },
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
    ComeOne: component,
    customInput: comInput
  },
  data () {
    return {
      text: 'father',
      prop1: 'text1', // 方法一
      prop2: 'text2', // 方法二
      searchText: 100
    }
  },
  methods: {
    handleOne () { // 方法一，父组件通知子组件进行改变
      this.prop1 += 1
    }
  },
  mounted () {
    console.log(this.$refs.comp1)
  },
  el: '#root',
  template: `<div>
    <come-one ref='comp1' :active='true' :active_2='2' :prop-one='prop1' @change='handleOne'></come-one>
    <come-one :active='false' :active_2='2'></come-one>
    <custom-input v-model='searchText'></custom-input>
    <span>{{searchText}}</span>
  </div>
  `
})
