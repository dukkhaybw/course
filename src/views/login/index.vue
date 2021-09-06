<template>
  <div class="login mask">
    <MHeader>登录</MHeader>
    <cube-form
      :model="model"
      @submit="submitHandler"
    >
      <cube-form-group>
        <cube-form-item :field="fields[0]"></cube-form-item>
        <cube-form-item :field="fields[1]"></cube-form-item>
      </cube-form-group>
      <cube-form-group>
        <cube-button type="submit">Submit</cube-button>
      </cube-form-group>
    </cube-form>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import MHeader from '@/components/MHeader.vue'
import * as TYPES from '@/store/actions-type.js'
export default {
  data() {
    return {
      model: {
        username: '',
        password:''
      },
      fields: [
        {
          type: 'input',
          modelKey: 'username',
          label: '用户名:',
          props: {
            placeholder: '请输入用户名',
          },
          rules: {
            required: true,
          },
        },
      {
          type: 'input',
          modelKey: 'password',
          label: '密码:',
          props: {
            placeholder: '请输入密码',
            type:'password'
          },
          rules: {
            required: true,
          },
        }
      ],
    }
  },
  components:{
    MHeader
  },
  methods: {
    async submitHandler(e) {
      e.preventDefault()
      try {
        let result =await this[TYPES.SET_LOGIN](this.model)
        if (result.code === 1) {
          this.$router.push('/')
        }else{
          throw new Error(result)
        }
      } catch (error) {
        console.log(error);
      }
    },
    ...mapActions([TYPES.SET_LOGIN])
  }
}
</script>

<style>
</style>