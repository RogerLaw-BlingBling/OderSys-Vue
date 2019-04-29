<template>
  <div>
    <el-row :gutter="24">
      <el-col :span="24">
        <div class="grid-content bg-purple">
          <el-upload
            class="upload-demo"
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button
              style="margin-left: 10px;"
              size="small"
              type="success"
              @click="submitUpload"
            >上传到服务器</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </div>
      </el-col>
      <!-- <el-col :span="8">
        <div class="grid-content bg-purple">
          
        </div>
      </el-col>-->
    </el-row>
    <div class="filelist">
      <template>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="demandFileName" label="需求文件" width="500"></el-table-column>
          <el-table-column prop="demandTime" label="客户名称" width="320"></el-table-column>
          <el-table-column prop="demandTime" label="项目名" width="320"></el-table-column>
          <el-table-column prop="demandTime" label="时间" width="320"></el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
      tableData: [
        {
          demandFileName: "广州大学松田学院15计算机科学与技术2班个人毕业设计",
          demandTime: "2019-05-26"
        },
        {
          demandFileName: "广州大学松田学院15计算机科学与技术2班个人毕业设计",
          demandTime: "2019-05-26"
        },
        {
          demandFileName: "广州大学松田学院15计算机科学与技术2班个人毕业设计",
          demandTime: "2019-05-26"
        },
        {
          demandFileName: "广州大学松田学院15计算机科学与技术2班个人毕业设计",
          demandTime: "2019-05-26"
        }
      ]
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  }
};
</script>

<style lang="scss" scoped>
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