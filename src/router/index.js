import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import UploadContents from '@/components/upload/UploadContents'
import DetailContents from '@/components/detail/DetailContents'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
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
