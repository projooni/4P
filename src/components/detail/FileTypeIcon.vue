<template>
  <div class="file-category-info">
    <img v-if='fileTypes.includes("xd")' src="/static/images/xd_icon.svg">
    <img v-if='fileTypes.includes("psd")' src="/static/images/psd_icon.svg">
    <img v-if='fileTypes.includes("video")' src="/static/images/video_icon.svg">
    <img v-if='fileTypes.includes("image")' src="/static/images/image_icon.svg">
    <img v-if='fileTypes.includes("pie")' src="/static/images/pie_icon.svg">
    <img v-if='fileTypes.includes("ppt")' src="/static/images/ppt_icon.svg">
  </div>
</template>

<script>
    export default {
      name: "file-type-icon",
      props: ['fileTypes']
    }
</script>

<style scoped>
  .file-category-info {
    position: absolute;
    top: 0;
    right: 0;
  }
  .file-category-info > img {
    width: 22px;
    height: 22px;
  }
</style>
