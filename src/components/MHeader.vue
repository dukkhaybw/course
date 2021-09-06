<template>
  <div class="m-header">
    <i class='iconfont iconfont-fanhui'></i>
    <slot></slot>
    <div class="empty"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus">
.m-header{
  position: absolute;
  width: 100%;
  height: 60px;
  text-align :center;
  background-color: #2a2a2a;
  color: #fff;
  line-height: 60px;
  .iconfont-fanhui{
    position: absolute;
    left :15px;
  }
  .empty{
    height:70px
  }
}
</style>