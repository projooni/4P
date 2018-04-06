<template>
  <div class="home">
    <!--<div class="upload-button-box">-->
      <!--<button class="upload-button" @click="redirectUploadPage()">UPLOAD</button>-->
    <!--</div>-->
    <!--<div class="contents-list">-->
      <!--<template v-for="contents in this.contentsList">-->
        <!--<content-card :contents="contents"></content-card>-->
      <!--</template>-->
    <!--</div>-->
    <div class="grid">
      <div class="grid-item"></div>
      <div class="grid-item">
        <iframe name="component-frame" src="/static/component/html/step.html" frameborder="0"></iframe>
      </div>
      <div class="grid-item">
        <iframe name="component-frame" src="/static/component/html/long-paragraph.html" frameborder="0"></iframe>
      </div>
      <div class="grid-item grid-item--height2"></div>
      <div class="grid-item grid-item--width3"></div>
      <div class="grid-item"></div>
      <div class="grid-item">
        <iframe name="component-frame" src="/static/component/html/table-with-page-navigation.html" frameborder="0"></iframe>
      </div>
      <div class="grid-item grid-item--height2"></div>
      <div class="grid-item grid-item--width2 grid-item--height3"></div>
      <div class="grid-item"></div>
      <div class="grid-item grid-item--height2"></div>
      <div class="grid-item"></div>
      <div class="grid-item grid-item--width2 grid-item--height2"></div>
      <div class="grid-item grid-item--width2"></div>
      <div class="grid-item"></div>
      <div class="grid-item grid-item--height2"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item grid-item--height3"></div>
      <div class="grid-item grid-item--height2"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item grid-item--height2"></div>
    </div>
  </div>
</template>

<script>
  // import router from '@/router'
  // import ContentCard from '@/components/ContentCard'
  // import { mapActions, mapGetters } from 'vuex'
  // import masonry from 'https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js';
  import 'expose-loader?$!expose-loader?jQuery!jquery';
  import '../store/masonry.min';

  export default {
    name: 'Home',
    // components: {ContentCard},
    // computed: {
    //   ...mapGetters(['contentsList'])
    // },
    // data () {
    //   return {
    //   }
    // },
    // mounted() {
    //   this.getContentsList()
    // },
    // methods : {
    //   ...mapActions(['getContentsList']),
    //   redirectUploadPage() {
    //     router.push('/contents/upload')
    //   }
    // }
    methods : {
      // ...mapActions(['getContentsList']),
      initMasonryCards() {

        console.log('initMasonryCards');
        // Masonry 초기화
        $('.grid').masonry({
          itemSelector: '.grid-item',
          columnWidth: 160,
          gutter: 3
        });

        // TODO component 디렉토리 안의 모든 html 파일을 읽어서 Mansary Card로 감싼다.

        // TODO iFrame 로딩 시점을 잡는다.
        var $targetFrame = $('[name=component-frame]');
        $targetFrame.on('load', function(e){
          console.log('iframe is loaded');

          var name = $(this).attr('name');

          var $contents = $(this).contents();
          var outerWidth = $contents.outerWidth();
          var outerHeight = $contents.outerHeight();

          $(this).css('width', outerWidth);
          $(this).css('height', outerHeight);
          $(this).parent().css('width', outerWidth+2);
          $(this).parent().css('height', outerHeight+2);


          $('.grid').masonry('layout');

        });

      }
    },
    mounted(){
      this.initMasonryCards();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .grid-item{
    width: 160px;
    height: 120px;
    float: left;
    background: #fff;
    border: 1px solid #333;
    border-color: hsla(0, 0%, 0%, 0.5);
    margin-bottom: 3px;
    border-radius: 5px;
    position:relative;
    user-select: none;
  }
  .grid-item:hover:after{
    content: '';
    position: absolute;
    left: 0px;
    top: 0px;
    right: 0px;
    bottom: 0px;
    background-color: #808080;
    opacity: 0.2;
    cursor: pointer;
  }
  .grid-item:hover:after:after{
    content: 'a';
    position: absolute;
    let: 0px;
    top: 0px;
  }
</style>
