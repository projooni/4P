const getFileType = function(extension) {
  switch (extension) {
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'jpg':
      return 'image'
      break;
    case 'mp4':
      return 'video'
      break;
    case 'psd':
      return 'psd'
      break;
    case 'xd':
      return 'xd'
      break;
    case 'pie':
      return 'pie'
      break;
    case 'ppt':
    case 'pptx':
      return 'ppt'
      break;
    default:
      return undefined
      break;
  }
}

export default getFileType
