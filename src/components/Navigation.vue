<template>
    <header class="navigation">
      <a class="home-title" href="/">{{homeBtnTxt}}</a>
      <gnb-menu></gnb-menu>
    </header>
</template>

<script>
  import GnbMenu from '@/components/GnbMenu';
  console.log(GnbMenu);
  export default {
    name: "navigation",
    components: {GnbMenu},
    props: ['homeBtnTxt']
  }
</script>

<style scoped>
  header.navigation {
    height: 60px;
    width: 100%;
    background-color: #005B9A;
    margin-bottom: 10px;
  }
  .home-title{
    display: inline-block;
    line-height: 60px;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    padding: 0px 10px;
    text-decoration: none;
    vertical-align: middle;
  }
  .home-title:hover{
    background-color: #808080;
    cursor: pointer;
  }
</style>
