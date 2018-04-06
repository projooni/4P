export const mutationType = {
  UPDATE_CONTENTS : 'UPDATE_CONTENTS',
  UPDATE_CONTENTS_FILE_TYPES : 'UPDATE_CONTENTS_FILE_TYPES',
  UPDATE_CONTENTS_LIST: 'UPDATE_CONTENTS_LIST',
  UPDATE_THUMBNAIL_ID : 'UPDATE_THUMBNAIL_ID',
  UPDATE_THUMBNAIL_FILE: 'UPDATE_THUMBNAIL_FILE',
  UPDATE_FILES : 'UPDATE_FILES',
  UPDATE_UPLOAD_FILES : 'UPDATE_UPLOAD_FILES'
}

const mutations = {
  [mutationType.UPDATE_CONTENTS] (state, contents) {
    state.contents = contents
  },
  [mutationType.UPDATE_THUMBNAIL_ID] (state, thumbnailId) {
    state.contents.thumbnail = thumbnailId
  },
  [mutationType.UPDATE_THUMBNAIL_FILE] (state, thumbnailFile) {
    state.thumbnailFile = thumbnailFile
  },
  [mutationType.UPDATE_FILES] (state, fileIds) {
    state.contents.files = fileIds
  },
  [mutationType.UPDATE_UPLOAD_FILES] (state, fileList) {
    state.uploadFiles = fileList
  },
  [mutationType.UPDATE_CONTENTS_FILE_TYPES] (state, fileTypes) {
    state.contents.fileTypes = fileTypes
  },
  [mutationType.UPDATE_CONTENTS_LIST] (state, contentsList) {
    state.contentsList = contentsList
  }
}

export default mutations
