<template>
  <div class="workstation">
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="order">
              <el-form-item>
                <el-input v-model="order.orderId" placeholder="订单编号" style="width:230px"></el-input>
              </el-form-item>
              <el-form-item prop="status">
                <el-select v-model="order.status" style="width:110px">
                  <el-option label="未开始" value="IN_PROGRESS"></el-option>
                  <el-option label="进行中" value="ON_PROGRESS"></el-option>
                  <el-option label="已结束" value="END_PROGRESS"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="toAddOrder">新增</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <template>
      <el-table :data="orderTable" style="width: 100%">
        <el-table-column prop="orderId" label="订单编号" width="240"></el-table-column>
        <el-table-column prop="handlerName" label="经办人" width="240"></el-table-column>
        <el-table-column prop="phone" label="联系方式" width="240"></el-table-column>
        <!-- 如果用template显示，scope=“scope”出错就用slot-scope=“scope”，这里你可以用vue过滤器 -->
        <el-table-column prop="createTime" label="建立时间" width="240"></el-table-column>
        <el-table-column label="订单状态" width="240">
          <template slot-scope="scope">{{scope.row.orderStatus | statusType}}</template>
        </el-table-column>
        <el-table-column label="操作" width="240">
<template slot-scope="scope">
            <el-button icon="el-icon-search" @click="caozuo(scope.row)" circle></el-button>
            </template>        </el-table-column>
      </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
    </template>



    <!--  -->
    <!-- <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose">
    <div class="dataJSON">
      <div v-for="(item,index) in json" :key="index">
        <p v-for="(item2,index2) in jsonKey" :key="index2">{{item[item2]}}</p>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog> -->
    <!--  -->
  </div>
</template>

<script>
import axios from 'axios'
import { truncate } from 'fs';
export default {
  data() {
    return {
      order: {
        orderId: "",
        status: ""
      },
      orderTable: [],
      currentPage: 1,//当前页
      pageSize: 10,//显示条数
      total: 0,//总数   
      handleClose: true,
      json: [],
      jsonKey: []
    }
  },
  methods: {
    getOrders() {},
    onSubmit: function() {
      this.loadData();
    },  
    toAddOrder() {
      this.$router.push({ name: "AddOrder" });
    },
    loadData: function(){
      var _this = this;
            _this.$axios({
              method: 'get',
              url: '/order'//如果查询方法会传页数、显示条数
            }).then((res) => {//res是返回的数据
              // console.log(res)//打印一下，你就知道可以拿到什么
              _this.orderTable = res.data.content;//table赋值,el-table自动遍历,你只要设置prop属性
              _this.total =  res.data.totalElements;//table总条数
            }).catch (err=>{
              // alert('请验证用户名或密码!')
            }) 
    },
    handleSizeChange: function(val){//改变table显示条数回调函数
      this.pageSize = val;//丢进去查询里，重新查询
      console.log(val);
      // this.loadData();
    },
    handleCurrentChange: function(val){//改变table当前页回调函数
      this.currentPage = val;//丢进去查询里，重新查询
      console.log(val);
      // this.loadData();
    },
    caozuo(row){
      console.log(row);    
      }
  },
  filters:{//过滤器，局部的过滤的函数放这里
    statusType: function(val){
      if(val == 'IN_PROGRESS'){
        return '已开始';
      }
    }
  },
  mounted(){//页面加载自动执行，你可以放初始化的函数在这里
    this.loadData();
  }
}
</script>

<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  // background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 48px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.block {
  left: 50%;
}
</style>