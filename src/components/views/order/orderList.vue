<template>
  <div class="workstation">
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="searchForm">
              <el-form-item>
                <el-input v-model="searchForm.title" placeholder="订单标题" style="width:230px"></el-input>
              </el-form-item>
              <el-form-item prop="status">
                <el-select v-model="searchForm.status" style="width:110px">
                  <el-option label="未开始" value="CREATED"></el-option>
                  <el-option label="进行中" value="IN_PROGRESS"></el-option>
                  <el-option label="已结束" value="FINISHED"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSearchButton">查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="toAddOrder">新增</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </div>
      </el-col>
    </el-row>
    <!-- 编辑订单信息页面-->
    <el-dialog title="修改订单信息" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form model="editForm" label-width="80px">
        <el-form-item label="经办人">
          <el-input v-model="editForm.handlerName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-radio-group v-model="editForm.orderStatus" size="medium">
            <el-radio-button label="CREATED">未开始</el-radio-button>
            <el-radio-button label="IN_PROGRESS">进行中</el-radio-button>
            <el-radio-button label="FINISHED">已结束</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="订单标题">
          <el-input v-model="editForm.title"/>
        </el-form-item>
        <el-form-item label="订单备注">
          <el-input v-model="editForm.comments" type="textarea"/>
        </el-form-item>
        <el-row>
          <el-button type="primary" @click="onSubmitEditForm">提交</el-button>
          <el-button @click="editFormVisible = false">取消</el-button>
        </el-row>
      </el-form>
    </el-dialog>
    <!-- 订单列表显示界面 -->
    <template>
      <el-table :data="orderTable" style="width: 100%">
        <el-table-column prop="orderId" label="订单编号" width="240"></el-table-column>
        <el-table-column prop="handlerName" label="经办人" width="240"></el-table-column>
        <el-table-column prop="title" label="订单标题" width="240"></el-table-column>
        <!-- 如果用template显示，scope=“scope”出错就用slot-scope=“scope”，这里你可以用vue过滤器 -->
        <el-table-column label="建立时间" width="240">
          <template slot-scope="scope">{{scope.row.createTime | dateFrm}}</template>
        </el-table-column>
        <el-table-column label="订单状态" width="240">
          <template slot-scope="scope">{{scope.row.orderStatus | statusType}}</template>
        </el-table-column>
        <el-table-column label="操作" width="240">
          <template slot-scope="scope">
            <el-button icon="el-icon-search" @click="lookOrder(scope.row)" circle></el-button>
            <el-button icon="el-icon-edit" @click="editOrder(scope.row)" circle></el-button>
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
    </template>
    <!-- 查看项目详情 -->
    <el-dialog
      title="订单详情"
      :visible.sync="orderDescVisible"
      :close-on-click-modal="false"
      width="65%"
    >
      <div class="dialog-div">
        <!-- 第一行 -->
        <el-row :gutter="20">
          <el-col :span="2.5">
            <div class="grid-content col-font">订单编号：</div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content col-font">
              <div class="grid-content col-font">{{dialogData.order.orderId}}</div>
            </div>
          </el-col>
          <el-col :span="2.5">
            <div class="grid-content col-font">订单状态：</div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content col-font">{{dialogData.order.orderStatus | statusType}}</div>
          </el-col>
          <el-col :span="2.5">
            <div class="grid-content col-font">订单标题：</div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content col-font">{{dialogData.order.title}}</div>
          </el-col>
        </el-row>
        <!-- 第二行 -->
        <el-row :gutter="20">
          <el-col :span="2.5">
            <div class="grid-content col-font">项款分期：</div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content col-font">{{dialogData.order.paymentTimes}}</div>
          </el-col>
          <el-col :span="2.5">
            <div class="grid-content col-font">经办人：</div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content col-font">{{dialogData.order.handlerName}}</div>
          </el-col>
          <el-col :span="2.5">
            <div class="grid-content col-font">创建日期：</div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content col-font">{{dialogData.order.createTime | dateFrm}}</div>
          </el-col>
        </el-row>
        <!-- 第三行 -->
        <el-row :gutter="20">
          <el-col :span="2.5">
            <div class="grid-content col-font">订单备注：</div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content col-font">{{dialogData.order.comments}}</div>
          </el-col>
          <el-col :span="2.5">
            <div class="grid-content col-font">订单总额：</div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content col-font">{{dialogData.order.orderTotal}}</div>
          </el-col>
          <el-col :span="2.5">
            <div class="grid-content col-font">客户名称：</div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content col-font">{{dialogData.customer.customerName}}</div>
          </el-col>
        </el-row>
        <!-- 第四行 -->
        <el-row :gutter="20">
          <el-col :span="2.5">
            <div class="grid-content col-font">客户地址：</div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content col-font">{{dialogData.customer.address}}</div>
          </el-col>
          <el-col :span="2.5">
            <div class="grid-content col-font">甲方联系人：</div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content col-font">{{dialogData.customer.contactPerson}}</div>
          </el-col>
          <el-col :span="2.5">
            <div class="grid-content col-font">联系电话：</div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content col-font">{{dialogData.customer.mobilePhone}}</div>
          </el-col>
        </el-row>
        <!-- 第五行 -->
        <el-row :gutter="20">
          <el-col :span="2.5">
            <div class="grid-content col-font">开户银行：</div>
          </el-col>
          <el-col :span="5" v-show="dialogData.customer">
            <div class="grid-content col-font">{{dialogData.customer.bankName}}</div>
          </el-col>
          <el-col :span="2.5">
            <div class="grid-content col-font">卡号：</div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content col-font">{{dialogData.customer.bankAccountNum}}</div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
import { truncate, rename, stat } from "fs";
export default {
  data() {
    return {
      searchForm: {
        title: "",
        status: ""
      },
      //查看订单详情
      orderDescVisible: false,

      //编辑订单信息
      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      editForm: {
        id: "",
        handlerName: "",
        orderStatus: "",
        title: "",
        comments: "",
        orderId: ""
      },

      order: {
        orderId: "",
        status: "",
        title: "",
        orderId: ""
      },

      orderTable: [],
      currentPage: 1, //当前页
      pageSize: 10, //显示条数
      total: 0, //总数
      handleClose: true,

      dialogData: {
        order: {
          orderId: "",
          orderStatus: "",
          title: ""
        },
        customer: {
          bankName: ""
        }
      }
    };
  },
  methods: {
    //编辑
    editOrder: function(row) {
      console.log(row);
      this.editForm = {
        id: row.id,
        orderId: row.orderId,
        handlerName: row.handlerName,
        orderStatus: row.orderStatus,
        title: row.title,
        comments: row.comments
      };
      console.log(this.editForm);
      this.editFormVisible = true;
      // this.editForm = Object.assign({}, row);
    },

    //提交编辑更改后表单
    onSubmitEditForm() {
      const id = this.editForm.orderId;
      this.$axios({
        method: "post",
        url: "/order/" + id,
        data: this.editForm
      }).then(res => {
        this.editFormVisible = false;
        this.loadData();
      });
      // axios.post
    },

    //搜索
    onSearchButton() {
      console.log(this.searchForm.status);
      var keyword = this.searchForm.title;
      var status = this.searchForm.status;

      const keywordQuery = (keyword && keyword != "") ? `keyword=${keyword}` : ''
      const stateQuery = (status && status != "") ? `&status=${status}` : ''

      axios.get(`order?${keywordQuery}${stateQuery}`).then(res => {
        this.orderTable = res.data.content;
        this.total = res.data.totalElements;
      });
      // axios.get(`order?status=${status}`).then(res => {
      //   this.orderTable = res.data.content;
      //   this.total = res.data.totalElements;
      // });
    },
    toAddOrder() {
      this.$router.push({ name: "AddOrder" });
    },

    loadData() {
      const page = this.currentPage;
      const pageSize = this.pageSize;

      axios
        .get(`/order?page=${page - 1}&size=${pageSize}`)
        .then(res => {
          this.orderTable = res.data.content; //table赋值,el-table自动遍历,你只要设置prop属性
          this.total = res.data.totalElements; //table总条数
        })
        .catch(err => {
          // alert('请验证用户名或密码!')
        });
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
    },

    //查看订单详情
    lookOrder(row) {
      console.log(row);

      const oid = row.orderId;
      // alert(oid);
      axios.get(`order/${oid}`).then(res => {
        console.log(res);
        this.dialogData = res.data;
        this.orderDescVisible = true;
      });
    }
  },

  filters: {
    //过滤器，局部的过滤的函数放这里
    statusType: function(val) {
      if (val == "IN_PROGRESS") {
        return "进行中";
      } else if (val == "CREATED") {
        return "未开始";
      } else val == "FINISHED";
      return "已结束";
    },
    dateFrm: function(el) {
      return moment(el).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  mounted() {
    //页面加载自动执行，你可以放初始化的函数在这里
    this.loadData();
  }
};
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
.bg-purple {
  background: #ffffff;
}
.bg-purple-light {
  background: #e5e9f2;
}
</style>