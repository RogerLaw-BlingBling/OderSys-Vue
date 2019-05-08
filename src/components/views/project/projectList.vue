<template>
  <section>
    <!-- 工具条 -->
    <el-col :model="searchForm" :span="24" class="toobar" style="padding-buttom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-input v-model="searchForm.projectName" placeholder="项目名" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch()">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onAddProjectButton()">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!-- 列表 -->
    <el-table
      :data="projectTable"
      highlight-current-row
      v-loading="listLoading"
      @selection-change="selsChange"
      style="width: 75%;"
    >
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="projectName" label="项目名" width="230" sortable></el-table-column>
      <el-table-column label="工程状态" width="150" sortable>
        <template slot-scope="scope">{{scope.row.projectStatus | statusType}}</template>
      </el-table-column>
      <el-table-column prop="beginTime" label="起始时间" width="150" sortable></el-table-column>
      <el-table-column prop="endTime" label="结束时间" width="150" sortable></el-table-column>
      <el-table-column prop="duration" label="预计工期" width="170" sortable></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 新增界面 -->
    <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <!-- <el-form-item label="订单编号" prop="orderId">
          <el-input v-model="addForm.projectName" auto-complete="off"></el-input>
        </el-form-item>-->
        <el-form-item label="工程名" prop="projectName">
          <el-input v-model="addForm.projectName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="订单列表">
          <el-select v-model="selectedOrder" value-key="id" filterable placeholder="请选择" style="width:360px">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.title"
              :value="item"
            >
             <!-- <span style="float: left">{{ item.title }}</span> -->
      <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="起始时间">
          <div class="block">
            <!-- <span class="demonstration">起始日期时刻为 12:00:00</span> -->
            <el-date-picker
              v-model="addForm.beginTime"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00']"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="预计工期">
          <el-input v-model="addForm.duration" auto-complete="off" style="width:220px"></el-input>
        </el-form-item>
        <el-upload
          class="upload-demo"
          ref="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-remove="handleRemove"
          :file-list="addForm.fileList"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload"
          >上传到服务器</el-button>
        </el-upload>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="onSubmitProject()" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>

    <!-- 编辑界面 -->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="工程名" prop="projectName">
          <el-input v-model="editForm.projectName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="工程状态">
          <el-radio-group v-model="editForm.status">
            <el-radio class="radio" :label="1">进行中</el-radio>
            <el-radio class="radio" :label="-1">未开始</el-radio>
            <el-radio class="radio" :label="0">已交付</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="起始时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="editForm.beginTime"></el-date-picker>终止时间
          <el-date-picker type="date" placeholder="选择日期" v-model="editForm.endTime"></el-date-picker>
        </el-form-item>
        <el-form-item label="预计工期">
          <el-input v-model="editForm.duration" auto-complete="off" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="交接人">
          <el-input v-model="editForm.contactPerson" auto-complete="off" style="width:220px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      projectTable: [],

      currentPage: 1, //当前页
      pageSize: 10, //显示条数
      total: 0, //总数

      searchForm: {
        projectName: ""
      },

      //订单列表
      options: [],
      selectedOrder: {},

      total: 0,
      listLoading: false,
      sels: [], //列表选中列

      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      editFormRules: {
        projectName: [
          { required: true, message: "请输入项目名", trigger: "blur" }
        ]
      },
      //编辑界面数据
      editForm: {
        orderId: "",
        projectName: "",
        status: "",
        beginTime: "",
        endTime: "",
        duration: "",
        contactPerson: ""
      },

      //新增界面
      addFormVisible: false, //编辑界面是否显示
      addLoading: false,
      addFormRules: {
        orderId: [
          { required: true, message: "请输入订单编号", trigger: "blur" }
        ]
      },

      //编辑界面数据
      addForm: {
        // orderId: "",
        projectName: "",
        status: "",
        beginTime: "",
        endTime: "",
        duration: "",
        // contactPerson: "",
        filelist: ""
      }
    };
  },

  methods: {
    //加载页面
    loadData() {
      const page = this.currentPage;
      const pageSize = this.pageSize;
      this.$axios({
        method: "get",
        url: `project?page=${page - 1}&$size=${pageSize}`
      })
        .then(res => {
          this.projectTable = res.data.content;
          this.total = res.data.totalElements;
        })
        .catch(err => {});
    },
    handleCurrentChange(val) {},

    //获取工程名称列表
    onSearch() {
      var keyword = this.searchForm.projectName;
      this.$axios({
        method: "get",
        url: `project?keyword=${keyword}`
      })
        .then(res => {
          this.projectTable = res.data.content;
          this.total = res.data.totalElements;
        })
        .catch(err => {});
    },

    //添加工程按钮
    onAddProjectButton() {
      this.addFormVisible = true;
      // this.addForm = Object.assign({}, row);
      axios.get('/order').then((res)=>{
        this.options=res.data.content;
        // this.addForm.orderId=res.data.orderId;
        console.log(orderId)
      })
    },
    //删除
    handleDel: function(index, row) {},
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
      // window.alert("点击成功");
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
    //编辑提交
    editSubmit() {

    },
    //新增
    onSubmitProject() {
      // const orderId = this.selectedOrder.id;
      const orderId=this.selectedOrder.orderId;
      axios.post(`/project?orderId=${orderId}`,this.addForm).then(res=>{
      this.addFormVisible = false;
      }).catch()
    },

    selsChange: function(sels) {
      this.sels = sels;
    }, //批量删除
    // batchRemove: function() {},
    handleRemove: function() {},
    submitUpload: function() {}
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
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>
<style lang="less" scoped />;
