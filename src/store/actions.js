import axios from 'axios'
import router from '@/router/index'
import {mutationType} from './mutations'

const actions = {

  postContents: ({state}) => {
    let contents = state.contents
    return axios.post('/contents', contents).then((response) => {
      router.push('/')
    })
  },

  postFiles: ({commit}, data) => {
    return axios.post('/files', data.formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) =>{
        commit(mutationType.UPDATE_THUMBNAIL_ID, response.data[0])
        commit(mutationType.UPDATE_FILES, response.data.slice(1))

        data.callback()
      })
  },

  getContents: ({commit}, id) => {
    return axios.get('/contents/' + id)
      .then((response) => {
        commit(mutationType.UPDATE_CONTENTS, response.data)
      })
  },

  getContentsList: ({commit}) => {
    return axios.get('/contents')
      .then((response) => {
        commit(mutationType.UPDATE_CONTENTS_LIST, response.data)
      })
  }
}

export default actions
