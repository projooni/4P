<template>
  <div class="app">
    <navigation v-bind:title="title"></navigation>
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
      title: 'Code-Container',
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
