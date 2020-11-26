<template>
  <el-dialog width="40%" :close-on-click-modal="false" title="添加分项内容" :visible.sync="itemVisible">
    <el-form ref="itemForm" :model="itemForm" :rules="itemRules">
      <el-form-item label="分项内容标题" :label-width="formLabelWidth" prop="title">
        <el-input v-model="itemForm.title" />
      </el-form-item>
      <el-form-item label="分项内容" :label-width="formLabelWidth" prop="title">
        <el-input v-model="itemForm.content" />
      </el-form-item>
      <el-form-item label="分项分数" :label-width="formLabelWidth" prop="score">
        <el-input v-model="itemForm.score" />
      </el-form-item>
      <el-form-item v-for="(choose, cindex) in itemForm.chooses" :key="cindex" :label="`选项`+cindex" :label-width="formLabelWidth">
        <el-col :span="12">
          <el-input v-model="choose.title" />
        </el-col>
        <el-col class="line" :span="3" style="text-align:center">分数</el-col>
        <el-col :span="5">
          <el-input v-model="choose.choose_score" />
        </el-col>
        <el-col class="line" :span="4" style="text-align:center">
          <el-link :underline="false" @click.prevent="delIChoose(cindex)">
            删除
          </el-link>
        </el-col>
      </el-form-item>
    </el-form>
    <el-button type="primary" style="margin-left:110px" size="mini" @click="addChoose">添加选项</el-button>
    <div slot="footer" class="dialog-footer">
      <el-button @click="itemVisible = false">取 消</el-button>
      <el-button type="primary" @click="addItem('itemForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: 'AddContent',
    data() {
      return {
        dialogTitle:'添加分项内容',
        formLabelWidth: '110px',
        itemVisible: false,
        itemForm: {
          title: '',
          content: '',
          score: '',
          chooses: []
        },
        itemRules: {
          title: [{
            required: true,
            message: '请输入标题',
            trigger: 'blur'
          }],
          content: [{
            required: true,
            message: '请输入分数',
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
      open(){
        this.itemForm = {
          title: '',
          content: '',
          score: '',
          chooses: []
        }
        this.dialogTitle = "添加分项内容"
        this.itemVisible = true
      },
      addItem(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.dialogTitle === '添加分项内容'){
              this.$emit('addItem', this.itemForm, 1)
            }else{
              this.$emit('addItem', this.itemForm, 0)
            }
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
      edit(data){
        if (this.$refs['itemForm']){
          this.$refs['itemForm'].resetFields();
        }
        this.dialogTitle = "编辑分项内容"
        this.itemForm = JSON.parse(JSON.stringify(data))
        this.itemVisible = true
      },
      addChoose() {
        this.itemForm.chooses.push({
          title: '',
          choose_score: ''
        })
      },
      delIChoose(item) {
        const index = this.itemForm.chooses.indexOf(item)
        this.itemForm.chooses.splice(index, 1)
      },

    }

  }
</script>

<style>
</style>
