<template>
  <div class="card">
    <div class="image-area">
      <img :src="thumbnailSrc">
      <file-type-icon class="file-type-icon" :file-types="contents.fileTypes"></file-type-icon>
    </div>
    <div class="detail-info">
      <div class="title">{{contents.title}}</div>
      <div class="create-info">
        <span class="writer"></span>
        <span class="create-date">{{this.contents.createDate.slice(0,10)}}</span>
        <span class="download-count"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import FileTypeIcon from '@/components/detail/FileTypeIcon'

  export default {
    components: { FileTypeIcon },
    name: "content-card",
    props: ['contents'],
    computed: {
      thumbnailSrc() {
        let thumbnailImage = this.contents.thumbnailImage
        return thumbnailImage.src = "data:image/" + thumbnailImage.extension + ";base64," + thumbnailImage.src
      }
    }
  }
</script>

<style scoped>
  .card {
    width: 364px;
    height: 313px;
    border-radius: 4px;
    background-color: #ffffff;
    margin: 15px 10px;
    box-sizing: border-box;
    box-shadow: 0 4px 15px 0 rgba(0, 0, 0, 0.18)
  }

  .image-area {
    position: relative;
    height: 240px;
  }

  .image-area .file-type-icon{
    top: auto;
    left: 16px;
    bottom: 6px;
  }

  .image-area > img{
    width: 100%;
    min-width: 100%;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  .detail-info {
    height: 73px;
  }

  .title{
    font-size: 13px;
    font-weight: bold;
    line-height: 1.15;
    color: rgba(0, 0, 0, 0.8);
    margin: 20px 16px 10px 16px;
  }

  .create-info{
    font-size: 11px;
    line-height: 1.27;
    color: rgba(0, 0, 0, 0.6);
    margin: 0px 16px;
  }
</style>
