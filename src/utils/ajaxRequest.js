import axios from 'axios'
import { Toast } from 'cube-ui'

class AjaxRequest {
    constructor() {
        this.baseURL = process.env.NODE_ENV !== 'production' ? 'http://localhost:8000/api' : '/'
        this.timeout = 3000
        this.queue = {} //请求队列
    }

    requset(options) {
        if (!this.hasOwnProperty('toast')) {
            this.toast = Toast.$create({
                txt: 'Loading...',
                mask: true,
                time: 0
            })
        }
        let instance = axios.create()
        let config = {...options, baseURL: this.baseURL, timeout: this.timeout }
        this.setInterceptor(instance, options.url)
        return instance(config)
    }

    setInterceptor(instance, url) {
        //请求拦截器
        instance.interceptors.request.use((config) => {
            if (Object.keys(this.queue).length === 0) {
                this.toast.show()
            }
            this.queue[url] = url
            return config
        }, error => {
            return Promise.reject(error)
        })

        //响应拦截器
        instance.interceptors.response.use((result) => {
            delete this.queue[url]
            if (Object.keys(this.queue).length === 0) {
                this.toast.hide()
            }
            if (result.data.code === 0) {
                return result.data.data
            }
        }, error => {
            delete this.queue[url]
            if (Object.keys(this.queue).length === 0) {
                this.toast.hide()
            }
            return Promise.reject(error)
        })
    }
}

export default new AjaxRequest