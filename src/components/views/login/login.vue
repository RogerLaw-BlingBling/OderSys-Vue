<template>
  <div class="bg">
  
    <div class="header center title">
      <h1>
        <p>InttersTech</p>
      </h1>
    </div>
    <div class="loginForm">
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules2"
        ref="loginForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <div class="input-text">
          <el-form-item prop="username">
            <el-input type="text" v-model="loginForm.username" placeholder="用户名" autocomplete="off"></el-input>
          </el-form-item>
        </div>
        <div class="input-text">
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="loginForm.password"
              placeholder="密码"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </div>
        <div class="submit">
          <el-form-item>
            <el-button type="primary" style="width:100%" @click="submitForm('loginForm')">登录</el-button>
          </el-form-item>
        </div>
        <div class="reset">
          <el-form-item>
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
      <div id="particles">
        <!-- 粒子漂浮物 -->
        <vue-particles
            color="#fff"
            :particleOpacity="0.7"
            :particlesNumber="30"
            shapeType="star"
            :particleSize="5"
            linesColor="#fff"
            :linesWidth="2"
            :lineLinked="true"
            :lineOpacity="0.4"
            :linesDistance="150"
            :moveSpeed="3"
            :hoverEffect="true"
            hoverMode="grab"
            :clickEffect="true"
            clickMode="push"
        ></vue-particles>
    </div>
  </div>
</template>
    
<script src="./login.js"></script>    


<style lang="less" scoped>
@import url("./login.less");
</style>



