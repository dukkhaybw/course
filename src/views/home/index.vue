<template>
  <div class="home">
    <home-header></home-header>
  </div>
</template>

<script>
import HomeHeader from './components/HomeHeader.vue'
// import {mapActions,mapState} from 'vuex'   //调取vuex下 home模块中的setCategories action函数发出请求  方式二  引入帮助函数mapActions
// import * as TYPES from '@/store/actions-type.js'
// import { createNamespacedHelpers } from 'vuex'   //创建命名空间的帮助函数  方式三
// let {mapActions, mapState} = createNamespacedHelpers('home')
//let {mapActions} = createNamespacedHelpers('home/home1')   //这是获取home模块下的home1子模块中的数据


export default {
  name: 'Home',
  computed:{
    // ...mapState('home',['categories'])   //mapState方法返回一个对象，对象的属性是数组参数中对应key，值是一个函数，返回state中该状态对应的值，所以才能用做computed属性
  },
  components: {
    HomeHeader
  },
  methods:{
    //...mapActions('home',['setCategories']) // 调取vuex下 home模块中的setCategories action函数发出请求 方式二

    // ...mapActions('home',[TYPES.SET_CATEGORIES])  //方式三
  },
  mounted() {
    // this.$store.dispatch('home/setCategories')    调取vuex下 home模块中的setCategories action函数发出请求，方式一
    //this.setCategories()   // 调取vuex下 home模块中的setCategories action函数发出请求 方式二
    // this[TYPES.SET_CATEGORIES]()   //方式三
    this.$store.dispatch('home/setCategories')
  },
}
</script>
