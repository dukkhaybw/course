import { fetchCategory, fetchSlideLists } from '@/api/home.js'
import * as TYPES from '../actions-type'

export default {
    namespaced: true, //开启命名空间
    state: {
        categories: [{
                text: '前端课程',
                value: '0',
            },
            {
                text: '后端课程',
                value: '1',
            },
            {
                text: '大数据课程',
                value: '2',
            },
        ], //存放侧边栏的课程分类数据
        currentCourse: -1,
        slideLists: []
    },
    getters: {

    },
    mutations: {
        // setCategories(state, payload) {
        //     state.categories = payload
        // }
        [TYPES.SET_CATEGORIES](state, payload) {
            state.categories = payload
        },
        [TYPES.SET_CURRENTCOURSE](state, payload) {
            state.currentCourse = payload
        },
        [TYPES.SET_SLIDELISTS](state, payload) {
            state.slideLists = payload
        }
    },
    actions: {
        async [TYPES.SET_CATEGORIES]({ commit }) {
            try {
                let categories = await fetchCategory()
                commit(TYPES.SET_CATEGORIES, categories)
            } catch (error) {
                console.log(error);
            }
        },
        async [TYPES.SET_SLIDELISTS]({ commit }) {
            try {
                let slideList = await fetchSlideLists()
                commit([TYPES.SET_SLIDELISTS], slideList)
            } catch (error) {
                console.log(error);
            }
        }
        // async setCategories({ commit }) {
        //     let categories = await fetchCategory()
        //     commit('setCategories', categories)
        // }
    }
}