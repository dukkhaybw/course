import Vue from 'vue'
import Vuex from 'vuex'

import home from './modules/Home.js'
import * as TYPES from './actions-type'
import { Toast } from 'cube-ui'
import { fetchLogin, fetchValidate, fetchAvatorUpload } from '@/api/user.js'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        home
    },
    state: {
        ajaxTokens: [], //存放当前路由页面所有请求的容器
        user: {},
        hasPermission: false,
        userRightPermission: false
    },
    mutations: {
        [TYPES.SET_PUSH_AJAXREQUEST](state, cancel) {
            state.ajaxTokens.push(cancel)
        },
        [TYPES.SET_CLEAR_AJAXREQUEST](state) {
            state.ajaxTokens.forEach(cancelFun => {
                cancelFun()
            })
            state.ajaxTokens = []
        },
        [TYPES.SET_USERINFO](state, payload) {
            state.user = payload
            state.hasPermission = true
        },
        [TYPES.SET_USERRIGHTLIST](state) {
            state.userRightPermission = true
        },
        [TYPES.SET_AVATOR](state, url) {
            state.user = {...state.user, url }
        }
    },
    actions: {
        async [TYPES.SET_LOGIN]({ commit }, user) {
            try {
                let result = await fetchLogin(user)
                commit(TYPES.SET_USERINFO, result)
                localStorage.setItem('token', result.token)
            } catch (error) {
                Toast.$create({
                    txt: '用户无法登录',
                    time: 2000
                }).show()
                return Promise.reject(error)
            }
        },
        async [TYPES.SET_VALIDATE]({ commit }) {
            try {
                let user = await fetchValidate()
                commit(TYPES.SET_USERINFO, user)
                return true
            } catch (error) {
                return false
            }
        },
        async [TYPES.SET_AVATOR]({ commit }, fd) {
            let result = await fetchAvatorUpload(fd)
            commit(TYPES.SET_AVATOR, result.url)
        }
    }
})