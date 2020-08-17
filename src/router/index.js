import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/About'
import Publish from '@/components/Publish'
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
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/publish',
      name: 'Publish',
      component: Publish
    }
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
