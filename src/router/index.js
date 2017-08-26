import Vue from 'vue'
import Router from 'vue-router'
import FindMusic from '@/components/findMusic/findMusic'
import MyMusic from '@/components/myMusic/myMusic'
import Community from '@/components/community/community'
import Recommend from '@/components/recommend/recommend'
import MusicList from '@/components/musicList/musicList'
import Radio from '@/components/radio/radio'
import Rank from '@/components/rank/rank'
import Search from '@/components/search/search'
import MusicListDetail from '@/components/musiclistdetail/musiclistdetail'
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
      path: '/search',
      component: Search
    },
    {
      path: '/findmusic',
      component: FindMusic,
      children: [
        {
          path: 'recommend',
          component: Recommend
        },
        {
          path: 'musiclist',
          component: MusicList,
          children: [
            {
              path: ':id',
              component: MusicListDetail
            }
          ]
        },
        {
          path: 'radio',
          component: Radio
        },
        {
          path: 'rank',
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
