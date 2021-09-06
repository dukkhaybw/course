<template>
  <div class="profile">

    <div class="profile-logn" v-if='user.username'>
      <img src="@/assets/images/photo.png" alt="avator" class="avator">
      <cube-button primary @click="handleLogin">登录</cube-button>
    </div>

    <div class="profile.info" v-else>
      <img src="@/assets/images/photo.png" v-if="!user.url" alt="avator" class="avator" @click="upFile">
      <img :src="user.url" v-else alt="avator" class="avator" @click="upFile">
      <Uploading ref='upload' @change='change'></Uploading>
      <div>欢迎你！{{user.username}}</div>
    </div>
    <ul class="user-right">
      <router-link tag="li" :to='menu.path' v-for='menu in user.menuList' :key='menu.path'>
        {{menu.name}}
      </router-link>
    </ul>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import Uploading from '@/components/Uploading.vue'
import * as TYPES from '@/store/actions-type.js'
export default {
  components:{
    Uploading
  },
  computed:{
    ...mapState(['user'])
  },
  methods: {
    ...mapActions([TYPES.SET_AVATOR]),
    handleLogin(){
      this.$router.push('/login')
    },
    //上传头像
    upFile(){
      this.$refs.upload.show()
    },
    change(fd){
      this[TYPES.SET_AVATOR](fd)
    }
  },
}
</script>

<style>

</style>