import Vue from 'vue'
import Vuex from 'vuex'

import home from './modules/Home.js'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        home
    }
    // ,
    // state: {},
    // mutations: {},
    // actions: {},
    // modules: {}
})