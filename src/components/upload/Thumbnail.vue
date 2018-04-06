<template>
  <div class="thumbnail">
    <div class="upload" ref="upload" @dragover="dragOverHandler" @drop="dropHandler" @dragend="dragEnd"
         @dragenter="dragEnter" @dragleave="dragLeave">
      <div v-if="!drag && !showThumbnail" class="drag-container">
        <div class="drop">Drag & Drop your cover image</div>
        <div class="size">Size : 364 X 240 px</div>
      </div>
      <div v-if="drag && !showThumbnail" class="drag-hover">
        <div class="drop">Drop your image here!</div>
        <div class="size">Size : 364 X 240 px</div>
      </div>
      <img v-if="showThumbnail" :src="thumbnailFile.src">
    </div>
  </div>
</template>

<script>
  import {mutationType} from "@/store/mutations"
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: 'Thumbnail',
    data: function () {
      return {
        showThumbnail: false,
        drag: false,
        thumbnailWidth: 364,
        thumbnailHeight: 240,
        thumbnailImageName: ''
      }
    },
    computed: {
      ...mapGetters(['contents', 'thumbnailFile'])
    },
    methods: {
      ...mapMutations([mutationType.UPDATE_CONTENTS, mutationType.UPDATE_THUMBNAIL_FILE, mutationType.UPDATE_UPLOAD_FILES]),
      makeThumbnailFromFile: function (file) {
        let _this = this;

        let reader = new FileReader();
        reader.readAsDataURL(file);
        this.thumbnailImageName = file.name.split(/(\.png|\.gif|\.jpg|\.jpeg)$/i)[0];
        reader.onload = function () {
          _this.setThumbnail(reader.result);
        }

        this.showThumbnail = true
      },
      setThumbnail(imageSrc) {
        let _this = this;

        let canvas = document.createElement('canvas');
        let canvasContext = canvas.getContext("2d");
        canvas.width = this.thumbnailWidth;
        canvas.height = this.thumbnailHeight;

        canvasContext.fillStyle = "white";
        canvasContext.fillRect(0, 0, this.thumbnailWidth, this.thumbnailHeight);

        let image = new Image()
        image.src = imageSrc
        image.onload = function () {

          const isSmallSize = this.width < _this.thumbnailWidth && this.height < _this.thumbnailHeight
          if(isSmallSize) {
            _this.drawImageToCenter(this, canvasContext)
          } else {
            _this.drawResizedImage(this, canvasContext)
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
        let destX, destY
        destX = (this.thumbnailWidth - image.width) / 2;
        destY = (this.thumbnailHeight - image.height) / 2;
        canvasContext.drawImage(image, destX, destY, image.width, image.height)
      },
      dragOverHandler(ev) {
        ev.preventDefault()
        this.drag = true
      },
      dropHandler(ev) {
        ev.preventDefault()
        let imageFile = ev.dataTransfer.files[0];
        this.makeThumbnailFromFile(imageFile);
        this.drag = false
      },
      dragEnd: function () {
        this.drag = false
      },
      dragEnter: function () {
        this.drag = true
      },
      dragLeave: function () {
        this.drag = false
      }
    }
  }
</script>

<style scoped>
  .thumbnail {
    display: inline-block;
  }

  .upload {
    width: 508px;
    height: 316px;
    background-color: #f7f9fc;
    margin-left: 68px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    max-width: 364px;
    max-height: 249px;
  }

  .drag-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .drop {
    font-size: 18px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.17;
    letter-spacing: normal;
    text-align: center;
    color: rgba(0, 0, 0, 0.6);
  }

  .size {
    font-size: 13px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.54;
    letter-spacing: normal;
    text-align: left;
    color: rgba(0, 0, 0, 0.6);
    margin-top: 15px;
  }

  .drag-hover {
    width: 364px;
    height: 249px;
    background-color: rgba(154, 184, 229, 0.15);
    border: solid 1px #386cd0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .drag-hover .drop {
    color: #386cd0;
  }

  .drag-hover .size {
    color: #386cd0;
  }
</style>
