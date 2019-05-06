<template>
  <div class="customer">
    <!-- 用户信息输入表单 -->
    <div>
      <el-form>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item>
                <el-input placeholder="客户名"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item>
                <el-input placeholder="客户地址"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item>
              <el-input placeholder="联系人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-input placeholder="联系邮箱"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item>
              <el-input placeholder="开户银行"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-input placeholder="银行卡号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 提交按钮 -->
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form>
    </div>
    <br>
    <div class="customerTable">
      <!-- 显示表格 -->
      <el-table :data="customerTable" border style="width: 100%">
        <el-table-column fixed prop="customerName" label="客户名" width="150"></el-table-column>
        <el-table-column prop="address" label="客户地址" width="120"></el-table-column>
        <el-table-column prop="contactPerson" label="联系人" width="120"></el-table-column>
        <el-table-column prop="mobilePhone" label="联系方式" width="120"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="120"></el-table-column>
        <el-table-column prop="bankName" label="开户银行" width="120"></el-table-column>
        <el-table-column prop="bankAccountNum" label="银行卡号" width="200"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template>
            <el-button @click="editClick()" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <!-- 编辑页面 -->
    <el-dialog title="客户信息编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form>
        <el-form-item label="工程名" prop="projectName">
          <el-input v-model="editForm.projectName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="工程名" prop="projectName">
          <el-input v-model="editForm.projectName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="工程名" prop="projectName">
          <el-input v-model="editForm.projectName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="工程名" prop="projectName">
          <el-input v-model="editForm.projectName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="工程名" prop="projectName">
          <el-input v-model="editForm.projectName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="工程名" prop="projectName">
          <el-input v-model="editForm.projectName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="工程名" prop="projectName">
          <el-input v-model="editForm.projectName" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { truncate, rename } from "fs";
export default {
  data() {
    return {
      customerTable: [],
      editFormVisible: false,
      currentPage: 1, //当前页
      pageSize: 10, //显示条数
      total: 0 //总数
    };
  },
  methods: {
    onSubmit: function() {},
    editClick: function() {
      var row;
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    loadData: function() {
      var _this = this;
      _this
        .$axios({
          method: "get",
          url: "/customer" //如果查询方法会传页数、显示条数
        })
        .then(res => {
          //res是返回的数据
          console.log(res); //打印一下，你就知道可以拿到什么
          _this.customerTable = res.data.content; //table赋值,el-table自动遍历,你只要设置prop属性
          _this.total = res.data.totalElements; //table总条数
        })
        .catch(err => {});
    },
    handleSizeChange: function(val) {
      //改变table显示条数回调函数
      this.pageSize = val; //丢进去查询里，重新查询
      console.log(val);
      // this.loadData();
    },
    handleCurrentChange: function(val) {
      //改变table当前页回调函数
      this.currentPage = val; //丢进去查询里，重新查询
      console.log(val);
      // this.loadData();
    }
  },

  mounted() {
    //页面加载自动执行，你可以放初始化的函数在这里
    this.loadData();
  }
};
</script>

<style lang="less" scoped>
</style>