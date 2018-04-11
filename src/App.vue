<template>
  <div class="app">
    <navigation v-bind:homeBtnTxt="homeBtnTxt"></navigation>
    <router-view/>
  </div>
</template>

<script>
import navigation from '@/components/Navigation';

export default {
  name: 'App',
  components: {navigation},
  data () {
    return{
      homeBtnTxt: 'Code-Container',
    }
  }
}
</script>

<style>
  input::-ms-clear {
    display: none;
  }
  .app {
    margin: 0 auto;
  }
</style>
