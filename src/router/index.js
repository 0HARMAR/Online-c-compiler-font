import { createRouter, createWebHistory } from 'vue-router'
import Compiler from '../views/Compiler.vue'
import Terminal from '../views/Terminal.vue'
import Projects from '../views/Projects.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    // 首页内容已经在 App.vue 中实现
    component: () => null
  },
  {
    path: '/compile',
    name: 'Compiler',
    component: Compiler
  },
  {
    path: '/terminal',
    name: 'Terminal',
    component: Terminal
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 添加路由守卫
// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('token')
//   if (to.path !== '/' && !token) {
//     window.alert('需要登录后才能访问该页面')
//     next('/')
//   } else {
//     next()
//   }
// })

export default router
