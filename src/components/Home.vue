<template>
  <div class="home">
    <div class="grid">
      <grid-item v-for="card in cards" v-bind:card="card"></grid-item>
    </div>
  </div>
</template>

<script>
  import GridItem from '@/components/GridItem';

  export default {
    name: 'Home',
    components: {GridItem},
    data(){
      return{
        cards:[
          {url: '/static/component/html/step.html'},
          {url: '/static/component/html/long-paragraph.html'},
          {url: '/static/component/html/table-with-page-navigation.html'},
          {url: '/static/component/html/cards-rotation.html'},
          {url: '/static/component/html/page-transition.html'},
          // {url: '/static/component/html/parallax-scroll.html'},
          // {url: '/static/component/html/samsung-life-new-tablet.html'}
        ]
      }
    },
    methods : {
    },
    mounted(){
    }
  }
</script>


