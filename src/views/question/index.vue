<template>
  <div class="app-container">
    <el-card class="question-card">
      <h1 class="question-title">松材线虫病防控绩效评估综合评价表</h1>
      <el-row :gutter="20">
        <el-col :span="10" :offset="7">
          <h3 style="font-size:25px">一, 组织管理</h3>
          <h5 style="font-size:20px">政府主体(40分</h5>
          <div style="margin-bottom: 40px">
            <p>1, (组织机构) 林业有害生物或松材线虫病指挥部机构文件</p>
            <el-radio v-model="radio" label="1">有 5分</el-radio>
            <el-radio v-model="radio" label="2">无 0分</el-radio>
          </div>

          <div style="margin-bottom: 40px">
            <p>2, (安排部署) 会议、活动、（新发生的）启动应急预案。有依据（文件、影像等资料，下同）</p>
            <el-radio v-model="radio" label="1">有依据（文件、影像等资料，下同） 10分</el-radio>
            <el-radio v-model="radio" label="2">无依据 5分</el-radio>
          </div>

          <div style="margin-bottom: 40px">
            <p>3, (机构人员) 森防检疫机构设置与人员配备</p>
            <el-radio v-model="radio" label="1">有 5分</el-radio>
            <el-radio v-model="radio" label="2">无 0分</el-radio>
          </div>

          <div style="margin-bottom: 40px">
            <p>4, (资金落实) 资金预算、资金下达文件</p>
            <el-radio v-model="radio" label="1">数额≥预算 5分</el-radio>
            <el-radio v-model="radio" label="2">数额<预算 0分</el-radio>
          </div>

          <div style="margin-bottom: 40px">
            <p>4, (政府检查督办) 是否纳入地方政府年度目标或领导责任考核；检查、督导、考核活动</p>
            <el-radio v-model="radio" label="1">有依据 5分</el-radio>
            <el-radio v-model="radio" label="2">无依据 0分</el-radio>
          </div>
        </el-col>
      </el-row>

      
    </el-card>
  </div>
</template>

<script>
// import { getList } from '@/api/table'

export default {

  data() {
    return {
      radio: ''
    }
  },
  created() {

  },
  methods: {

  }
}
</script>
<style lang="scss">
.question-card {
  .question-title {
    text-align: center;
  }
}
</style>
