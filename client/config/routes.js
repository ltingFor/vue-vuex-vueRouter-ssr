// import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'
export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    component: () => import('../views/todo/todo.vue'),
    name: 'app',
    meta: {
      title: '学习一下vue-router',
      description: '哈哈真是一个好东西'
    },
    beforeEnter (to, from, next) { // 路由钩子
      console.log('app route enter')
      next()
    }
    // children: [
    //   {
    //     path: 'test',
    //     component: Login
    //   }
    // ]
  },
  {
    path: '/login/:id',
    component: () => import('../views/login/login.vue'),
    // props: true,
    // 默认传的就是param的name值,如果要传参，
    // 推荐这种props用法，而不是在组件里面调用this.$route.param或者query，有利于解耦
    // props: {
    //   id: 'items'
    // }
    props: (route) => ({
      id: route.query.b
    })
  },
  {
    path: '/login/exact',
    component: () => import('../views/login/login.vue')
  }
]
