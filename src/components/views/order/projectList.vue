<template>
  <section>
    <!-- 工具条 -->
    <el-col :span="24" class="toobar" style="padding-buttom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.projectName" placeholder="项目名" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getProjects">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addProject">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!-- 列表 -->
    <el-table
      :data="projects"
      highlight-current-row
      v-loading="listLoading"
      @selection-change="selsChange"
      style="width: 100%;"
    >
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="projectname" label="项目名" width="120" sortable></el-table-column>
      <el-table-column prop="status" label="工程状态" width="100" sortable></el-table-column>
      <el-table-column prop="begin-time" label="起始时间" width="100" sortable></el-table-column>
      <el-table-column prop="end-time" label="结束时间" width="100" sortable></el-table-column>
      <el-table-column prop="duration" label="预计工期" width="100" sortable></el-table-column>
      <el-table-column prop="handlername" label="交接人" min-width="180" sortable></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <!-- <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button> -->
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="20"
        :total="total"
        style="float:right;"
      ></el-pagination>
    </el-col>
    <!-- 新增界面 -->
    <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <!-- <el-form-item label="订单编号" prop="orderId">
          <el-input v-model="addForm.projectName" auto-complete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="工程名" prop="projectName">
          <el-input v-model="addForm.projectName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="工程状态">
          <el-radio-group v-model="addForm.status">
            <el-radio class="radio" :label="1">进行中</el-radio>
            <el-radio class="radio" :label="-1">未开始</el-radio>
            <el-radio class="radio" :label="0">已交付</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="起始时间">
          <div class="block">
            <!-- <span class="demonstration">起始日期时刻为 12:00:00</span> -->
            <el-date-picker
              v-model="duration"
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
        <el-form-item label="交接人">
          <el-input v-model="addForm.contactPerson" auto-complete="off" style="width:220px"></el-input>
        </el-form-item>
        <el-upload
          class="upload-demo"
          ref="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
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
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
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
import { write } from "fs";
export default {
  data() {
    return {
      duration:'',
      fileList:'',
     
      filters: {
        id: "",
        projectName: "",
        status: "",
        beginTime: "",
        endTime: "",
        duration: "",
        contactPerson: ""
      },
      projects: [],
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
        id: "",
        projectName: "",
        status: "",
        beginTime: "",
        endTime: "",
        duration: '',
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
        orderId: "",
        id: "",
        projectName: "",
        status: "",
        beginTime: "",
        endTime: "",
        duration: "",
        contactPerson: ""
      }
    };
  },
  methods: {
    handleCurrentChange(val) {},
    //获取工程名称列表
    getProjects() {},
    //添加工程名
    addProject() {
      this.addFormVisible = true;
      this.addForm = Object.assign({}, row);
    },
    //删除
    handleDel: function(index, row) {},
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
      // window.alert("点击成功");
    },
    handlePreview: function(){},
    //编辑提交
    editSubmit: function() {},
    //新增
    addSubmit: function() {},
    selsChange: function(sels) {
      this.sels = sels;
    }, //批量删除
    batchRemove: function() {},
    handleRemove:function(){},
    submitUpload:function(){}
  }
};
</script>

<style lang="less" scoped>
</style>