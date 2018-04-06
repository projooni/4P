<template>
  <div class="file-drop" :class="{'file-drop-dragover':drag}" @dragend="dragEnd" @dragenter="dragEnter" @dragleave="dragLeave" @dragover="dragOverHandler"
       @drop="dropHandler">
    <div v-if="uploadFiles.length === 0" class="dropzone">
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
        <div v-for="video in fileTypes.video" class="file-description">
          <img src="/static/images/video_icon.svg">
          <div>{{video.name}}</div>
          <div>{{video.size}}MB</div>
        </div>
        <div v-for="image in fileTypes.image" class="file-description">
          <img src="/static/images/image_icon.svg">
          <div>{{image.name}}</div>
          <div>{{image.size}}MB</div>
        </div>
        <div v-for="xd in fileTypes.xd" class="file-description">
          <img src="/static/images/xd_icon.svg">
          <div>{{xd.name}}</div>
          <div>{{xd.size}}MB</div>
        </div>
        <div v-for="psd in fileTypes.psd" class="file-description">
          <img src="/static/images/psd_icon.svg">
          <div>{{psd.name}}</div>
          <div>{{psd.size}}MB</div>
        </div>
        <div v-for="pie in fileTypes.pie" class="file-description">
          <img src="/static/images/pie_icon.svg">
          <div>{{pie.name}}</div>
          <div>{{pie.size}}MB</div>
        </div>
        <div v-for="ppt in fileTypes.ppt" class="file-description">
          <img src="/static/images/ppt_icon.svg">
          <div>{{ppt.name}}</div>
          <div>{{ppt.size}}MB</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mutationType} from "@/store/mutations";
  import {mapMutations, mapGetters} from 'vuex'
  import getFileType from "@/utils/fileTypeUtil";
  export default {
    name: "files",
    data() {
      return {
        dropMessage: 'Drag & Drop your files',
        drag: false,
        fileTypes: {
          image: [],
          video: [],
          xd: [],
          ppt: [],
          pie: [],
          psd: []
        }
      }
    },
    computed: {
      ...mapGetters(['uploadFiles'])
    },
    methods: {
      ...mapMutations([mutationType.UPDATE_UPLOAD_FILES]),
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
        let uploadFiles = this.uploadFiles
        files.forEach((file) => {
          let fileData = {
            name: file.name,
            size: (file.size / 1000000).toFixed(2)
          }
          let extension = file.name.split('.').pop().toLowerCase()

          let fileType = getFileType(extension)
          if(fileType) {
            fileData.type = fileType
            _this.fileTypes[fileType].push(fileData)
            uploadFiles.push(file)
          }
        })
        this.UPDATE_UPLOAD_FILES(uploadFiles)
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
    display: flex;
    width: 912px;
    flex-wrap: wrap;
  }

  .file-description {
    width: 431px;
    height: 24px;
    display: flex;
    align-items: center;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .files-container > div:nth-of-type(even){
    margin-left: 49px;
  }

  .file-description > img {
    width: 24px;
    height: 24px;
  }

  .file-description > div:nth-of-type(1) {
    width: 288px;
    margin-left: 10px;
    font-size: 12px;
    line-height: 1.17;
    color: rgba(0, 0, 0, 0.6);
  }
  .file-description > div:nth-of-type(2) {
    font-size: 12px;
    line-height: 1.17;
    color: rgba(0, 0, 0, 0.4);
    margin-left: 27px;
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
