<template>
  <div class="gnb-menu">
    <ul>
      <li v-for="menu in menus">{{menu.name}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'gnb-menu',
    data(){
      return{
        menus : [
          {name: 'About'},
          {name: 'Contact'}
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
    display: inline-block;
    height: 60px;
    vertical-align: middle;
    color: #fff;
  }
  .gnb-menu > ul{
    margin: 0px;
    padding: 0px;
    margin-left: 20px;
  }
  .gnb-menu > ul > li{
    list-style: none;
    display: inline-block;
    height: 60px;
    line-height: 60px;
  }
  .gnb-menu > ul > li:hover{
    background-color: #888;
    cursor: pointer;
  }
  .gnb-menu > ul > li + li{
    margin-left: 20px;
  }
</style>
