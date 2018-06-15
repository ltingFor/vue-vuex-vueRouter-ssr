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
    linkExactActiveClass: 'exact-active-link'
  })
}
