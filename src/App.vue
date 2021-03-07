<template>
  <div id="app">
    <router-view></router-view>
    <MainTabbar></MainTabbar>
  </div>
</template>

<script>
  import MainTabbar from 'components/content/mainTabbar/MainTabbar.vue'
  export default {
    name: 'App',
    components: {
      MainTabbar
    }
  }
</script>

<style lang="less">
  @import url(assets/css/base.css);
</style>
