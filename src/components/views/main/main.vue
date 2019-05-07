<template>
  <div class="content">
    <el-container style="height:100%;">
      <el-header style="padding:0">
        <div class="top-header">
          <el-col :span="24" class="header">
            <el-col
              :span="10"
              class="logo"
              :class="collapsed?'logo-collapse-width':'logo-width'"
            >{{collapsed?'':sysName}}</el-col>
            <el-col :span="10">
              <div class="tools" @click.prevent="collapse">
                <i class="el-icon-more"></i>
              </div>
            </el-col>
            <el-col :span="4" class="userinfo">
              <el-dropdown trigger="hover">
                <span class="el-dropdown-link userinfo-inner">
                  <img :src="0">
                  {{username}}
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>我的消息</el-dropdown-item>
                  <el-dropdown-item>设置</el-dropdown-item>
                  <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-col>
        </div>
      </el-header>
      <el-container>
        <!-- 导航样式 -->
        <el-aside :width="!collapsed?'230px':'60px'" style="min-height: 100%;'">
          <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#545c64"
              text-color="#fff"
              style="min-height: 100%;"
              theme="dark"
              active-text-color="#ffd04b"
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-plus"></i>
                  &nbsp;&nbsp;客户管理
                </template>
                <el-menu-item index="userList" @click="toCustomerList">客户列表</el-menu-item>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-document"></i>
                  &nbsp;&nbsp;订单管理
                </template>
                <el-menu-item index="oderList" @click="toOrderList">订单列表</el-menu-item>
                <!-- <el-menu-item index="addOder" @click="toAddOrder">订单录入</el-menu-item> -->
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-tickets"></i>
                  &nbsp;&nbsp;项目管理
                </template>
                <el-menu-item index="proceeding" @click="toProceedingProject">进行中的项目</el-menu-item>
                <el-menu-item index="projectDesc" @click="toProjectList">项目详情</el-menu-item>
                <el-menu-item index="demandInfo" @click="toDemandInfo">需求信息</el-menu-item>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-star-on"></i>
                  &nbsp;&nbsp;财务管理
                </template>
                <el-menu-item index="accounting" @click="toAccountingDetail">记账明细</el-menu-item>
              </el-submenu>
              <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-menu"/>
                  &nbsp;&nbsp;数据统计
                </template>
                <el-menu-item index="contractList" @click="toBusinessStatistics">业务统计</el-menu-item>
              </el-submenu>
              <el-submenu index="6">
                <template slot="title">
                  <i class="el-icon-setting"></i>
                  &nbsp;&nbsp;设置
                </template>
                <el-menu-item index="adminSet">&nbsp;&nbsp;管理员设置</el-menu-item>
              </el-submenu>
              <el-submenu index="7">
                <template slot="title">
                  <i class="el-icon-warning"></i>
                  &nbsp;&nbsp;说明
                </template>
                <el-menu-item index="adminSet">说明</el-menu-item>
              </el-submenu>
            </el-menu>
          </aside>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script src="./main.js"></script> 

<style lang="less" scoped>
@import "../main/main.less";
</style>