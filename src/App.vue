<template>
  <div id="app">
    <div class="container">
      <transition :name='move'>
        <keep-alive>
          <router-view  v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
      </transition>

      <transition :name='move'>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </transition>
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
      move: 'slide-left',
      tabs: [
        {
          label: '首页',
          value: '/',
          icon: 'iconfont icon-home',
        },
        {
          label: '我的课程',
          value: '/course',
          icon: 'iconfont icon-course-management',
        },
        {
          label: '个人中心',
          value: '/profile',
          icon: 'iconfont icon-Profile',
        },
      ],
    }
  },
  watch: {
    $route: {
      handler(newVal, oldVal) {
        if (newVal && oldVal) {
          if (newVal.meta.index > oldVal.meta.index) {
            this.move = 'slide-left'
          } else {
            this.move = 'slide-right'
          }
        }
        this.selectedLabelDefault = newVal.path
      },
      immediate: true,
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
html, body, #app {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

#app {
  display: flex;
  flex-direction: column;
}

.container {
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
}

.footer {
  background-color: #ccc;
}

.slide-left-enter-active, .slide-left-leave-active, .slide-right-enter-active, .slide-right-leave-active {
  transition: all 0.4s;
}

.slide-left-leave-active {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.slide-right-enter-active {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.slide-left-enter {
  transform: translate(100%);
}

.slide-left-leave-to {
  transform: translate(-100%);
}

.slide-right-enter {
  transform: translate(-100%);
}

.slide-right-leave-to {
  transform: translate(100%);
}

.mask{
  position :absolute;
  top:0;
  left:0;
  width :100%;
  height:100%;
  z-index:10;
}
</style>
