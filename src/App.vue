<template>
  <div class="app">
    <navigation></navigation>
    <router-view/>
  </div>
</template>

<script>
import navigation from '@/components/Navigation';

export default {
  name: 'App',
  components: {navigation}
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
