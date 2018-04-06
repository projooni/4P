<template>
  <div class="file-drop" :class="{'file-drop-dragover':drag}" @dragend="dragEnd" @dragenter="dragEnter" @dragleave="dragLeave" @dragover="dragOverHandler"
       @drop="dropHandler">
    <div v-if="!fileTypes.image.length" class="dropzone">
      <div>{{dropMessage}}</div>
      <div>Max 50MB</div>
      <div>
        <div data-label="Image"><span>:</span>jpg, jpeg, png, gif</div>
        <div data-label="Video"><span>:</span>mp4</div>
        <div data-label="Design"><span>:</span>xd, psd, pie, pptx</div>
      </div>
    </div>
    <div>
      <div class="files-container">
        <div v-for="image in fileTypes.image" class="file-description">
          <img :src=image.src @click="setThumbnail(image.src)">
          <div>{{image.name}}</div>
          <div>{{image.size}}MB</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import getFileType from "@/utils/fileTypeUtil"
  import {mutationType} from "@/store/mutations";
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: "files",
    data() {
      return {
        dropMessage: 'Drag & Drop your files',
        drag: false,
        fileTypes: {
          image: []
        },
        thumbnailSrc: '',
        cardImageWidth: 364,
        cardImageHeight: 240,
        thumbnailWidth: 728,
        thumbnailHeight: 480,
      }
    },
    computed: {
      ...mapGetters(['contents', 'thumbnailFile'])
    },
    methods: {
      ...mapMutations([mutationType.UPDATE_CONTENTS, mutationType.UPDATE_THUMBNAIL_FILE, mutationType.UPDATE_UPLOAD_FILES]),
      dragEnter() {
        this.dropMessage = 'Drop your files here!'
        this.drag = true
      },
      dragLeave() {
        this.dropMessage = 'Drag & Drop your files'
        this.drag = false
      },
      dragEnd() {
        this.dropMessage = 'Drag & Drop your files'
        this.drag = false
      },
      dragOverHandler(ev) {
        ev.preventDefault()
        this.dropMessage = 'Drop your files here!'
        this.drag = true
      },
      dropHandler(ev) {
        ev.preventDefault()
        this.setFileListByType(ev.dataTransfer.files)
        this.drag = false
      },
      setFileListByType(fileList) {
        let _this = this
        let files = [...fileList]
        files.forEach((file, index) => {

          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function () {

            let fileData = {
              name: file.name,
              size: (file.size / 1000000).toFixed(2),
              src: reader.result
            }
            let extension = file.name.split('.').pop().toLowerCase()

            let fileType = getFileType(extension)
            if (fileType && fileType === 'image') {
              fileData.type = fileType
              _this.fileTypes[fileType].push(fileData)
            }

            if(index === 0 && !_this.thumbnailFile.src) {
              _this.setThumbnail(fileData.src);
            }
          }
        })

      },
      setThumbnail(imageSrc) {
        let _this = this;

        let canvas = document.createElement('canvas');
        let canvasContext = canvas.getContext("2d");
        canvas.width = this.thumbnailWidth;
        canvas.height = this.thumbnailHeight;

        canvasContext.mozImageSmoothingEnabled = true;
        canvasContext.webkitImageSmoothingEnabled = true;
        canvasContext.msImageSmoothingEnabled = true;
        canvasContext.imageSmoothingEnabled = true;

        let image = new Image()
        image.src = imageSrc
        image.onload = () => {

          canvasContext.fillStyle = 'white';
          canvasContext.fillRect(0, 0, _this.thumbnailWidth, _this.thumbnailHeight);
          const isSmallSize = image.width < _this.cardImageWidth && image.height < _this.cardImageHeight
          if(isSmallSize) {
            _this.drawImageToCenter(image, canvasContext)
          } else {
            _this.drawResizedImage(image, canvasContext)
          }

          let thumbnailFile = {}

          thumbnailFile.file = _this.dataURItoBlob(canvas.toDataURL('image/jpeg'))
          thumbnailFile.src = canvas.toDataURL('image/jpeg')

          _this.UPDATE_THUMBNAIL_FILE(thumbnailFile)
          _this.UPDATE_CONTENTS(_this.contents)

        }
      },
      dataURItoBlob(dataURI) {
        let binary;

        if(dataURI.split(',')[0].indexOf('base64') !== -1 ) {
          binary = atob(dataURI.split(',')[1])
        } else {
          binary = decodeURI(dataURI.split(',')[1])
        }

        let array = [];

        for(let i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
      },
      drawResizedImage(image, canvasContext) {
        const isOverRatio = image.width / image.height >= this.thumbnailWidth / this.thumbnailHeight;

        const originWidth = image.width,
          originHeight = image.height

        let destWidth, destHeight, destX, destY, ratio;

        if (isOverRatio) {
          destWidth = this.thumbnailWidth;
          ratio = destWidth / originWidth;
          destHeight = originHeight * ratio;
          destX = 0;
          destY = (this.thumbnailHeight - destHeight) / 2;
        } else {
          destHeight = this.thumbnailHeight;
          ratio = destHeight / originHeight;
          destWidth = originWidth * ratio;
          destX = (this.thumbnailWidth - destWidth) / 2;
          destY = 0
        }

        canvasContext.drawImage(image, destX, destY, destWidth, destHeight)
      },
      drawImageToCenter(image, canvasContext) {
        let destX, destY,
          thumbnailRatio = this.thumbnailWidth / this.cardImageWidth;
        destX = (this.thumbnailWidth - image.width * thumbnailRatio) / 2;
        destY = (this.thumbnailHeight - image.height * thumbnailRatio) / 2;
        canvasContext.drawImage(image, destX, destY, image.width * thumbnailRatio, image.height * thumbnailRatio)
      }

    }
  }
</script>

<style scoped>
  .file-drop {
    width: 1036px;
    height: 347px;
    background-color: #f2f5fa;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: solid 1px transparent;
  }

  .file-drop-dragover {
    background-color: rgba(229, 237, 247, 0.9);
    border: solid 1px #4f6da7;
  }

  .file-drop-dragover div{
    color: #386cd0 !important;
  }

  .dropzone {
    width: 1036px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .dropzone > div:nth-child(1) {
    font-size: 18px;
    font-weight: bold;
    line-height: 1.17;
    color: rgba(0, 0, 0, 0.6);
    margin-bottom: 10px;
  }

  .dropzone > div:nth-child(2) {
    font-size: 13px;
    font-weight: bold;
    line-height: 1.15;
    color: rgba(0, 0, 0, 0.6);
    margin-bottom: 30px;
  }

  .dropzone > div:nth-child(3) {
    font-size: 13px;
    line-height: 1.54;
    color: rgba(0, 0, 0, 0.6);
  }

  .files-container {
    width: 912px;
  }

  .file-description {
    display: inline-block;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .files-container > div{
    margin-left: 49px;
  }

  .file-description > img {
    max-width: 192px;
    max-height: 126px;
  }

  .file-description > div:nth-of-type(1) {
    font-size: 12px;
    line-height: 1.17;
    color: rgba(0, 0, 0, 0.6);
  }
  .file-description > div:nth-of-type(2) {
    font-size: 12px;
    line-height: 1.17;
    color: rgba(0, 0, 0, 0.4);
  }

  div[data-label] {
    padding-left: 50px;
    position: relative;
  }

  div[data-label] > span {
    margin-right: 10px;
  }

  div[data-label]:before {
    content: attr(data-label);
    position: absolute;
    left: 0;
  }
</style>
