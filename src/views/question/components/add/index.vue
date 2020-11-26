<template>
  <div class="add-Question">
    <el-row>
      <div class="question-header">
        <i class="el-icon-menu"></i>
        <span class="question-title">问卷信息</span>
        <div style="float: right; display: inline-block;">
          <el-button type="success" size="mini" icon="el-icon-document-checked" @click="saveQuestion">保存问卷</el-button>
        </div>
      </div>

      <el-divider></el-divider>
      <el-row>
        <el-form style="width: 510px;" label-position="left" label-width="110px" :model="QuestionForm" :rules="questionFormRules"
          ref="QuestionForm">
          <el-form-item label="问卷标题" required prop="title">
            <el-input v-model="QuestionForm.title"></el-input>
          </el-form-item>
          <el-form-item label="调研用户" required prop="users">
            <el-select v-model="QuestionForm.users" placeholder="请选择人员" multiple style="width: 100%">
              <el-option v-for="item in surveyUsers" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="问卷调研时间" required prop="surveyTime">
            <el-date-picker v-model="QuestionForm.surveyTime" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
          </el-form-item>
        </el-form>
      </el-row>
    </el-row>

    <el-row>
      <div class="question-header">
        <i class="el-icon-menu"></i>
        <span class="question-title">问卷调研内容</span>
        <AddContent @addContent="addContent" ref="addContentRef"></AddContent>
      </div>
      <el-divider></el-divider>
      <el-row v-for="(content,cindex) in QuestionForm.content" :key="cindex">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ content.title }}</span>
            <el-dropdown trigger="click" @command="handleContentCommand($event, content, cindex)" style="display: inline-block;float: right;">
              <span class="el-dropdown-link">
                操作<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="add" icon="el-icon-circle-plus">添加分部内容</el-dropdown-item>
                <el-dropdown-item command="edit" icon="el-icon-edit">编辑</el-dropdown-item>
                <el-dropdown-item command="delete" icon="el-icon-delete">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <AddSection @addSection="addSection" ref="addSectionRef" />
          </div>
          <div class="text item">
            <el-tabs tab-position="left" @tab-click="handleClick($event, cindex)" style="min-height: 200px;">
              <el-tab-pane v-for="(section, sindex) in content.section_list" :key="sindex">
                <span slot="label" style="z-index: 5000;">
                  <!--                  <i class="el-icon-edit" v-show="String(sindex) + String(cindex) === activeName" @click="editSection(section, cindex, sindex)"></i>
                  {{ section.title }} ({{section.score}}分) -->
                  <span class="el-dropdown-link">
                    {{section.title}} ({{section.score}}分)
                  </span>
                  <el-dropdown trigger="click" @command="handleSectionCommand($event, section, cindex, sindex)">
                    <i class="el-icon-arrow-down el-icon--right"></i>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="edit" icon="el-icon-edit">编辑</el-dropdown-item>
                      <el-dropdown-item command="delete" icon="el-icon-delete">删除</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </span>
                <div v-for="(item, iindex) in section.item_list" :key="iindex" class="item-box">
                  <span>{{ iindex + 1 }}，({{ item.title }})，{{ item.content }}</span>
                  <span class="del-chooses-btn">
                    <el-button type="primary" icon="el-icon-edit" size="mini" circle @click="editItem(item, cindex, sindex, iindex)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="delItem(cindex, sindex, iindex)"></el-button>
                  </span>
                  <p class="item-box-choose" v-for="(choose, index) in item.chooses" :key="index">{{ choose.title }}（{{ choose.choose_score }}分）</p>
                </div>
                <el-button class="add-item-btn" icon="el-icon-plus" circle @click="openItemDialog(cindex, sindex)" />
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-card>
      </el-row>
    </el-row>
    <AddItem @addItem="addItem" ref="addItemRef" />

    <!--    <el-row>
      <el-button type="success" @click="$router.push({path: '/QuestionManage/list'})">返回</el-button>
    </el-row> -->

  </div>
</template>

<script>
  import * as api from '@/api/w'
  import AddContent from './common/addContent'
  import AddSection from './common/addSection'
  import AddItem from './common/addItem'

  export default {
    components: {
      AddContent,
      AddSection,
      AddItem
    },
    data() {
      return {
        surveyUsers: [],
        contentIndex: '',
        sectionIndex: '',
        itemIndex: '',
        questionTitle: {},
        QuestionForm: {
          title: '',
          users: [],
          content: [],
          surveyTime: [
            new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours(),
              new Date()
              .getMinutes()),
            new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7, new Date().getHours(),
              new Date().getMinutes())
          ],
        },
        questionFormRules: {
          title: [{
            required: true,
            message: '请输入问卷标题',
            trigger: 'blur'
          }],
          users: [{
            required: true,
            message: '请选择调研人员',
            trigger: 'change'
          }],
          surveyTime: [{
            required: true,
            message: '请选择调研时间',
            trigger: 'change'
          }],

        },
        activeName: '00'

      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        const id = this.$route.query.id
        if (id) {
          api.getDetailQuestionData(id).then(response => {
            if (response.data.length !== 0) {
              this.QuestionForm = response.data
              this.QuestionForm.users = response.data.users ? response.data.users.split(',').map((item) => {
                return parseInt(item)
              }) : []
              this.$set(this.QuestionForm, "surveyTime", [new Date(response.data.start_at), new Date(response.data.end_at)])
            }
          })
        }
        api.getUserData(1, 1).then(response => {
          this.surveyUsers = response.data.data
        })
      },
      saveQuestion() {
        this.$refs.QuestionForm.validate((valid) => {
          if (valid) {
            const data = this.QuestionForm
            console.log(data.users.length)
            data.survey_number = data.users.length
            data.users = data.users.join()
            api.addQuestion(data).then(response => {
              this.$router.push('/questionManage/list')
              this.$message.success('保存成功')
            })
          } else {
            this.$message.error('问卷信息不能为空')
            return false
          }
        })
      },
      handleClick(tab, index) {
        this.activeName = tab._data.index + index
      },
      addContent(data, type) {
        if (type) {
          this.QuestionForm.content.push(data)
        } else {
          this.QuestionForm.content.splice(this.contentIndex, 1, data)
        }
      },
      handleContentCommand(command, content, cindex) {
        if (command === 'add') {
          this.contentIndex = cindex
          this.$refs.addSectionRef[0].open()
        } else if (command === 'edit') {
          this.$refs.addContentRef.edit(content)
        } else if (command === 'delete') {
          this.$confirm('此操作将删除该评估内容, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.QuestionForm.content.splice(cindex, 1)
          }).catch(() => {});
        }
      },
      addSection(data, type) {
        if (type) {
          this.QuestionForm.content[this.contentIndex].section_list.push(data)
        } else {
          this.QuestionForm.content[this.contentIndex].section_list.splice(this.sectionIndex, 1, data)
        }
      },
      editSection(section, cindex, sindex) {
        this.contentIndex = cindex
        this.sectionIndex = sindex
        this.$refs.addSectionRef[0].edit(section)
      },
      handleSectionCommand(command, section, cindex, sindex) {
        if (command === 'edit') {
          this.editSection(section, cindex, sindex)
        } else if (command === 'delete') {
          this.$confirm('此操作将删除该分部内容, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.QuestionForm.content[cindex].section_list.splice(sindex, 1)
          }).catch(() => {});
        }
      },
      openItemDialog(cindex, sindex) {
        this.$refs.addItemRef.open()
        this.contentIndex = cindex
        this.sectionIndex = sindex
      },
      addItem(data, type) {
        if (type) {
          this.QuestionForm.content[this.contentIndex].section_list[this.sectionIndex].item_list.push(data)
        } else {
          this.QuestionForm.content[this.contentIndex].section_list[this.sectionIndex].item_list.splice(this.itemIndex,
            1, data)
        }
      },

      delItem(cindex, sindex, iindex) {
        this.QuestionForm.content[cindex].section_list[sindex].item_list.splice(iindex, 1)
      },
      editItem(item, cindex, sindex, iindex) {
        this.contentIndex = cindex
        this.sectionIndex = sindex
        this.itemIndex = iindex
        this.$refs.addItemRef.edit(item)
      },
      onCancel() {
        this.$message({
          message: 'cancel!',
          type: 'warning'
        })
      }
    }
  }
</script>

<style>
  .el-row {
    padding: 10px 30px;
  }

  .item-box {
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px #e6dede dashed;
  }

  .item-box .del-chooses-btn {
    float: right;
  }

  .add-item-btn {
    margin-top: 10px;
  }

  .el-form--label-top .el-form-item__label {
    float: none;
    display: inline-block;
    text-align: left;
    padding: 0px !important
  }

  .el-dropdown-link {
    cursor: pointer;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  .el-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin: 0px 0px 20px 0px !important
  }

  .question-header {
    height: 50px;
    line-height: 50px;
  }

  .question-header .el-icon-menu {
    color: #0fa0e6;
    font-size: 20px;
  }

  .question-header .question-title {
    margin-left: 10px;
    font-size: 18px;
    font-weight: 700;
    color: #4a5767;
    line-height: 18px;
  }

  .item-box .item-box-choose {
    font-size: 14px;
    margin-left: 25px;
  }
</style>
