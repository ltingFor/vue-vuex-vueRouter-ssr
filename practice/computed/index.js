import Vue from 'vue'
import axios from 'axios'
import _ from 'lodash'

/** 不要在computed和watch里面修改 我们所依赖的值，只能创造新的值，这样的场景才好用
* 容易造成无限循环的触发
*/
new Vue({
  el: '#root',
  template: `
    <div>
      <p>names: {{firstName}} {{lastName}}</p>
      <p>{{name}}</p>
      <p>{{getNames()}}</p>
      <p>{{getOthers()}}</p>
      <p>{{Number}}</p>
      <p><input type="text" v-model='Number'/></p>
      <p @click='testMethod'>测试三者的不同</p>
      <p>{{Test}}</p>
      <br>
      <input type="text" v-model='question'/>
      <p>{{answer}}</p>
    </div>
  `,
  data: {
    firstName: 'Li',
    lastName: 'Ting',
    Number: 0,
    Test: 'abc',
    question: '',
    answer: 'I cannot give you an answer until you ask a question!'
  },
  computed: {
    name () {
      console.log('computed name')
      return this.firstName + this.lastName
    }
  },
  watch: {// 当在数据变化时执行异步或者开销较大的操作时，这个方法比较有用
    question (newQuestion, oldQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.debouncedGetAnswer()
    }
  },
  methods: {
    getNames () {
      console.log('methods name')
      return this.firstName + this.lastName
    },
    testMethod () {
      this.Test = Math.random()
      console.log('单纯测试是什么影响了method和computed')
    },
    getOthers () {
      console.log('methods name 2')
      return '123'
    },

    getAnswer () {
      if (this.question.indexOf('?') === -1) {
        this.answer = 'Questions usually contain a question mark. ;-)'
        return
      }
      this.answer = 'Thinking...'
      var vm = this
      axios.get('https://yesno.wtf/api')
        .then(function (response) {
          vm.answer = _.capitalize(response.data.answer)
        })
        .catch(function (error) {
          vm.answer = 'Error! Could not reach the API. ' + error
        })
    }
  },
  created () {
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
  }
})
