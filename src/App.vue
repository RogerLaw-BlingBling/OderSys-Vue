<template>
  <div id="app">
    
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html{
  width: 100%;
  height: 100%;
}
body{
  height: 100%;
  width: 100%;
  margin: 0;
}
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
</style>
