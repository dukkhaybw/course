import axios from '@/utils/ajaxRequest.js'

export const fetchLogin = (userInfo) => {
    return axios.request({
        url: '/login',
        method: 'post',
        data: userInfo
    })
}

export const fetchValidate = () => {
    return axios.request({
        url: '/validate'
    })
}

export const fetchAvatorUpload = (fd) => {
    return axios.request({
        method: 'POST',
        url: '/avator',
        headers: {
            'content-type': 'multipart/form-data'
        },
        data: fd
    })
}