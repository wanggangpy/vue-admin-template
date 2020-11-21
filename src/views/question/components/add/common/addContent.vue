<template>
  <div class="add-content">
    <el-button type="primary" @click="contentVisible = true" icon="el-icon-circle-plus" size="mini">添加评估内容</el-button>
    <el-dialog width="35%" title="添加评估内容" :visible.sync="contentVisible">
      <el-form class="content-form" ref="contentForm" label-position="top" :model="contentForm" :rules="contentRules">
        <el-form-item required>
          <el-col :span="16">
            <el-form-item label="评估内容标题" prop="title">
              <el-input v-model="contentForm.title" />
            </el-form-item>
          </el-col>
          <el-col class="line" :span="1"></el-col>
          <el-col :span="7" :offset="1">
            <el-form-item label="权重" prop="weights">
              <el-input v-model="contentForm.weights">
				  <i slot="suffix">%</i>
			  </el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item v-for="(opinion, index) in contentForm.opinion_list" :key="index" required>
          <el-col :span="6">
            <el-form-item label="评估内容评语" :prop="`opinion_list[${index}].title`" :rules="{ required: true, message: '请输入评语内容', trigger: 'blur' }">
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
        <el-button @click="contentVisible = false">取 消</el-button>
        <el-button type="primary" @click="addContent('contentForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    name: 'AddContent',
    data(){
      return {
        contentVisible: false,
        contentForm: {
          title: '',
          weights: '',
          section_list: [],
          opinion_list: [
            { title: '', grade1: '', grade2: '', grade3: '', grade4: ''}
          ]
        },
        questionTitleRules: {
          title: [{
            required: true,
            message: '请输入问卷标题',
            trigger: 'blur'
          }]
        },
        contentRules: {
          title: [{
            required: true,
            message: '请输入标题',
            trigger: 'blur'
          }],
          weights: [{
            required: true,
            message: '请输入权重',
            trigger: 'blur'
          }]
        },
      }
    },

    methods: {
      addContent(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.contentForm)
            this.$emit('addContent', this.contentForm)
            this.contentVisible = false
            this.contentForm = {
              title: '',
              weights: '',
              section_list: [],
              opinion_list: [
                { title: '', grade1: '', grade2: '', grade3: '', grade4: ''},
                { title: '', grade1: '', grade2: '', grade3: '', grade4: ''},
              ]
            }
          } else {
            return false
          }
        })
      },
      addOpinion(){
        this.contentForm.opinion_list.push({ title: '', grade1: '', grade2: '', grade3: '', grade4: ''})
      },

      delOpinion(item){
        var index = this.contentForm.opinion_list.indexOf(item)
        if (index !== -1) {
          this.contentForm.opinion_list.splice(index, 1)
        }
      }
    }

  }
</script>

<style scoped>
  .add-content {
    display: inline-block;
    float: right;
  }

  .del-opinion-btn {
    margin-top: 47px;
    margin-left: 10px;
  }
</style>
