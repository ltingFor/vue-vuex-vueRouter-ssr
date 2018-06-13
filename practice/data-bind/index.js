import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div id='aaa'>
      {{isActive ? 'true' : 'false'}}
      {{Date.now()}}
      <p
        v-html='html'
        v-bind:aaa='aaa'
      >
      </p>
      <p>{{getArrJoin(arr)}}</p>
      <div
        :class="[{active: isActive}, {test: !isActive}, 'abc']"
        :style="[style, style2]"
      >学习Class的绑定</div>
    </div>
  `,
  data: {
    isActive: false,
    arr: [1, 2, 3],
    html: '<span>123</span>',
    aaa: 'main',
    style: {
      color: 'red',
      appearance: 'none'
    },
    style2: {
      fontSize: '12px'
    }
  },
  methods: {
    getArrJoin (arr) {
      return arr.join(' ')
    }
  }
})
