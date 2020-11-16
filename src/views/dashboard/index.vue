<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="card-title">我的问卷</span>
      </div>
      <el-table
        v-loading="listLoading"
        :data="dataList"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="ID" width="50">
          <template slot-scope="scope">
            <!-- {{ scope.$index }} -->
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column label="标题">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="开始时间" align="center">
          <template slot-scope="scope">
            {{ scope.row.start_at }}
          </template>
        </el-table-column>
        <el-table-column label="结束时间" align="center">
          <template slot-scope="scope">
            {{ scope.row.end_at }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="操作" width="200">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status" type="success" icon="el-icon-edit" size="mini" @click="fillClick(scope.row)">填写</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import * as api from '@/api/w'

export default {

  data() {
    return {
      list: null,
      listLoading: false,
      dataList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      api.getUserQuestionData(this.$store.state.user.name.k).then(response => {
        this.dataList = response.data
        this.listLoading = false
      })
    },
    fillClick(row) {
      const nowData = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours(), new Date().getMinutes())
      if (nowData > new Date(row.end_at)){
        this.$message.error('填写问卷时间已过不能填写！')
      } else if (nowData < new Date(row.start_at)) {
        this.$message.error('填写问卷时间没到不能填写！')
      } else {
        this.$router.push({path: '/question/fill', query: {'data': JSON.stringify(row)}})
      }
    }
  }
}
</script>
<style lang="scss">

.app-container {
 .add-btn {
   margin-bottom:20px;
  }
}

</style>
