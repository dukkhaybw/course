import store from '@/store/index'
import * as TYPES from '@/store/actions-type.js'
import auth from './auth'

export default {
    cancelToken: (to, from, next) => { //取消即将离开的页面的所有http请求
        store.commit(TYPES.SET_CLEAR_AJAXREQUEST)
        next()
    },
    permission: async(to, from, next) => { //进行权限校验的回调函数,如果用户未登录则跳转到登录页面

        //接下来判断哪个页面是需要登录后才能访问的
        let needLogin = to.matched.some(item => item.meta.needLogin)

        if (!store.state.hasPermission) {
            let flag = await store.dispatch(TYPES.SET_VALIDATE) //通过flag判断是否登录
            if (needLogin) { //如果该路由页面需要登录才能访问
                if (!flag) {
                    next('/login')
                } else {
                    next()
                }
            } else {
                if (to.name === 'Login') {
                    if (!flag) {
                        next()
                    } else {
                        next('/profile')
                    }
                } else {
                    next()
                }
            }
        } else {
            if (to.name === 'Login') {
                next('/ ')
            }
            next()
        }
        next()
    },
    profileAuth: function(to, from, next) { //动态加载权限路由
        if (store.state.hasPermission && store.state.user.menuList) {
            if (!store.state.userRightPermission) {
                let list = store.state.user.menuList.map(item => item.auth)
                let newRoutes = auth.filter(item => list.includes(item.name))
                this.addRoutes(newRoutes) //动态添加路由  新添加的路由需要在下一轮循环中才能生效
                store.commit(TYPES.SET_USERRIGHTLIST)
                return next({...to, replace: true })
            } else {
                next()
            }
        } else {
            next()
        }
    }
}