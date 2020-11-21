<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="card-title">调研列表</span>
        <el-button v-show="delResultList.length" type="danger" size="mini" style="float: right;" @click="delQuestionResult()">删除</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData"
        element-loading-text="Loading"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="user" label="调研人员" />
        <el-table-column prop="created_at" label="日期" />
        <el-table-column align="center" prop="created_at" label="操作" width="250">
          <template slot-scope="scope">
            <el-button type="success" icon="el-icon-video-play" size="mini" @click="$router.push({path:'/question/result', query: { uid: scope.row.uid, title: scope.row.title}})">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

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
      delResultList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      api.getQuestionResult().then(response => {
        this.tableData = response.data
        this.listLoading = false
      })
    },

    handleSelectionChange(val) {
      this.delResultList = val.map(item => {
        return item.id
      })
    },

    delQuestionResult(){
      let delData = {
        list_id: JSON.stringify(this.delResultList)
      }
      api.delQuestionResult(delData).then(response => {
        if (response.code === 200){
          this.fetchData()
          this.$message.success('删除成功！')
        }else{
          this.$message.error('删除失败, 请重试！')
        }
      })
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
