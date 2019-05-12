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
              <!-- <el-form-item>
                <el-input v-model="orderForm.customerId" placeholder="客户编号"></el-input>
              </el-form-item>-->
              <el-select v-model="value" filterable placeholder="用户名称" style="width:336px">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item>
                <el-input v-model="orderForm.orderStatus" placeholder="订单状态" value="CREATED"></el-input>
              </el-form-item>
            </div>
          </el-col>
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
        <el-row :gutter="20">
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
        </el-row>
        <el-form-item label="订单备注">
          <el-input type="textarea" v-model="orderForm.desc" style="width:628px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('orderForm')">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { truncate, rename } from "fs";
export default {
  data() {
    return {
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
    onSubmit(orderForm) {
      var _this = this;
      axios.post("order", _this.orderForm).then(res => {
        console.log(res);
        _this.loading = false;
      });
    }
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