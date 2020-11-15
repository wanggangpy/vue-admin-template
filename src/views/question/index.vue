<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="card-title">问卷管理</span>
        <el-button style="float: right;" size="small" type="primary" @click="$router.push('/questionManage/add')">添加</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData"
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
            <span>{{ scope.row.survey_number }}</span>
          </template>
        </el-table-column>
        <el-table-column label="完成人数" width="100" align="center">
          <template slot-scope="scope">
            <el-progress v-if="scope.row.completed_number > 0" type="circle" :width="50" :percentage="(scope.row.survey_number - scope.row.completed_number) / scope.row.survey_number"></el-progress>
            <el-progress v-else type="circle" :width="50" :percentage="0"></el-progress>
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
        <el-table-column class-name="status-col" label="状态" width="110" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status" class="ant-badge-status-dot ant-badge-status-success"></span>
            <span v-else class="ant-badge-status-dot ant-badge-status-error"></span>
            {{ scope.row.status ? '启动中' : '停止' }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="操作">
          <template slot-scope="scope">
            <el-button v-if="!scope.row.status" type="success" icon="el-icon-video-play" size="mini" @click="startVisible = true, startQuestionId = scope.row.id">开始</el-button>
            <el-button v-if="!scope.row.status" type="info" icon="el-icon-edit" size="mini" @click="$router.push({path: '/questionManage/add', query: {id: scope.row.id}})">编辑</el-button>
            <el-button v-if="scope.row.status" type="warning" icon="el-icon-video-pause" size="mini" @click="stopQuestion(scope.row.id)">停止</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      title="开启问卷"
      :visible.sync="startVisible"
      width="30%"
      >
      <el-form ref="startForm" :model="startForm" label-position="left" :rules="startRules" :show-message="false">
      <el-form-item label="调研人员" prop="users">
        <el-select v-model="startForm.users" placeholder="请选择人员" multiple style="width: 70%">
          <el-option v-for="item in surveyUsers" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="startVisible = false">取 消</el-button>
        <el-button type="primary" @click="startQuestion">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as api from '@/api/w'

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
      listLoading: false,
      tableData: [],
      startVisible: false,
      surveyUsers: [],
      startForm: {},
      startRules: {
        users: [
          { required: true, message: '请选择调研人员', trigger: 'blur' }
        ] },
      startQuestionId: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      api.getQuestionData().then(response => {
        this.tableData = response.data
      })
      api.getUserData().then(response => {
        this.surveyUsers = response.data
        this.listLoading = false
      })
    },

    startQuestion() {
      this.$refs.startForm.validate((valid) => {
        if (valid) {
          api.updateQuestion(this.startQuestionId, { 'status': true, 'survey_number': this.startForm.users.length, 'users': this.startForm.users.join() }).then(response => {
            this.startVisible = false
            this.tableData.forEach((item, index) => {
              if (item.id === this.startQuestionId) {
                this.tableData[index].status = true
                this.tableData[index].survey_number = this.startForm.users.length
              }
            })
          })
        } else {
          return false
        }
      })
    },

    stopQuestion(id) {
      api.updateQuestion(id, { 'status': false }).then(response => {
        this.tableData.forEach((item, index) => {
          if (item.id === id) {
            this.tableData[index].status = false
          }
        })
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
