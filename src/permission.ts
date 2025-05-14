import router from './router'
import Nprogress from 'nprogress'
import { useUserStore } from '@/stores/user'

router.beforeEach((to, from, next) => {
  Nprogress.start()
  const token = useUserStore().token
  if (token) {
    // 已登录
    if (to.path === '/login') {
      next('/')
    } else {
      next()
      Nprogress.done()
    }
  } else {
    // 未登录
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
      Nprogress.done()
    }
  }
})
