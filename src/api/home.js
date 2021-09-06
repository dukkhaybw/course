import axios from '@/utils/ajaxRequest.js'
import store from '@/store/index.js'

//获取home页面课程分类
export const fetchCategory = () => {
    return axios.requset({
        url: '/category'
    })
}

//获取home页面轮播数据
export const fetchSlideLists = () => {
    return axios.requset({
        url: '/slides'
    })
}

//获取home页面课程数据
export const fetchCourseLists = (size, offset) => {
    return axios.requset({
        url: `/lessonList/${store.state.home.currentCourse}?size=${size}&offset=${offset}`
    })
}