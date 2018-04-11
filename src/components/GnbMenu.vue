<template>
    <ul class="gnb-menu">
      <li v-for="menu in menus">{{menu.name}}</li>
    </ul>
</template>

<script>
  export default {
    name: 'gnb-menu',
    props: [],
    data(){
      return{
        menus : [
          {name: 'menu1'},
          {name: 'menu2'},
          {name: 'menu3'}
          ]
      }
    },
    methods : {
    },
    mounted(){
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.gnb-menu{
  /*height: 100px;*/
  /*width: 100%;*/
  /*background-color: red;*/
}
</style>
