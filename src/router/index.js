import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      // data() {
      //   return{
      //     cards: [
      //       {url: '/static/component/html/step.html'}
      //     ]
      //   }
      // }
    },
    // {
    //   path: '/contents/upload',
    //   name: 'UploadContents',
    //   component: UploadContents
    // },
    // {
    //   path: '/contents/:id',
    //   name: 'DetailContents',
    //   component: DetailContents,
    //   props: true
    // }
  ]
})
