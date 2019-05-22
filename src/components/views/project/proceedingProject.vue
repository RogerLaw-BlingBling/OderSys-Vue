<template>
  <div class="body">
    <div class="bg">
      <div class="work-station">
        <template>
          <el-table :data="projectTable">
            <el-table-column prop="projectName" label="项目名称" width="290"></el-table-column>
            <el-table-column prop="endTime" label="结束日期" width="200">
              <template slot-scope="scope">{{scope.row.endTime | dateFrm}}</template>
            </el-table-column>
            <el-table-column prop="projectStatus" label="项目状态" width="200">
              <template slot-scope="scope">{{scope.row.projectStatus | statusType}}</template>
            </el-table-column>
            <el-table-column prop="duration" label="预计时间" width="200">
              <template slot-scope="scope">{{scope.row.duration}} 天</template>
            </el-table-column>
            <el-table-column prop="time_consuming" label="消耗时间" width="200">
               <template slot-scope="scope">{{scope.row.beginTime | consumedTime}} 天</template>
              </el-table-column>
            <el-table-column prop="remaining_time" label="剩余" width="200">
              <template slot-scope="scope">{{scope.row.endTime | remainTime}} 天</template>
            </el-table-column>
            <el-table-column prop="schedule" label="总进度" width="200">
              <template slot-scope="scope">{{progressByDay(scope.row.beginTime,scope.row.endTime)}}%</template>
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
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
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
    loadData() {
      const page = this.currentPage;
      const pageSize = this.pageSize;
      this.$axios({ method: "get", url: "project?status=in_progress" })
        .then(res => {
          console.log(res);
          this.projectTable = res.data.content;
          this.total = res.data.totalElements;
        })
        .catch(err => {
          console.log("数据有误");
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

    progressByDay(beginDate,endDate) {
      const current = new Date();
      const consumedDate = moment(current).diff(beginDate,'day')
      const totalDay = moment(endDate).diff(beginDate,'day')
      if(totalDay == 0) return 0;
      return Math.round((consumedDate / totalDay) * 100)
    }
  },

  filters: {
    //过滤器，局部的过滤的函数放这里
    statusType: function(val) {
      if (val == "IN_PROGRESS") return "进行中";
    },
    dateFrm: function(el){
      return moment(el).format("YYYY-MM-DD")
    },
    consumedTime(beginTime) {
      return moment(new Date()).diff(beginTime,'day')
    },
    remainTime(endTime) {
      return moment(endTime).diff(new Date(),'day')
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