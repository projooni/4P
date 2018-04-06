import Vue from 'vue'
import Vuex from 'vuex'
import actions from '@/store/actions'
import getters from '@/store/getters'
import mutations from '@/store/mutations'

Vue.use(Vuex)

const state = {
  contents : {
    title: '',
    thumbnail: 0,
    files: [],
    fileTypes: [],
    fileList: []
  },
  thumbnailFile: { src: '', file: '' },
  uploadFiles: [],
  contentsList : []
}
export const root = {
  state,
  actions,
  getters,
  mutations
}

export default new Vuex.Store(root)

