<template>
  <div class="detail-contents">
    <div class="image-container">
      <div class="title">{{contents.title}}</div>
      <div class="image-contents" v-for="file in fileList">
        <img :src="file.src">
        <span>{{file.name}}</span>
      </div>
    </div>
    <div class="desc-container">
      <div class="files-info">
        <span class="total-file-count">Total {{contents.files.length}} files</span>
        <file-type-icon :file-types="contents.fileTypes"></file-type-icon>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import apiConfig from "@/apiConfig";
  import getFileType from "@/utils/fileTypeUtil";
  import FileTypeIcon from '@/components/detail/FileTypeIcon'

  export default {
    name: "detail-contents",
    props: ['id'],
    components: {FileTypeIcon},
    computed: {
      ...mapGetters(['contents']),
      fileList() {

        let fileListWithDataSrc = [];

        for(let i = 0 ; i < this.contents.fileList.length ; i++) {
          let file = this.contents.fileList[i];
          let fileType = getFileType(file.extension.toLowerCase())
          if(fileType === 'image') {
            file.src = apiConfig + "/images/" + file.id;
            fileListWithDataSrc.push(file)
          }
        }
        return fileListWithDataSrc;
      }
    },
    mounted() {
      this.getContents(this.id)
    },
    methods: {
      ...mapActions(['getContents'])
    }
  }
</script>

<style scoped>
  .detail-contents {
    min-width: 364px;
    padding: 40px 60px;
  }
  .detail-contents:after {
    content: ' ';
    clear: both;
    display: block;
  }
  .image-container {
    width: calc(100% - 430px);
    background-color: #f2f5fa;
    padding: 40px 45px 20px 45px;
    float: left;
  }
  .desc-container {
    width: 280px;
    padding: 40px 30px;
    float: left;
  }
  .title {
    font-size: 24px;
    font-weight: bold;
    line-height: 1.17;
    text-align: left;
    color: rgba(0, 0, 0, 0.8);
  }
  .total-file-count {
    font-size: 14px;
    font-weight: bold;
    line-height: 22px;
    text-align: left;
    color: rgba(0, 0, 0, 0.6);
  }
  .files-info {
    position: relative;
  }
  .image-contents {
    text-align: center;
    margin-top: 40px;
  }
  .image-contents > span {
    display: block;
    margin: 15px 0 60px 0;
    font-size: 12px;
    line-height: 1.17;
    color: rgba(0, 0, 0, 0.6);
  }
  .image-contents > img {
    max-width: 100%;
  }
</style>
