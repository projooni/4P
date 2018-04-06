// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import apiConfig from '@/apiConfig'
import axios from 'axios'
import './main.css'


Vue.config.productionTip = false

axios.interceptors.request.use(config => {
  config.url = apiConfig + config.url
  return config
})


Vue.directive('focus', {
  inserted : function (el) {
  el.focus()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
