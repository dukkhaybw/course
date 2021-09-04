import { fetchCategory } from '@/api/home.js'
// import * as TYPES from '../actions-type'

export default {
    namespaced: true, //开启命名空间
    state: {
        categories: [] //存放侧边栏的课程分类数据
    },
    getters: {

    },
    mutations: {
        // [TYPES.SET_CATEGORIES](state, payload) {
        //     state.categories = payload
        // }
        setCategories(state, payload) {
            state.categories = payload
        }
    },
    actions: {
        // async [TYPES.SET_CATEGORIES]({ commit }) {
        //     let categories = await fetchCategory()
        //     commit(TYPES.SET_CATEGORIES, categories)
        // }
        async setCategories({ commit }) {
            let categories = await fetchCategory()
            commit('setCategories', categories)
        }
    }
}