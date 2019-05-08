<template>
  <div class="view">
    <div class="bg"></div>
    <div class="image">
      <div class="text">
        <span>{{currentDate}}</span>
        <span>{{currentDay}}</span>
        <span>{{currentTime}}</span>
      </div>
    </div>
    <!-- <h1>welcome</h1> -->
    <el-calendar v-model="value"></el-calendar>
  </div>
  
    

</template>

<script src='./welcome.js'>
</script>

<style lang="less" scoped>
// @import url('/welcome.scss');
</style>
