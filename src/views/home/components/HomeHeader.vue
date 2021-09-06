<template>
  <div class="home">
    <div class="home-header">
      <div class="logo">珠峰课堂</div>
      <i class="iconfont icon-menu" @click="showDrawer"></i>
    </div>
    <div class="home-drawer">
      <cube-drawer
        ref="drawer"
        title="请选择"
        :data="data"
        @select="selectHandler"
      ></cube-drawer>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    categories:{
      type:Array,
      default:()=>[]
    }
  },
  computed:{
    data(){
      let defaultOption = [{ 
            text: '全部课程',
            value: '-1'
            }]
      return this.categories.length>0?[[...defaultOption, ...this.categories]] :defaultOption
    }
  },
  data() {
    return { }
  },
  methods: {
    showDrawer() {
      this.$refs.drawer.show()
    },
    selectHandler(value){
      this.$emit('submitCategory',value)
    }
  },
}
</script>

<style <style lang="stylus">
.home-header {
  height: 20px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #000;
  color: #fff;

  .logo {
    font-size: 25px;
  }

  i {
    font-size: 25px;
    cursor: pointer;
  }
}
</style>
