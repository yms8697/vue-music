import Vue from 'vue'
import Router from 'vue-router'
import FindMusic from '@/components/findMusic/findMusic.vue'
import MyMusic from '@/components/myMusic/myMusic.vue'
import Community from '@/components/community/community.vue'
import Recommend from '@/components/recommend/recommend.vue'
import MusicList from '@/components/musicList/musicList.vue'
import Radio from '@/components/radio/radio.vue'
import Rank from '@/components/rank/rank.vue'
import MusicListDetail from '@/components/musiclistdetail/musiclistdetail.vue'
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
      redirect: 'findmusic/recommend'
    },
    {
      path: '/findmusic',
      component: FindMusic,
      children: [
        {
          path: '/findmusic/recommend',
          component: Recommend
        },
        {
          path: '/findmusic/musiclist',
          component: MusicList,
          children: [
            {
              path: ':id',
              component: MusicListDetail
            }
          ]
        },
        {
          path: '/findmusic/radio',
          component: Radio
        },
        {
          path: '/findmusic/rank',
          component: Rank
        }
      ]
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
