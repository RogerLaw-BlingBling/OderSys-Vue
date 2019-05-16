<template>
  <div class="workstation">
    <div class="orderForm">
      <el-form :model="orderForm">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item>
                <el-input v-model="orderForm.title" placeholder="订单名称"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-select
                v-model="orderForm.customerId"
                value-key="id"
                filterable
                remote
                placeholder="用户名称"
                :remote-method="remoteMethod"
                style="width:336px"
              >
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.customerName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item>
                <el-input v-model="orderForm.handlerName" placeholder="交接人"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item>
                <!-- <el-input v-model="orderForm.name" placeholder="邮政编码"></el-input> -->
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item>
                <el-input v-model="orderForm.orderTotal" placeholder="合同金额"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item>
                <el-input v-model="orderForm.paymentTimes" placeholder="付款次数"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <!-- <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item>
                <el-date-picker
                  type="date"
                  placeholder="订单起始时间"
                  v-model="orderForm.createTime"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item>
                <el-date-picker
                  type="date"
                  placeholder="订单预计付款时间"
                  v-model="orderForm.paymentTime"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </div>
          </el-col>
        </el-row> -->
        <el-form-item label="订单备注">
          <el-input type="textarea" v-model="orderForm.comments" style="width:628px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('orderForm')">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 弹出信息 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>订单创建成功</span>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="onReturnButton()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { truncate, rename } from "fs";
export default {
  data() {
    return {
      dialogVisible: false,

      //下拉列表
      value: "",
      options: [],
      // selectedCustomer: "",

      orderForm: {
        customerId: "",
        orderStatus: "",
        title: "",
        paymentTimes: "",
        handlerName: "",
        createTime: "",
        comments: "",
        orderTotal: ""
      }
    };
  },

  methods: {
    loadData() {
      axios.get(`customer?size=20`).then(res => {
        this.options = res.data.content;
      });
    },

    onSubmit(orderForm) {
      var _this = this;
      axios.post("order", _this.orderForm).then(res => {
        console.log(res);
        _this.loading = false;
        this.dialogVisible = true;
      });
    },

    //远端请求
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          axios.get(`/customer?keyword=${query}`).then(res => {
            this.options = res.data.content;
            // this.addForm.orderId=res.data.orderId;
            console.log(query);
          });
        }, 200);
      } else {
        this.options = [];
      }
    },

    onReturnButton() {
      this.dialogVisible = false;
      this.$router.push({ name: "OrderList" });
    },

    // @(change = "changeCustomer")
    // changeCustomer(val) {
    //   console.log(val);
    //   alert(val);
    // }
  },
  mounted() {
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
// .bg-purple-dark {
//   background: #99a9bf;
// }
// .bg-purple {
//   background: #d3dce6;
// }
// .bg-purple-light {
//   background: #e5e9f2;
// }
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
// .row-bg {
//   padding: 10px 0;
//   background-color: #f9fafc;
// }
</style>