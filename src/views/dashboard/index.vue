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
        <el-table-column label="Title">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column label="开始时间" width="150" align="center">
          <template slot-scope="scope">
            {{ scope.row.start_time }}
          </template>
        </el-table-column>
        <el-table-column label="结束时间" width="150" align="center">
          <template slot-scope="scope">
            {{ scope.row.end_time }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="操作" width="200">
          <template slot-scope="scope">
            <el-button v-if="!scope.row.status" type="success" icon="el-icon-edit" size="mini" @click="$router.push({ path: '/question/fill' })">填写</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {

  data() {
    return {
      list: null,
      listLoading: true,
      dataList: [
        { id: 1, title: '这是一个title这是一个title这是一个title', start_time: '2020-11-11', end_time: '2020-11-20' },
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data_list
        this.listLoading = false
      })
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
