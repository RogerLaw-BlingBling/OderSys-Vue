<template>
  <div class="customer">
    <!-- 用户信息输入表单 -->
    <div>
      <el-form :model="customerForm">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item>
                <el-input v-model="customerForm.customerName" placeholder="客户名"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item>
                <el-input v-model="customerForm.address" placeholder="客户地址"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item>
              <el-input v-model="customerForm.contactPerson" placeholder="联系人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-input v-model="customerForm.mobilePhone" placeholder="联系电话"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-input v-model="customerForm.email" placeholder="联系邮箱"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item>
              <el-input v-model="customerForm.bankName" placeholder="开户银行"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-input v-model="customerForm.bankAccountNum" placeholder="银行卡号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 提交按钮 -->
        <el-button type="primary" @click="onSubmit('customerForm')">提交</el-button>
      </el-form>
    </div>
    <br>
    <div class="customerTable">
      <!-- 显示表格 -->
      <el-table :data="customerTable" border style="width: 91%">
        <el-table-column fixed prop="customerName" label="客户名" width="220"></el-table-column>
        <el-table-column prop="address" label="客户地址" width="220"></el-table-column>
        <el-table-column prop="contactPerson" label="联系人" width="90"></el-table-column>
        <el-table-column prop="mobilePhone" label="联系方式" width="120"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="220"></el-table-column>
        <el-table-column prop="bankName" label="开户银行" width="120"></el-table-column>
        <el-table-column prop="bankAccountNum" label="银行卡号" width="200"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
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
    <el-dialog :modal="editForm"  title="客户信息编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form>
        <el-form-item label="客户名">
          <el-input v-model="editForm.customerName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="客户地址">
          <el-input v-model="editForm.address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="editForm.contactPerson" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="editForm.mobilePhone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="开户银行">
          <el-input v-model="editForm.bankName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="银行卡号">
          <el-input v-model="editForm.bankAccountNum" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitEdit">提交</el-button>
          <el-button>重置</el-button>
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
      total: 0, //总数

      //提交客户信息表单
      customerForm:{
        customerName: '',
        address: '',
        contactPerson: '',
        mobilePhone: '',
        email: '',
        bankName: '',
        bankAccountNum: ''
      },
      //编辑表单
      editForm: {
        id: '',
        customerName: '',
        address: '',
        contactPerson: '',
        mobilePhone: '',
        email: '',
        bankName: '',
        bankAccountNum: ''
      }
    };
  },
  methods: {
    onSubmit: function() {
        var _this=this;
        axios.post('customer',_this.customerForm).then(res=>{
        console.log(res);
        _this.loading=false;
        _this.loadData();
      })    
    },
    //删除方法
    deleteClick: function(row){
        var _this =this;
        _this.$axios({
            method: 'delete',
            url:'/customer/'+row.id,
        }).then(res => {
          console.log(res);
          _this.loadData();
        })
        .catch(err => {});
    },
    //编辑方法
    editClick: function(row) {
      var _this = this;
      _this.editForm = {
        id: row.id,
        customerName: row.customerName,
        address: row.address,
        contactPerson: row.contactPerson,
        mobilePhone: row.mobilePhone,
        email: row.email,
        bankName: row.bankName,
        bankAccountNum: row.bankAccountNum
      }
      // _this.editForm.id = row.id;
      console.log(_this.editForm)
      _this.editFormVisible = true;
    },

    submitEdit(){
      var _this = this;
      _this.$axios({
        method: 'post',
        url: '/customer/' + _this.editForm.id,
        data: _this.editForm
      }).then(res=>{
        _this.editFormVisible = false;
        _this.loadData();
      }).catch(err=>{

      })
    },

    loadData() {
    //   var _this = this;
    //   var formData = new FormData();
    //   formData.append('page', _this.currentPage);
    //   formData.append('pageSize', _this.pageSize);

    const page=this.currentPage;
    const pageSize = this.pageSize;

    //   var param = {
    //     page: _this.currentPage,
    //     pageSize: _this.pageSize
    //   }

      axios.get(`/customer?page=${page - 1}&size=${pageSize}`)
        .then(res => {
          //res是返回的数据
          console.log(res); //打印一下，你就知道可以拿到什么
          this.customerTable = res.data.content; //table赋值,el-table自动遍历,你只要设置prop属性
          this.total = res.data.totalElements; //table总条数
          console.log(this.total);
        })
        .catch(err => {});
    },
     handleSizeChange: function(val) {
      //改变table显示条数回调函数
      this.pageSize = val; //丢进去查询里，重新查询
      console.log(val);
      this.loadData();
    },
    handleCurrentChange: function(val) {
      //改变table当前页回调函数
      this.currentPage = val; //丢进去查询里，重新查询
      console.log(val);
      this.loadData();
    }
   
  },

  mounted(){
    //页面加载自动执行，你可以放初始化的函数在这里
    this.loadData();
  }
};
</script>

<style lang="less" scoped>
</style>