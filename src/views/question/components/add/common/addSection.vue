<template>
  <span>
    <!-- <el-button style="float: right; padding: 3px 0" type="text" @click="open()">添加分部内容</el-button> -->
    <el-dialog width="40%" :title="dialogTitle" :close-on-click-modal="false" :visible.sync="sectionVisible" @close="closeDialog()">
      <el-form ref="sectionForm" :model="sectionForm" :rules="sectionRules">
        <el-form-item required>
          <el-col :span="16">
            <el-form-item label="分部内容标题" prop="title">
              <el-input v-model="sectionForm.title" />
            </el-form-item>
          </el-col>
          <el-col class="line" :span="1"></el-col>
          <el-col :span="7" :offset="1">
            <el-form-item label="分数" prop="score">
              <el-input v-model="sectionForm.score" />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item v-for="(opinion, index) in sectionForm.opinion_list" :key="index" required>
          <el-col :span="6">
            <el-form-item label="分部内容评语" :prop="`opinion_list[${index}].title`" :rules="{ required: true, message: '请输入评语内容', trigger: 'blur' }">
              <el-input v-model="opinion.title" />
            </el-form-item>
          </el-col>
          <el-col class="line" :span="1"></el-col>
          <el-col :span="3" :offset="1">
            <el-form-item label="≥95" :prop="`opinion_list[${index}].grade1`" :rules="{ required: true, message: '等级内容为空', trigger: 'blur' }">
              <el-input v-model="opinion.grade1" />
            </el-form-item>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-form-item label="95>p≥80" :prop="`opinion_list[${index}].grade2`">
              <el-input v-model="opinion.grade2" />
            </el-form-item>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-form-item label="80>p≥70" :prop="`opinion_list[${index}].grade3`" :rules="{ required: true, message: '等级内容为空', trigger: 'blur' }">
              <el-input v-model="opinion.grade3" />
            </el-form-item>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-form-item label="<70" :prop="`opinion_list[${index}].grade4`" :rules="{ required: true, message: '等级内容为空', trigger: 'blur' }">
              <el-input v-model="opinion.grade4" />
            </el-form-item>
          </el-col>
          <el-col :span="2" v-show="index > 0">
            <el-button class="del-opinion-btn" type="danger" size="mini" icon="el-icon-delete" circle @click="delOpinion(opinion)"></el-button>
          </el-col>
        </el-form-item>
      </el-form>
      <el-button type="primary" size="mini" icon="el-icon-circle-plus" @click="addOpinion()">添加</el-button>
      <div slot="footer" class="dialog-footer">
        <el-button @click="sectionVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSection('sectionForm')">确 定</el-button>
      </div>
    </el-dialog>
  </span>
</template>

<script>
  export default {
    name: "addSection",
    data() {
      return {
        dialogTitle: '添加分部内容',
        sectionVisible: false,
        sectionForm: {
          title: '',
          score: '',
          item_list: [],
          opinion_list: [{
            title: '',
            grade1: '',
            grade2: '',
            grade3: '',
            grade4: ''
          }]
        },
        sectionRules: {
          title: [{
            required: true,
            message: '请输入标题',
            trigger: 'blur'
          }],
          score: [{
            required: true,
            message: '请输入分数',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      open() {
        this.dialogTitle = '添加分部内容'
        this.sectionVisible = true
      },
      edit(data) {
        if (this.$refs['sectionForm']){
          this.$refs['sectionForm'].resetFields();
        }
        this.dialogTitle = '编辑分部内容'
        this.sectionVisible = true
        let editData = JSON.parse(JSON.stringify(data));
        this.sectionForm = editData
      },
      closeDialog(){
        this.sectionForm = {
          title: '',
          score: '',
          item_list: [],
          opinion_list: [{
            title: '',
            grade1: '',
            grade2: '',
            grade3: '',
            grade4: ''
          }]
        }
      },

      addSection(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.dialogTitle === '添加分部内容'){
              this.$emit('addSection', this.sectionForm, 1)
            }else{
              this.$emit('addSection', this.sectionForm, 0)
            }
            this.sectionVisible = false
            this.sectionForm = {
              title: '',
              score: '',
              item_list: [],
              opinion_list: [{
                title: '',
                grade1: '',
                grade2: '',
                grade3: '',
                grade4: ''
              }]
            }

          } else {
            return false
          }
        })
      },

      addOpinion(){
        this.sectionForm.opinion_list.push({ title: '', grade1: '', grade2: '', grade3: '', grade4: ''})
      },

      delOpinion(item){
        var index = this.sectionForm.opinion_list.indexOf(item)
        if (index !== -1) {
          this.sectionForm.opinion_list.splice(index, 1)
        }
      }
    }
  }
</script>

<style scoped>
  .del-opinion-btn {
    margin-top: 47px;
    margin-left: 10px;
  }
</style>
