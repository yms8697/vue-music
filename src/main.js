// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './common/stylus/index.styl'
import 'iview/dist/styles/iview.css'
import iView from 'iview'
import VueLazyload from 'vue-lazyload'
// import 'iview/dist/styles/iview.css'
Vue.use(iView)
Vue.config.productionTip = false
Vue.use(VueLazyload, {
  loading: require('./assets/logo.png')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
