<template>
  <div id="app">
    <div class="container">
      <router-view></router-view>
    </div>
    <div class="footer">
      <cube-tab-bar
        v-model="selectedLabelDefault"
        :data="tabs"
        @change="changeHandler"
      >
      </cube-tab-bar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedLabelDefault: '/',
      tabs: [
        {
          label: '首页',
          value: '/',
          icon: 'cubeic-home',
        },
        {
          label: '我的课程',
          value: '/course',
          icon: 'cubeic-like',
        },
        {
          label: '个人中心',
          value: '/profile',
          icon: 'cubeic-vip',
        },
      ],
    }
  },
  watch: {
    $route: {
      handler(newVal, oldVal) {
        this.selectedLabelDefault = newVal.path
      },
      immediate:true
    },
  },
  methods: {
    changeHandler(value) {
      this.$router.push(value)
    },
  },
}
</script>

<style lang="stylus">
html,body,#app{
  height:100%;
  width:100%;
}
#app{
  display:flex;
  flex-direction:column;
}
.container{
  flex:1;
  overflow:auto 
}
.footer{
  background-color #ccc
}
</style>
