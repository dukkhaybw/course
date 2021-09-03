import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home/index.vue'
import loading from '@/utils/loading.js'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/course',
        name: 'Course',
        component: loading(() =>
                import ( /* webpackChunkName: "course" */ '@/views/course/index.vue')) //动态引入，匹配到路径后才会加载对应组件，存在的问题，
            //如果该组件很大，跳到对应路径可能白屏
    },
    {
        path: '/profile',
        name: 'Profile',
        component: loading(() =>
            import ( /* webpackChunkName: "profile" */ '@/views/profile/index.vue'))
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router