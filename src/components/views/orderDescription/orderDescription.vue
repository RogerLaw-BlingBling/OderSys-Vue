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
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="project-name" label="项目名" width="120" sortable></el-table-column>
      <el-table-column prop="status" label="项目状态" width="100" sortable></el-table-column>
      <el-table-column prop="begin-time" label="起始时间" width="100" sortable></el-table-column>
      <el-table-column prop="end-time" label="结束时间" width="100" sortable></el-table-column>
      <el-table-column prop="duration" label="预计工期" width="100" sortable></el-table-column>
      <el-table-column prop="status" label="交接人" min-width="180" sortable></el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="20"
        :total="total"
        style="float:right;"
      ></el-pagination>
    </el-col>
  </section>
</template>

<script>
export default {
  data() {
    return {
      filters: {
        projectName: ''
      },
      projects: [],
      total: 0,
      listLoading: false,
      sels: [] //列表选中列
    };
  },
  methods: {
    handleCurrentChange(val) {},
    //获取工程名称列表
    getProjects() {},
    //添加工程名
    addProject() {},
    //删除
    handleDel: function(index, row) {},
    //显示编辑界面
    handleEdit: function(index, row) {},
    selsChange: function(sels) {
      this.sels = sels;
    },//批量删除
			batchRemove: function () {}
  }
};
</script>

<style lang="less" scoped>
</style>