import Router from 'vue-router'
import routes from './routes.js'

// export default router 不推荐，因为这样的话在全局import的router都是同一个router
// 如果想import的时候是不同的router，就要返回一个function
export default () => {
  return new Router({
    routes,
    mode: 'history',
    // base: '/base/',
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link',
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    },
    fallback: true
    // parseQuery (Json) {
    //   console.log('Json', Json)
    // },
    // stringifyQuery (Obj) {
    //   Obj.a = 123
    //   Obj.b = 456
    //   console.log(Obj)
    // }

  })
}
