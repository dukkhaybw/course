import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home/index.vue'
import loading from '@/utils/loading.js'
import hooks from './hooks.js'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            index: 0,
            keepAlive: true
        }
    },
    {
        path: '/course',
        name: 'Course',
        component: loading(() =>
            import ( /* webpackChunkName: "course" */ '@/views/course/index.vue')), //动态引入，匹配到路径后才会加载对应组件，存在的问题，
        //如果该组件很大，跳到对应路径可能白屏
        meta: {
            index: 1,
            keepAlive: true,
            needLogin: true //表示当前页面需要登录后才能访问
        }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: loading(() =>
            import ( /* webpackChunkName: "profile" */ '@/views/profile/index.vue')),
        meta: {
            index: 2,
            keepAlive: true

        }
    },
    {
        path: '/login',
        name: 'Login',
        component: loading(() =>
            import ('@/views/login/index.vue'))
    },
    {
      path:'*',
      component:{
        render(h){
          return <h1>您访问的页面不存在</h1>
        }
      }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

Object.values(hooks).forEach(hook => {
    router.beforeEach(hook.bind(router))
})


export default router