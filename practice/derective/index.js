import Vue from 'vue'

/* checkbox 绑定数组这个可以在ajax数组交互时使用，简洁，方便
* 2、巧用修饰符，可以用来做校验之类的，比如number或者trim之类的，
* lazy原来是inpu事件，加上后变为onchange事件
* v-pre用来跳过跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签，大量没有指令的节点会加快编译。
*/
new Vue({
  el: '#root',
  template: `
    <div>
      <input type="text" v-model.number.trim='text'/>
      <input type='checkbox' v-model='active'/>
      <div>
        <input type='checkbox' :value='1' v-model='arr'/>
        <input type='checkbox' :value='2' v-model='arr'/>
        <input type='checkbox' :value='3' v-model='arr'/>
      </div>
      <div>
        <input type="radio" v-model='picked' value='one'/>
        <input type="radio" v-model='picked' value='two'/>
      </div>
      <div v-pre>{{useing for reduce compile's time,this will not be compiled}}</div>
    </div>
  `,
  data: {
    text: 0,
    active: false,
    arr: [1, 2, 3],
    picked: ''
  }
})
