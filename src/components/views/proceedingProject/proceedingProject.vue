<template>
  <div class="body">
    <div class="bg">
      <div class="work-station">
        <template>
          <el-table :data="tableData">
            <el-table-column prop="project_name" label="项目名称" width="200"></el-table-column>
            <el-table-column prop="deadline" label="结束日期" width="200"></el-table-column>
            <el-table-column prop="status" label="项目状态" width="200"></el-table-column>
            <el-table-column prop="estimated_time" label="预计时间" width="200"></el-table-column>
            <el-table-column prop="time_consuming" label="消耗时间" width="200"></el-table-column>
            <el-table-column prop="remaining_time" label="剩余" width="200"></el-table-column>
            <el-table-column prop="schedule" label="总进度" width="200"></el-table-column>
          </el-table>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          project_name: "广州大学松田学院",
          deadline: "2019-05-24",
          status: "进行中",
          estimated_time: "2019-05-24",
          time_consuming: "18天",
          remaining_time: "10天",
          schedule: "0.1%"
        },
        {
          project_name: "广州大学松田学院",
          deadline: "2019-05-24",
          status: "进行中",
          estimated_time: "2019-05-24",
          time_consuming: "18天",
          remaining_time: "10天",
          schedule: "0.1%"
        },
        {
          project_name: "广州大学松田学院",
          deadline: "2019-05-24",
          status: "进行中",
          estimated_time: "2019-05-24",
          time_consuming: "18天",
          remaining_time: "10天",
          schedule: "0.1%"
        },
        {
          project_name: "广州大学松田学院",
          deadline: "2019-05-24",
          status: "进行中",
          estimated_time: "2019-05-24",
          time_consuming: "18天",
          remaining_time: "10天",
          schedule: "0.1%"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.body {
  margin: 0%;
  padding: 0%;
  .workstation {
    top: 0px;
  }
}
</style>