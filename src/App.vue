<template>
  <div id="app">
    <router-view/>
    <main-tab-barr/>
  </div>
</template>

<script>
import MainTabBarr from './components/content/MainTabBarr'

export default {
  name: 'App',
  components: {
     MainTabBarr
  }
}
</script>

<style>
  @import 'assets/css/base.css'
</style>
