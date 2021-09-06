import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import './assets/reset.css'
import './cube-ui'
import 'amfe-flexible'
import filters from './utils/filters.js'

//定义全局过滤器
Object.keys(filters).forEach(filterName => {
    Vue.filter(filterName, filters[filterName])
})

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')