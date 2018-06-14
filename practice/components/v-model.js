import Vue from 'vue'

const component = {// props 是标识出这个组件所能做的事情
  model: { // 进行改造，为了不使value和真正想传的混淆
    prop: 'value1',
    event: 'change'
  },
  props: ['value1'],
  /* template: `
  <div>
    <input type="text" @input="$emit('input', $event.target.value)"/>
  </div>`, */
  template: `
  <div>
    <input type="text" @input="handleChange" :value='value1'/>
  </div>`,
  methods: {
    handleChange (e) {
      this.$emit('change', e.target.value)
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
      value: '123'
    }
  },
  template: `
    <div>
      <com-one v-model='value'></com-one>
      <span>{{value}}</span>
    </div>
  `
})
