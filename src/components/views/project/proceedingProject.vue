<template>
  <div class="body">
    <div class="bg">
      <div class="work-station">
        <template>
          <el-table :data="projectTable">
            <el-table-column prop="projectName" label="项目名称" width="200"></el-table-column>
            <el-table-column prop="deadline" label="结束日期" width="200"></el-table-column>
            <el-table-column prop="projectStatus" label="项目状态" width="200">
              <template slot-scope="scope">{{scope.row.projectStatus | statusType}}</template>
            </el-table-column>
            <el-table-column prop="duration" label="预计时间" width="200"></el-table-column>
            <el-table-column prop="time_consuming" label="消耗时间" width="200"></el-table-column>
            <el-table-column prop="remaining_time" label="剩余" width="200"></el-table-column>
            <el-table-column prop="schedule" label="总进度" width="200"></el-table-column>
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
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { truncate, rename } from "fs";
export default {
  data() {
    return {
      projectTable: [],
      currentPage: 1, //当前页
      pageSize: 10, //显示条数
      total: 0, //总数
      handleClose: true
    };
  },
  methods: {
    loadData: function() {
      var _this = this;
      _this
        .$axios({ method: "get", url: "project?status=in_progress" })
        .then(res => {
          console.log(res);
          _this.projectTable = res.data.content;
          _this.total = res.data.totalElements;
        })
        .catch(err => {
          console.log("数据有误");
        });
    }
  },
  handleSizeChange: function(val) {
    //改变table显示条数回调函数
    this.pageSize = val; //丢进去查询里，重新查询
    console.log(val);
    // this.loadData();
  },
  handleCurrentChange: function(val) {
    //改变table当前页回调函数
    this.currentPage = val; //丢进去查询里，重新查询
    console.log(val);
    // this.loadData();
  },
  filters:{
//过滤器，局部的过滤的函数放这里
    statusType: function(val) {
      if (val == "IN_PROGRESS") 
        return "进行中";
    }
  },
  mounted() {
    //页面加载自动执行，你可以放初始化的函数在这里
    this.loadData();
  }
};
</script>

<style lang="less" scoped>
.body {
  margin: 0%;
  padding: 0%;
  .workstation {
    top: 0px;
  }
}
</style>