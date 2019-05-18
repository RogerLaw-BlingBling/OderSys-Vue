<template>
  <div class="accounting">
    <div class="detail">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="入款单" name="first">
          <div class="detail_news">
            <el-form
              :model="paymentForm"
              :rules="rules"
              ref="paymentForm"
              label-width="100px"
              class="demo-paymentForm"
            >
              <!-- 日期 -->
              <div class="detail_top">
                <div class="block">
                  <span class="demonstration">下次收款时间：</span>
                  <el-date-picker
                    v-model="paymentForm.paymentTime"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions0"
                  ></el-date-picker>
                </div>

                <el-form-item label="订单列表">
                  <el-select
                    v-model="addFormTargetOrderId"
                    value-key="id"
                    filterable
                    remote
                    placeholder="请选择"
                    :remote-method="remoteMethod"
                    style="width:360px"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.id"
                      :label="item.title"
                      :value="item.orderId"
                    >
                      <!-- <span style="float: left">{{ item.title }}</span> -->
                      <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span> -->
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>

              <!-- 付款单位、经手人等信息 -->

              <div class="detail_content">
                <el-form-item label="付款人：" prop="payer">
                  <el-input v-model="paymentForm.payer"></el-input>
                </el-form-item>

                <el-form-item label="经手人：" prop="payee">
                  <el-input v-model="paymentForm.payee"></el-input>
                </el-form-item>

                <el-form-item label="付款方式" prop>
                  <el-select v-model="paymentForm.paymentTerm" placeholder="请选择付款方式">
                    <el-option label="微信支付" value="微信支付"></el-option>
                    <el-option label="支付宝支付" value="支付宝支付"></el-option>
                    <el-option label="对公账户" value="对公账户"></el-option>
                  </el-select>
                </el-form-item>
              </div>

              <div class="detail_one">
                <span class="demonstration">附加说明：</span>
                <el-input v-model="paymentForm.addition"></el-input>

                <span class="demonstration">摘要：</span>
                <el-input v-model="paymentForm.summary"></el-input>
              </div>

              <el-form-item class="detail_two" label="收取金额：¥ " prop="amount">
                <el-input v-model="paymentForm.amount"></el-input>
              </el-form-item>
              <br>
              <br>
              <br>
              <br>
              <el-form-item class="detail_two">
                <el-button type="primary" @click="onSubmitButton()">提交</el-button>
                <el-button @click="resetForm('paymentForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>

          <div class="detailTable">
            <el-table :data="paymentTable" border style="width: 100%" max-height="600">
              <el-table-column label="收款录入时间" sortable width="165">
                <template slot-scope="scope">{{scope.row.createTime | dateFrm}}</template>
              </el-table-column>
              <el-table-column label="下次收款时间" sortable width="165">
                <template slot-scope="scope">{{scope.row.paymentTime | dateFrm}}</template>
              </el-table-column>
              <el-table-column prop="payer" label="汇款人" width="90"></el-table-column>
              <el-table-column prop="payee" label="经手人" width="90"></el-table-column>
              <el-table-column prop="paymentTerm" label="付款方式" width="120"></el-table-column>
              <el-table-column prop="addition" label="附加说明" width="170"></el-table-column>
              <el-table-column prop="summary" label="摘要" width="170"></el-table-column>
              <el-table-column prop="amount" label="收取金额(¥)" width="110"></el-table-column>
              <el-table-column fixed="right" label="操作" width="160">
                <template slot-scope="scope">
                  <el-button size="small" @click="editData(scope.row,scope.$index)">编辑</el-button>
                  <el-button
                    size="small"
                    type="danger"
                    @click.native.prevent="deleteRow(scope.$index, tableData)"
                  >删除</el-button>
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

          <br>
          <br>
          <br>
          <br>
          <br>
          <br>

          <!-- =========== 编辑弹出框 ============ -->
          <div class="Modals">
            <el-dialog title="内容编辑" :visible.sync="editFormVisible">
              <el-form
                :model="ModalsForm"
                :rules="rules"
                ref="ModalsForm"
                label-width="100px"
                class="demo-ModalsForm"
              >
                <!-- 日期 -->
                <div class="detail_top">
                  <div class="block">
                    <span class="demonstration">下次收款时间：</span>
                    <el-date-picker
                      v-model="ModalsForm.paymenttime"
                      type="date"
                      placeholder="选择日期"
                      :picker-options="pickerOptions0"
                    ></el-date-picker>
                  </div>

                  <!-- 单据编号 -->
                  <el-form-item label="单据编号：" prop="orderId">
                    <el-input v-model="ModalsForm.orderId"></el-input>
                  </el-form-item>
                </div>

                <!-- 付款单位、经手人等信息 -->
                <el-form-item class="Modals_one" label="付款方：" prop="payer">
                  <el-input v-model="ModalsForm.payer"></el-input>
                </el-form-item>

                <el-form-item label="经手人：" prop="payee">
                  <el-input v-model="ModalsForm.payee"></el-input>
                </el-form-item>

                <el-form-item label="付款方式" prop="paymentTerm">
                  <el-select v-model="ModalsForm.paymentTerm" placeholder="请选择付款方式">
                    <el-option label="微信支付" value="微信支付"></el-option>
                    <el-option label="支付宝支付" value="支付宝支付"></el-option>
                    <el-option label="对公账户" value="对公账户"></el-option>
                  </el-select>
                </el-form-item>

                <div class="Modals_two">
                  <span class="demonstration">附加说明：</span>
                  <el-input v-model="ModalsForm.addition"></el-input>

                  <span class="demonstration">摘要：</span>
                  <el-input v-model="ModalsForm.summary"></el-input>
                </div>

                <el-form-item class="detail_two" label="收取金额：¥ " prop="amount">
                  <el-input v-model="ModalsForm.amount"></el-input>
                </el-form-item>

                <br>
                <br>
                <br>
                <br>
                <el-form-item class="detail_two">
                  <el-button type="primary" @click="submitEdit('ModalsForm')">确认修改</el-button>
                  <el-button @click="resetEdit('ModalsForm')">重置</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
          </div>
          <!-- ====================================== -->
        </el-tab-pane>

        <!-- ============================================== 出款单 =================================================== -->
        <!-- =============================================暂无此功能=================================================== -->
        <el-tab-pane label="出款单" name="second"></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>






<script>
import moment from "moment";
import axios from "axios";
export default {
  data() {
    return {
      //页面开始显示第一个tab页
      activeName: "first",

      //对话弹出框
      editFormVisible: false,
      editOutFormVisible: false,

      //日期选择，返回值
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },

      //编辑界面数据
      addFormTargetOrderId: "",
      options: [],

      //记账信息表格
      paymentTable: [],
      currentPage: 1, //当前页
      pageSize: 10, //显示条数
      total: 0, //总数

      //支付信息表单
      paymentForm: {
        orderId: "",
        paymentTerm: "",
        payer: "",
        payee: "",
        paymentTime: "",
        addition: "",
        summary: "",
        amount: ""
      },

      //编辑实体
      ModalsForm: {},

      //数据校验
      rules: {
        orderId: [
          { required: true, message: "请输入单据编号", trigger: "blur" },
          { min: 3, max: 12, message: "长度在 3 到 12 个字符", trigger: "blur" }
        ],
        payer: [
          { required: true, message: "请输入付款方名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        payee: [
          { required: true, message: "请输入经手人名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        paymentTerm: [
          { required: true, message: "请选择付款方式", trigger: "blur" }
        ],
        amount: [
          // { required: true, message: '收取金额不能为空', trigger: 'blur'},
          // { value!=^[0-9]*$ , message: '收取金额必须为数字值'}

          // 自定义校验规则
          //数字校验
          {
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error("收取金额不能为空"));
              } else if (/^\d+$/.test(value) == false) {
                callback(new Error("收取金额必须为数字值"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    //tab切换
    handleClick(tab, event) {
      console.log(tab, event);
    },

    //页面加载
    loadData() {
      const page = this.currentPage;
      const pageSize = this.pageSize;
      axios
        .get(`/payment?page=${page - 1}&size=${pageSize}`)
        .then(res => {
          this.paymentTable = res.data.content;
          this.total = res.data.totalElements;
        })
        .catch(err => {});

      axios.get("/order?size=20&sort=createTime,desc").then(res => {
        this.options = res.data.content;
        // this.addForm.orderId=res.data.orderId;
        // console.log(orderId);
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

    //远端请求
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          axios.get(`/order?keyword=${query}`).then(res => {
            this.options = res.data.content;
            // this.addForm.orderId=res.data.orderId;
            console.log(query);
          });
        }, 200);
      } else {
        this.options = [];
      }
    },

    //提交按钮
    onSubmitButton() {
      var oid = this.addFormTargetOrderId;
      axios
        .post(`payment?orderId=${oid}`, this.paymentForm)
        .then(res => {
          console.log(res);
          this.loading = false;
          this.loadData();
        });
    },

    // 重置入款单增添数据表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      //重置下新增表单数据，避免双向绑定
      this.initForm();
    }
  },
  filters: {
    dateFrm: function(el) {
      return moment(el).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
a {
  text-decoration: none;
}

.detail {
  width: 1200px;
  /*margin-left: 200px;*/
  /*background-color: #ccc;*/
}

/*-------------------入款单----------------------------*/

/*日期*/
.detail .detail_top {
  width: 100%;
  height: 40px;
  /*margin-bottom: 26px;*/
  /*background-color: red;*/
}

.detail .block {
  float: left;
  margin-left: 30px;
}

.detail .el-tabs__header {
  padding-left: 6%;
}

/*单据编号*/
.detail .listnum {
  float: left;
  margin-left: 22px;
}

.detail .listnum .el-input {
  width: 72%;
}

/*付款单位、经手人等信息*/
.detail .detail_content {
  width: 100%;
  height: 40px;
  margin-top: 46px;
  margin-bottom: 30px;
}

.detail .detail_news .el-form-item {
  float: left;
}

.detail .detail_news .detail_one {
  margin-left: 30px;
  margin-bottom: 30px;
}

.detail .detail_news .detail_one .el-input {
  width: 16%;
}

.detail .detail_news .detail_two {
  margin-left: 20px;
}

/*记录表格*/
.detail .detailTable {
  width: 100%;
  margin-top: 70px;
  height: 100%;
  margin-left: 20px;
  /*background-color: red;*/
}

/*编辑弹出框*/
.detail .Modals .block {
  width: 100%;
  margin-bottom: 20px;
}

.detail .Modals .Modals_one {
  margin-top: 70px;
}

.detail .Modals .Modals_two {
  margin-left: 20px;
}

.detail .Modals .Modals_two .el-input {
  width: 86%;
  margin-bottom: 27px;
}

.detail .Modals .el-form-item__content {
  z-index: 1;
}

.detail .Modals .el-date-editor.el-input {
  z-index: 2;
}

/*-------------------------------------------*/

/*-------------------------- 出款单 -----------------------*/

/*---------------------------------------------------------*/
</style>