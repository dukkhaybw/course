<template>
  <div class="home">
    <!-- 头部 -->
    <home-header
      :categories="categories"
      @submitCategory="submitCategory"
    ></home-header>
    <!-- 轮播 -->
    <div class="home-slide">
      <cube-slide :data="slideLists" />
    </div>
    <!-- 课程列表部分 -->
    <div class="view-wrapper">
      <cube-recycle-list
        class="list"
        :size="size"
        :on-fetch="onFetch"
        :offset="offset"
        ref='Courselist'
      >
        <template slot="item" slot-scope="{ data }">
          <div :id="data.id" class="item" @click="handleClick(data)"></div>
        </template>
      </cube-recycle-list>
    </div>
  </div>
</template>

<script>
import HomeHeader from './components/HomeHeader.vue'
// import {mapActions,mapState} from 'vuex'   //调取vuex下 home模块中的setCategories action函数发出请求  方式二  引入帮助函数mapActions
import * as TYPES from '@/store/actions-type.js'
import { fetchCourseLists } from '@/api/home.js'
// import {mapActions} from 'vuex'
// import { createNamespacedHelpers } from 'vuex'   //创建命名空间的帮助函数  方式三
// let {mapActions, mapState} = createNamespacedHelpers('home')
//let {mapActions} = createNamespacedHelpers('home/home1')   //这是获取home模块下的home1子模块中的数据
import { createNamespacedHelpers } from 'vuex'
let { mapActions, mapState, mapMutations } = createNamespacedHelpers('home')

export default {
  name: 'Home',
  data() {
    return {
      size: 5,
      offset: 50,
    }
  },
  computed: {
    // ...mapState('home',['categories'])   //mapState方法返回一个对象，对象的属性是数组参数中对应key，值是一个函数，返回state中该状态对应的值，所以才能用做computed属性
    ...mapState(['categories', 'slideLists']),
  },
  components: {
    HomeHeader,
  },
  created() {
    this.offsetIndex = 0
    this.hasMore = true
  },
  methods: {
    //...mapActions('home',['setCategories']) // 调取vuex下 home模块中的setCategories action函数发出请求 方式二
    // ...mapActions('home',[TYPES.SET_CATEGORIES])  //方式三
    // ...mapActions('home',[TYPES.SET_CATEGORIES])
    ...mapActions([TYPES.SET_CATEGORIES, TYPES.SET_SLIDELISTS]),
    ...mapMutations([TYPES.SET_CURRENTCOURSE]),
    //顶部组件切换课程
    submitCategory(value) {
      this[TYPES.SET_CURRENTCOURSE](value[0])
      this.hasMore = true
      this.offsetIndex = 0
      this.$refs.Courselist.reset()
    },
    async onFetch() {
      if (this.hasMore) {
        let { result, hasMore } = await fetchCourseLists(
          this.size,
          this.offsetIndex 
        )
        this.hasMore = hasMore
        this.offsetIndex = this.offsetIndex + result.length
        return result
      } else {
        return false
      }
    },
  },
  mounted() {
    // this.$store.dispatch('home/setCategories')    调取vuex下 home模块中的setCategories action函数发出请求，方式一
    //this.setCategories()   // 调取vuex下 home模块中的setCategories action函数发出请求 方式二
    // this[TYPES.SET_CATEGORIES]()   //方式三
    // this.$store.dispatch(`home/${[TYPES.SET_CATEGORIES]}`)
    this[TYPES.SET_CATEGORIES]()
    this[TYPES.SET_SLIDELISTS]()
    let timer
    this.$refs.Courselist.$el.addEventListener('scroll',(e)=>{
      if(timer){
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        sessionStorage.setItem('position', e.target.scrollTop)
      }, 50)
    })
  },
  
  //keep-alive 生命周期函数
  activated() {
    let position = sessionStorage.getItem('position') || 0
    this.$refs.Courselist.$el.scrollTop = position
  },
}
</script>
