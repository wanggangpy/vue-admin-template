<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="card-title">问卷管理</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="$router.push('/evaluation/add')">添加</el-button>
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
        <el-table-column label="调研人数" width="80" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.person_num }}</span>
          </template>
        </el-table-column>
        <el-table-column label="完成人数" width="100" align="center">
          <template slot-scope="scope">
            <el-progress type="circle" :width="50" :percentage="scope.row.already"></el-progress>
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
        <el-table-column class-name="status-col" label="状态" width="110" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status" class="ant-badge-status-dot ant-badge-status-success"></span>
            <span v-else class="ant-badge-status-dot ant-badge-status-error"></span>
            {{ scope.row.status ? '启动中' : '停止' }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="操作" width="200">
          <template slot-scope="scope">
            <el-button v-if="!scope.row.status" type="success" icon="el-icon-video-play" size="mini" @click="changeStatus(scope.$index, scope.row.status)">开始</el-button>
            <el-button v-if="!scope.row.status" type="info" icon="el-icon-edit" size="mini" @click="$router.push('/evaluation/add')">编辑</el-button>
            <el-button v-if="scope.row.status" type="warning" icon="el-icon-video-pause" size="mini" @click="changeStatus(scope.$index, scope.row.status)">停止</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: false,
      dataList: [
        { id: 1, title: '松材线虫病防控绩效评估综合评价表', person_num: 50, already: 20, start_time: '2020-11-11', end_time: '2020-11-20', status: 0 }
      ]
    }
  },
  created() {
    // this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data_list
        this.listLoading = false
      })
    },

    changeStatus(index, status) {
      this.dataList[index].status = status ? 0 : 1
    },

    format(percentage) {
      return percentage === 50 ? '满' : `${percentage}%`
    }
  }
}
</script>
<style lang="scss">

.app-container {
  .ant-badge-status-error {
    background-color: #ff4d4f;
  }
  .ant-badge-status-success {
      background-color: #52c41a;
  }
  .ant-badge-status-dot {
    position: relative;
    top: -1px;
    display: inline-block;
    width: 6px;
    height: 6px;
    vertical-align: middle;
    border-radius: 50%;
  }

 .add-btn {
   margin-bottom:20px;
  }
}

</style>
