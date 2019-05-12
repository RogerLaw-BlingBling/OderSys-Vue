<template>
  <div class="filelist">
    <div class="toolbar">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-select v-model="value" filterable placeholder="请选择" size="small" style="width:330px;min-height:60px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-upload>
            <el-button type="primary" size="small">选择文件</el-button>
            <el-button
              style="margin-left: 10px;"
              size="small"
              type="success"
              @click="submitUploadButton"
            >上传到服务器</el-button>
          </el-upload>
        </el-col>
      </el-row>
    </div>

    <template>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="demandFileName" label="需求文件" width="500"></el-table-column>
        <el-table-column prop="demandTime" label="客户名称" width="320"></el-table-column>
        <el-table-column prop="demandTime" label="项目名" width="320"></el-table-column>
        <el-table-column prop="demandTime" label="时间" width="320"></el-table-column>
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
export default {
  data() {
    return {
      //下拉列表
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',

      // fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
      tableData: [
        {
          demandFileName: "广州大学松田学院15计算机科学与技术2班个人毕业设计",
          demandTime: "2019-05-26"
        }
      ]
    };
  },
  methods: {
    loadData(){

    },
    submitUploadButton() {
      // this.$refs.upload.submit();
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
    mounted(){
      this.loadData();
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