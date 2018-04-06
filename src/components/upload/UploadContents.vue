<template>
  <div class="upload-contents">
    <div class="step-title">
      <img src="/static/images/step_first.svg">
      <span>Enter your title and upload cover image</span>
    </div>
    <div class="title-thumbnail">
      <div class="input-box">
        <input class="content-title" ref="titleInput" v-model="contents.title" placeholder="Enter title"
               maxlength="40">
        <span class="content-title-length">{{contents.title.length}} / 40</span>
      </div>
      <thumbnail></thumbnail>
    </div>
    <div class="step-title">
      <img src="/static/images/step_second.svg">
      <span>Upload your files ( {{totalFilesSize}}MB / 50.00MB )</span>
    </div>
    <files class="files"></files>
    <!--<div class="step-title">-->
      <!--<img src="/static/images/step_second.svg">-->
      <!--<span>Upload your files ( {{totalFilesSize}}MB / 50.00MB )</span>-->
    <!--</div>-->
    <!--<images class="files"></images>-->
    <div class="button-control">
      <button class="cancel" @click="redirectToHome">Cancel</button>
      <button class="confirm" :disabled="!isTitleEntered"
              :class="{'confirm-active': isTitleEntered()}" @click="pressConfirm">Confirm
      </button>
    </div>
  </div>
</template>

<script>
  import router from '@/router/index'
  import {mapActions, mapGetters, mapMutations} from 'vuex'
  import Thumbnail from '@/components/upload/Thumbnail'
  import Files from '@/components/upload/Files'
  import Images from '@/components/upload/Images'
  import getFileType from "@/utils/fileTypeUtil";
  import {mutationType} from "@/store/mutations";

  export default {
    name: "upload-contents",
    components: {Thumbnail, Files, Images},
    computed: {
      ...mapGetters(['contents', 'uploadFiles', 'thumbnailFile']),
      totalFilesSize: function() {
        let totalSize = 0
        this.uploadFiles.forEach((file) => {
          totalSize += file.size
        })

        return (totalSize / 1000000).toFixed(2)
      }
    },
    mounted() {
      this.$refs.titleInput.focus()
    },
    methods: {
      ...mapActions(['postContents', 'postFiles']),
      ...mapMutations([mutationType.UPDATE_CONTENTS_FILE_TYPES]),
      isTitleEntered() {
        return this.contents.title.length > 0
      },
      redirectToHome() {
        router.push('/')
      },
      pressConfirm() {
        let formData = new FormData()
        formData.append('files', this.thumbnailFile.file, 'thumbnail.jpg')
        this.uploadFiles.forEach((file) => {
          formData.append('files', file, file.name)
        })
        this.setFileTypes()
        this.postFiles({formData: formData, callback: this.postContents})
      },
      setFileTypes() {
        let fileTypes = []
        this.uploadFiles.forEach((file) => {
          let extension = file.name.split('.').pop().toLowerCase()
          let fileType = getFileType(extension)
          if(fileType && !fileTypes.includes(fileType)) {
            fileTypes.push(fileType)
          }
        })
        this.UPDATE_CONTENTS_FILE_TYPES(fileTypes)
      }
    }
  }
</script>

<style scoped>
  .upload-contents {
    width: 1136px;
    margin: 0 auto;
  }
  .step-title {
    display: flex;
    align-items: center;
  }

  .title-thumbnail {
    display: flex;
    align-items: center;
    margin-top: 32px;
  }

  .step-title > img {
    width: 40px;
    height: 40px;
  }

  .step-title > span {
    margin-left: 10px;
    font-size: 18px;
    font-weight: bold;
    line-height: 1.17;
    color: rgba(0, 0, 0, 0.6);
  }

  .input-box {
    width: 460px;
    margin-left: 48px;
    text-align: right;
  }

  .content-title {
    display: block;
    width: 460px;
    height: 37px;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: solid 1px #000000;
    font-size: 24px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.17;
    letter-spacing: normal;
    color: rgba(0, 0, 0, 0.8);
  }

  .content-title-length {
    display: block;
    margin-top: 10px;
    font-size: 13px;
    text-align: right;
    color: rgba(0, 0, 0, 0.6);
  }

  .files {
    margin: 30px auto 0 auto;
  }

  .button-control {
    text-align: right;
    margin-top: 133px;
  }

  .button-control button {
    width: 172px;
    height: 54px;
    font-size: 16px;
    background-color: #ffffff;
    border: solid 1px #707070;
    outline: none;
  }

  .button-control .confirm {
    color: #ffffff;
    background-color: #859dcb;
    border: none;
    cursor: not-allowed;
  }

  .button-control .confirm-active {
    background-color: #386cd0;
    cursor: pointer;
  }

  input:focus {
    outline: none;
    border-bottom: solid 1px #386cd0;
  }

  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: rgba(0, 0, 0, 0.2);
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: rgba(0, 0, 0, 0.2);
  }

  ::-ms-input-placeholder { /* Microsoft Edge */
    color: rgba(0, 0, 0, 0.2);
  }
</style>
