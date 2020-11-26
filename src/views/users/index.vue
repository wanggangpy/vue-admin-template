<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="card-title">用户列表</span>
        <el-button v-show="delUserList.length" type="danger" size="mini" style="float: right;" @click="delUsers()">删除</el-button>
        <el-button v-show="!delUserList.length" size="mini" type="primary" style="float: right;" @click.native="uploadDialogVisible = true">导入用户</el-button>
      </div>
      <el-table v-loading="listLoading" :data="tableData.data" element-loading-text="Loading" style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="username" label="用户名" width="180" />
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="telephone" label="电话" />
        <el-table-column prop="roles" label="权限">
           <template slot-scope="scope">
              {{getUserAuth(scope.row.roles[0])}}
           </template>
        </el-table-column>
        <el-table-column prop="address" label="地址" />
        <el-table-column prop="created_at" label="添加日期" width="180" />
      </el-table>
      <div class="footer">
        <el-pagination background :page-size="15" layout="prev, pager, next" @current-change="handleCurrentChange"
          :total="tableData.count">
        </el-pagination>
      </div>
    </el-card>

    <el-dialog title="导入用户" :visible.sync="uploadDialogVisible" :width="dialogWidth">
      <div style="margin-bottom: 20px; text-align: center;">
        <el-radio-group v-model="radio">
          <el-radio label="single">单项添加</el-radio>
          <el-radio label="many">批量添加</el-radio>
        </el-radio-group>
      </div>
      <el-form v-show="radio==='single'" :model="userForm" :rules="rules" ref="userForm" label-width="100px"
        class="userForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="userForm.password"></el-input>
        </el-form-item>
        <!--        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="userForm.checkPass"></el-input>
        </el-form-item> -->
        <el-form-item label="单位名称" prop="name">
          <el-input v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="userForm.address"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="telephone">
          <el-input v-model="userForm.telephone"></el-input>
        </el-form-item>
        <el-form-item label="权限" prop="roles">
          <el-select v-model="userForm.roles">
            <el-option label="专家" value="expert"></el-option>
            <el-option label="普通用户" value="guest"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('userForm')">提交</el-button>
        </el-form-item>
      </el-form>
      <el-upload v-show="radio === 'many'" class="upload-demo" drag :action="uploadApi" :accept="uploadFileType"
        :before-upload="beforeAvatarUpload" :show-file-list="false" :on-success="handleAvatarSuccess">
        <i class="el-icon-upload" />
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div slot="tip" class="el-upload__tip">只能上传excel文件，且不超过10M</div>
        <div slot="tip" class="el-upload__tip">
          <el-link :href="importUserDemoUrl">下载模板文件</el-link>
        </div>
      </el-upload>

    </el-dialog>

  </div>
</template>

<script>
  import * as api from '@/api/w'

  export default {
    data() {
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.userForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        tableData: [],
        uploadDialogVisible: false,
        listLoading: false,
        dialogWidth: '30%',
        uploadApi: process.env.VUE_APP_BASE_API + '/upload',
        uploadFileType: '.xls,.xlsx',
        importUserDemoUrl: process.env.VUE_APP_BASE_API + '/download?file=模板.xlsx',
        delUserList: [],
        radio: 'single',
        userForm: {
          username: '',
          password: '',
          name: '',
          address: '',
          telephone: '',
          roles: '',
        },
        rules: {
          username: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }],
          name: [{
            required: true,
            message: '请填写单位名称',
            trigger: 'blur'
          }],
          address: [{
            required: true,
            message: '请填写地址',
            trigger: 'blur'
          }],
          telephone: [{
            required: true,
            message: '请填写地址',
            trigger: 'blur'
          }],
          roles: [{
            required: true,
            message: '请选择权限',
            trigger: 'change'
          }],
        }
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData(page = 1) {
        this.listLoading = true
        api.getUserData(page).then(response => {
          const data = response.data
          this.tableData = data
          this.listLoading = false
        })
      },

      handleCurrentChange(val) {
        this.fetchData(val)
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
        api.importUser({
          'file': res
        }).then(response => {
          const data = response.data
          this.tableData = data
          this.$message.success('导入用户成功')
        })
        this.uploadDialogVisible = false
      },

      handleSelectionChange(val) {
        this.delUserList = val.map(item => {
          return item.id
        })
      },

      getUserAuth(role){
        if (role === 'guest'){
          return '普通用户'
        }
        return '专家'
      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let addUserData = JSON.parse(JSON.stringify(this.userForm))
            addUserData.roles = [this.userForm.roles]
            api.addUser(addUserData).then(response => {
              if (response.code === 200){
                this.fetchData()
                this.$message.success('添加成功！')
                this.userForm = {
                  username: '',
                  password: '',
                  name: '',
                  address: '',
                  telephone: '',
                  roles: '',
                }
              }
              this.uploadDialogVisible = false
            })
          } else {
            return false;
          }
        });
      },

      delUsers() {
        let delData = {
          list_id: JSON.stringify(this.delUserList)
        }
        this.$confirm('此操作将删除选择用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.delUser(delData).then(response => {
            if (response.code) {
              this.fetchData()
              this.$message.success('删除成功！')
            } else {
              this.$message.error('删除失败，请重试 ~')
            }
          })
        }).catch(() => {});
      }

    }
  }
</script>

<style scoped>
  .line {
    text-align: center;
  }

  .card-title {
    font-weight: 500;
    font-size: 15px;
  }

  .upload-demo {
    text-align: center;
  }

  .footer {
    margin-top: 20px;
    text-align: right;
  }
</style>
