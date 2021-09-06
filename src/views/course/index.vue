<template>
  <div class="course">
    <h1>course</h1>
  </div>
</template>

<script>
export default {
  //路由守卫
  beforeRouteEnter (to, from, next) {  
    next((vm)=>{
      console.log(vm)   //vm代表当前组件实例，但是该回调函数会在当前组件创建完成后再被调用
    })
  }
}
</script>

<style>
.course h1{
  background-color: #afc;
}
</style>