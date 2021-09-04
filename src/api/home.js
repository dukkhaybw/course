import axios from '@/utils/ajaxRequest.js'

export const fetchCategory = () => {
    return axios.requset({
        url: '/category'
    })
}