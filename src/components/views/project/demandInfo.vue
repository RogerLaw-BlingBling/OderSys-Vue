<template>
  <div class="filelist">
    <div class="toolbar">
      <el-form>
        <el-row :gutter="20">
          <el-select
            v-model="selectedProject"
            value-key="id"
            filterable
            placeholder="请选择"
            size="small"
            style="width:330px;min-height:60px"
          >
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item.projectName"
              :value="item.id"
            ></el-option>
          </el-select>

          <el-button type="primary" @click="selectFile" size="small">选择文件</el-button>
          <el-button type="success" size="small" @click="submitFile">上传到服务器</el-button>
          <el-tag type="success" v-show="showTag" closable @close="closeTag">{{fileList.name}}</el-tag>
        </el-row>
      </el-form>
      <form v-show="false">
        <input type="file" ref="fileInput" @change="fileChange($event)" name="file">
      </form>
    </div>

    <template>
      <el-table :data="demandDataTable" style="width: 100%">
        <el-table-column prop="demand.title" label="需求文件" width="500"></el-table-column>
        <el-table-column prop="project.projectName" label="项目名" width="300" sortable></el-table-column>
        <el-table-column label="上传时间" width="230" sortable>
          <template slot-scope="scope">{{scope.row.uploadTime | dateFrm}}</template>
        </el-table-column>
        <el-table-column label="文件操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="downLoadButton(scope.row.demand.id)">下载</el-button>
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
    </template>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
import { connect } from "net";
export default {
  data() {
    return {
      demandDataTable: [],

      fileList: {},

      currentPage: 1, //当前页
      pageSize: 10, //显示条数
      total: 0, //总数

      //下拉工程名列表
      options: [],
      value: "",
      selectedProject: "",
      showTag: false
    };
  },
  methods: {
    loadData() {
      axios.get("/project").then(res => {
        this.options = res.data.content;
        console.log("方法有效");
      });

      const page = this.currentPage;
      const pageSize = this.pageSize;
      axios.get("/demand").then(res => {
        this.demandDataTable = res.data.content;
        this.total = res.data.totalElements;
      });
    },

    submitUploadButton() {
      console.log(this.fileList);
      // var formData = new FormData();
      // formData.append('file', this.fileList[0]);
      // axios.post('demand?projectId=' + 1, formData).then(res=>{
      //   console.log(res);
      // })
      this.$refs.upload.submit();
    },

    downLoadButton(id) {
      window.location.href = "/demand/" + id + "/file";
    },

    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePreview(file) {
      // console.log(file);
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
    selectFile() {
      this.$refs.fileInput.click();
    },
    fileChange(event) {
      this.fileList = event.srcElement.files[0];
      this.showTag = true;
      // this.fileList.push(event.srcElement.files[0]);
      // var list = [];
      // list.splice()
      console.log(this.fileList);
    },
    submitFile() {
      const id = this.selectedProject;
      var formData = new FormData();
      formData.append("file", this.fileList);
      axios.post(`/demand?projectId=${id}`, formData).then(res => {
        this.loadData();
      });
    },
    closeTag() {
      this.fileList = [];
      this.showTag = false;
    }
  },
  filters: {
    dateFrm: function(el){
      return moment(el).format("YYYY-MM-DD HH:mm:ss")
    }
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
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>