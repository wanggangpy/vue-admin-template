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
          <el-tabs tab-position="left" style="min-height: 200px;">
            <el-tab-pane :label="section.title" v-for="(section, sindex) in content.section_list" :key="sindex">
              <div class="item-box" v-for="(item, iindex) in section.item_list" :key="iindex">
                <p>{{ iindex + 1 }}，({{ item.title }})，{{item.content}}</p>
                <p v-for="(choose, index) in item.chooses" :key="index">{{ choose.title }}（{{ choose.choose_score }}分）</p>
              </div>
              <el-button class="add-item-btn" icon="el-icon-plus" circle @click="itemVisible = true, sectionIndex=sindex, contentIndex=cindex"></el-button>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-card>
    </el-row>

    <el-row>
      <el-button type="primary" @click="contentVisible = true">添加</el-button>
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
      <el-form :model="itemForm" :rules="itemRules" ref="itemForm">
        <el-form-item label="分项内容标题" :label-width="formLabelWidth" prop="title">
          <el-input v-model="itemForm.title"></el-input>
        </el-form-item>
        <el-form-item label="分项内容" :label-width="formLabelWidth" prop="title">
          <el-input v-model="itemForm.content"></el-input>
        </el-form-item>
        <el-form-item label="分项分数" :label-width="formLabelWidth" prop="score">
          <el-input v-model="itemForm.score"></el-input>
        </el-form-item>
        <el-form-item :label="`选项`+cindex" :label-width="formLabelWidth" v-for="(choose, cindex) in itemForm.chooses" :key="cindex">
          <el-col :span="12">
            <el-input v-model="choose.title"></el-input>
          </el-col>
          <el-col class="line" :span="3" style="text-align:center">分数</el-col>
          <el-col :span="5">
            <el-input v-model="choose.choose_score"></el-input>
          </el-col>
           <el-col class="line" :span="4" style="text-align:center">
             <span @click.prevent="delIChoose(cindex)">
               删除
             </span>
           </el-col>
        </el-form-item>
      </el-form>
      <el-button type="primary" style="margin-left:110px" size="mini" @click="addChoose">添加选项</el-button>
      <div slot="footer" class="dialog-footer">
        <el-button @click="itemVisible = false">取 消</el-button>
        <el-button type="primary" @click="addItem('itemForm')">确 定</el-button>
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
        contentList: []
      },
      contentVisible: false,
      contentForm: {
        title: '',
        weights: '',
        section_list: []
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
        score: '',
        item_list: []
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
        score: '',
        chooses: []
      },
      itemRules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入分数', trigger: 'blur' }
        ],
        score: [
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
            weights: '',
            section_list: []
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
            score: '',
            item_list: []
          }
          console.log(this.EvaluationForm)
        } else {
          return false
        }
      })
    },
    addItem(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.EvaluationForm.contentList[this.contentIndex].section_list[this.sectionIndex].item_list.push(this.itemForm)
          this.itemVisible = false
          this.itemForm = {
            title: '',
            content: '',
            score: '',
            chooses: []
          }
        } else {
          return false
        }
      })
    },
    addChoose() {
      this.itemForm.chooses.push({
        title: '',
        choose_score: ''
      })
      console.log(this.EvaluationForm)
    },
    delIChoose(item) {
      var index = this.itemForm.chooses.indexOf(item)
      this.itemForm.chooses.splice(index, 1)
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

    .item-box {
      padding-bottom: 10px;
      border-bottom: 1px #e6dede dashed;
    }
    .add-item-btn {
      margin-top: 10px;
    }
}

</style>

