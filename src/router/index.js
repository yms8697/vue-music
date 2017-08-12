import Vue from 'vue'
import Router from 'vue-router'
import FindMusic from '@/components/findMusic/findMusic.vue'
import MyMusic from '@/components/myMusic/myMusic.vue'
import Community from '@/components/community/community.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/findmusic'
    },
    {
      path: '/findmusic',
      component: FindMusic
    },
    {
      path: '/mymusic',
      component: MyMusic
    },
    {
      path: '/community',
      component: Community
    }
  ]
})
