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
                  <el-option label="未开始" value="未开始"></el-option>
                  <el-option label="进行中" value="进行中"></el-option>
                  <el-option label="已结束" value="已结束"></el-option>
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
        <el-table-column prop="contactPerson" label="经办人" width="240"></el-table-column>
        <el-table-column prop="phone" label="联系方式" width="240"></el-table-column>
        <el-table-column prop="orderTime" label="建立时间" width="240"></el-table-column>
        <el-table-column prop="orderStatus" label="订单状态" width="240"></el-table-column>
        <el-table-column label="操作" width="240">
          <el-button icon="el-icon-search" circle></el-button>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: {
        orderId: "",
        status: ""
      },

      orderTable: [
        {
          orderId: "1",
          contactPerson: "邓总",
          phone: "13800108888",
          orderTime: "2019-05-24",
          orderStatus: "进行中"
        }
      ]
    };
  },
  methods: {
    getOrders() {},
    onSubmit: function() {},
    toAddOrder() {
      this.$router.push({ name: "AddOrder" });
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