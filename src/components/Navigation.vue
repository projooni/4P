<template>
    <header class="navigation">
      <a class="home-title" href="/">{{title}}</a>
      <nav></nav>
    </header>
</template>

<script>
    export default {
      name: "navigation",
      props: ['title']
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
  }
  .home-title:hover{
    background-color: #808080;
    cursor: pointer;
  }
</style>
