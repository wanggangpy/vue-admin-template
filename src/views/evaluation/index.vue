<template>
  <div class="add-evaluation">
    <el-row>
      <el-input v-model="EvaluationForm.title" />
    </el-row>
    <el-row v-for="(content,cindex) in EvaluationForm.contentList" :key="cindex">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>{{ content.title }}</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="sectionVisible = true, contentIndex=cindex">添加</el-button>
        </div>
        <div class="text item">
          <el-tabs tab-position="left" style="height: 200px;">
            <el-tab-pane :label="section.title" v-for="(section, sindex) in content.section_list" :key="sindex">
              <el-button icon="el-icon-plus" circle @click="itemVisible = true"></el-button>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-card>
    </el-row>

    <el-row>
      <el-button type="primary" @click="sectionVisible = true">添加</el-button>
    </el-row>
    <el-dialog width="25%" title="添加评估内容" :visible.sync="contentVisible">
      <el-form :model="contentForm" :rules="contentRules" ref="contentForm">
        <el-form-item label="评估内容标题" :label-width="formLabelWidth" prop="title">
          <el-input v-model="contentForm.title"></el-input>
        </el-form-item>
        <el-form-item label="评估内容权重" :label-width="formLabelWidth" prop="weights">
          <el-input v-model="contentForm.weights"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="contentVisible = false">取 消</el-button>
        <el-button type="primary" @click="addContent('contentForm')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog width="25%" title="添加分部内容" :visible.sync="sectionVisible">
      <el-form :model="sectionForm" :rules="sectionRules" ref="sectionForm">
        <el-form-item label="分部内容标题" :label-width="formLabelWidth" prop="title">
          <el-input v-model="sectionForm.title"></el-input>
        </el-form-item>
        <el-form-item label="分部分数" :label-width="formLabelWidth" prop="score">
          <el-input v-model="sectionForm.score"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="sectionVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSection('sectionForm')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog width="25%" title="添加分项内容" :visible.sync="itemVisible">
      <el-form :model="sectionForm" :rules="sectionRules" ref="sectionForm">
        <el-form-item label="分项内容标题" :label-width="formLabelWidth" prop="title">
          <el-input v-model="sectionForm.title"></el-input>
        </el-form-item>
        <el-form-item label="分项内容" :label-width="formLabelWidth" prop="title">
          <el-input v-model="sectionForm.title"></el-input>
        </el-form-item>
        <el-form-item label="分项分数" :label-width="formLabelWidth" prop="score">
          <el-input v-model="sectionForm.score"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="itemVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSection('sectionForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contentIndex: '',
      sectionIndex: '',
      formLabelWidth: '110px',
      EvaluationForm: {
        title: '',
        contentList: [
          { 'title': '1级标题', 'weights': 0.1, 'section_list': [{ 'title': '2级标题', 'score': 50 }] }
        ]
      },
      contentVisible: false,
      contentForm: {
        title: '',
        weights: ''
      },
      contentRules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        weights: [
          { required: true, message: '请输入权重', trigger: 'blur' }
        ]
      },
      sectionVisible: false,
      sectionForm: {
        title: '',
        score: ''
      },
      sectionRules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        score: [
          { required: true, message: '请输入分数', trigger: 'blur' }
        ]
      },
      itemVisible: false,
      itemForm: {
        title: '',
        content: '',
        item_score: '',
        chooses: []
      },
      itemRules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入分数', trigger: 'blur' }
        ],
        item_score: [
          { required: true, message: '请输入分数', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    addContent(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.EvaluationForm.contentList.push(this.contentForm)
          this.contentVisible = false
          this.contentForm = {
            title: '',
            weights: ''
          }
        } else {
          return false
        }
      })
    },
    addSection(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.EvaluationForm.contentList[this.contentIndex].section_list.push(this.sectionForm)
          this.sectionVisible = false
          this.sectionForm = {
            title: '',
            score: ''
          }
        } else {
          return false
        }
      })
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

<style lang="scss" scoped>
.add-evaluation {
    .el-row {
        padding: 10px 30px;
    }
}

</style>

