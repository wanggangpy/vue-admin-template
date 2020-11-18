<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="card-title">用户列表</span>
        <el-button v-show="delUserList.length" type="danger" size="mini" style="float: right;">删除</el-button>
        <el-button v-show="!delUserList.length" size="mini" type="primary" style="float: right;" @click.native="uploadDialogVisible = true">导入用户</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData"
        element-loading-text="Loading"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="username" label="用户名" width="180" />
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="telephone" label="电话" />
        <el-table-column prop="address" label="地址" />
        <el-table-column prop="created_at" label="添加日期" width="180" />
      </el-table>
    </el-card>

    <el-dialog title="上传文件" :visible.sync="uploadDialogVisible" :width="dialogWidth">
      <el-upload
        class="upload-demo"
        drag
        :action="uploadApi"
        :accept="uploadFileType"
        :before-upload="beforeAvatarUpload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
      >
        <i class="el-icon-upload" />
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div slot="tip" class="el-upload__tip">只能上传excel文件，且不超过10M</div>
        <div slot="tip" class="el-upload__tip"><el-link :href="importUserDemoUrl">下载模板文件</el-link></div>
      </el-upload>

    </el-dialog>

  </div>
</template>

<script>
import * as api from '@/api/w'

export default {
  data() {
    return {
      tableData: [],
      uploadDialogVisible: false,
      listLoading: false,
      dialogWidth: '30%',
      uploadApi: process.env.VUE_APP_BASE_API + '/upload',
      uploadFileType: '.xls,.xlsx',
      importUserDemoUrl: process.env.VUE_APP_BASE_API + '/download?file=模板.xlsx',
      delUserList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      api.getUserData().then(response => {
        const data = response.data
        data.forEach((item, index) => {
          if (item.name === 'admin') {
            data.splice(index, 1)
          }
        })
        this.tableData = data
        this.listLoading = false
      })
    },

    beforeAvatarUpload(file) {
      // const checkFile = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'].includes(file.type)
      const isLt10M = file.size / 1024 / 1024 < 10
      // if (!checkFile) {
      //   this.$message.error('上传文件只能是 EXCEL 文档!')
      // }

      if (!isLt10M) {
        this.$message.error('上传文件大小不能超过 10MB!')
      }

      return isLt10M
    },

    handleAvatarSuccess(res, file) {
      api.importUser({ 'file': res }).then(response => {
        const data = response.data
        data.forEach((item, index) => {
          if (item.name === 'admin') {
            data.splice(index, 1)
          }
        })
        this.tableData = data
        this.$message.success('导入用户成功')
      })
      this.uploadDialogVisible = false
    },

    handleSelectionChange(val) {
      this.delUserList = val
    }

  }
}
</script>

  <style scoped>
  .line{
    text-align: center;
  }
  .card-title {
    font-weight: 500;
    font-size: 15px;
  }
  .upload-demo {
    text-align: center;
  }
</style>
