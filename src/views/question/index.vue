<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="card-title">测评管理</span>
        <el-button style="float: right;" size="small" type="primary" @click="$router.push('/questionManage/add')">添加</el-button>
      </div>
      <el-table v-loading="listLoading" :data="tableData" element-loading-text="Loading" border fit
        highlight-current-row>
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
        <el-table-column label="调研人数" align="center" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.survey_number }}</span>
          </template>
        </el-table-column>
        <el-table-column label="完成人数" align="center">
          <template slot-scope="scope">
            <el-progress v-if="scope.row.completed_number > 0" type="circle" :width="50" :percentage="percentage(scope.row)"></el-progress>
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
        <el-table-column align="center" prop="created_at" label="操作" width="120">
          <template slot-scope="scope">
            <el-dropdown @command="handleCommand($event, scope.row.id)">
              <span class="el-dropdown-link">
                更多操作<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-if="!scope.row.status" command="start" icon="el-icon-video-play">启动调研</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.status" command="stop" icon="el-icon-video-pause">停止调研</el-dropdown-item>
                <el-dropdown-item command="edit" :disabled="scope.row.status" icon="el-icon-edit-outline">编辑问卷</el-dropdown-item>
                <el-dropdown-item command="delete" :disabled="scope.row.status" icon="el-icon-delete">删除问卷</el-dropdown-item>
                <!-- <el-dropdown-item disabled>双皮奶</el-dropdown-item> -->
              </el-dropdown-menu>
            </el-dropdown>
            <!--            <el-button v-if="!scope.row.status" type="success" icon="el-icon-video-play" size="mini" @click="startQuestion(scope.row.id)">开始</el-button>
            <el-button v-if="!scope.row.status" type="info" icon="el-icon-edit" size="mini" @click="$router.push({path: '/questionManage/add', query: {id: scope.row.id}})">编辑</el-button>
            <el-button v-if="scope.row.status" type="warning" icon="el-icon-video-pause" size="mini" @click="stopQuestion(scope.row.id)">停止</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </el-card>
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
        surveyUsers: [],
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
          this.listLoading = false
        })
      },

      delQuestionData(id) {
        this.$confirm('此操作将永久删除该问卷, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.delQuestionData({
            id
          }).then(response => {
            if (response.code === 200) {
              this.fetchData()
              this.$message.success('问卷删除成功！')
            }
          })
        }).catch(() => {});
      },

      startQuestion(startQuestionId) {
        api.updateQuestion(startQuestionId, {
          'status': true
        }).then(response => {
          if (response.code === 200) {
            this.fetchData()
          }
        })
      },

      stopQuestion(id) {
        api.updateQuestion(id, {
          'status': false
        }).then(response => {
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

      percentage(row) {
        if (row.survey_number > row.completed_number) {
          return parseInt((row.completed_number / row.survey_number * 100).toFixed(0))
        }
        return 100
      },

      handleCommand(command, id) {
        if (command === 'start') {
          this.startQuestion(id)
        } else if (command === 'stop') {
          this.stopQuestion(id)
        } else if (command === 'edit') {
          this.$router.push({
            path: '/questionManage/add',
            query: {
              id: id
            }
          })
        } else if (command === 'delete') {
          this.delQuestionData(id)
        }
      }


    }
  }
</script>
<style lang="scss" scoped>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF !important
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

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
      margin-bottom: 20px;
    }
  }
</style>
