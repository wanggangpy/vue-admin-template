<template>
  <div class="add-Question">
    <el-row>
      <el-form ref="titleForm" :rules="questionTitleRules" :model="QuestionForm">
        <el-form-item prop="title">
          <el-input v-model="QuestionForm.title" placeholder="问卷标题" />
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <div class="block">
        <span class="demonstration">问卷调研时间：</span>
        <el-date-picker
          v-model="surveyTime"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </div>
    </el-row>
    <el-row v-for="(content,cindex) in QuestionForm.content" :key="cindex">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>{{ content.title }}</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="sectionVisible = true, contentIndex=cindex">添加</el-button>
        </div>
        <div class="text item">
          <el-tabs tab-position="left" v-model="activeName" @tab-click="handleClick" style="min-height: 200px;">
            <el-tab-pane v-for="(section, sindex) in content.section_list" :key="sindex" :name="'section'+sindex">
              <span slot="label" style="z-index: 5000;">{{ section.title }} <i class="el-icon-edit" v-show="'section'+sindex === activeName" @click="editSection(section, cindex, sindex)"></i> </span>
              <div v-for="(item, iindex) in section.item_list" :key="iindex" class="item-box">
                <p>{{ iindex + 1 }}，({{ item.title }})，{{ item.content }}</p>
                <p v-for="(choose, index) in item.chooses" :key="index">{{ choose.title }}（{{ choose.choose_score }}分）</p>
              </div>
              <el-button class="add-item-btn" icon="el-icon-plus" circle @click="itemVisible = true, sectionIndex=sindex, contentIndex=cindex" />
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-card>
    </el-row>

    <el-row>
      <el-button type="primary" @click="contentVisible = true">添加评估内容</el-button>
      <el-button type="primary" @click="saveQuestion">保存问卷</el-button>
      <el-button type="success" @click="$router.push({path: '/QuestionManage/list'})">返回</el-button>
    </el-row>
    <el-dialog width="25%" title="添加评估内容" :visible.sync="contentVisible">
      <el-form ref="contentForm" :model="contentForm" :rules="contentRules">
        <el-form-item label="评估内容标题" :label-width="formLabelWidth" prop="title">
          <el-input v-model="contentForm.title" />
        </el-form-item>
        <el-form-item label="评估内容权重" :label-width="formLabelWidth" prop="weights">
          <el-input v-model="contentForm.weights" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="contentVisible = false">取 消</el-button>
        <el-button type="primary" @click="addContent('contentForm')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog width="25%" title="添加分部内容" :visible.sync="sectionVisible">
      <el-form ref="sectionForm" :model="sectionForm" :rules="sectionRules">
        <el-form-item label="分部内容标题" :label-width="formLabelWidth" prop="title">
          <el-input v-model="sectionForm.title" />
        </el-form-item>
        <el-form-item label="分部分数" :label-width="formLabelWidth" prop="score">
          <el-input v-model="sectionForm.score" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="sectionVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSection('sectionForm')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog width="40%" title="添加分项内容" :visible.sync="itemVisible">
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
  </div>
</template>

<script>
import * as api from '@/api/w'

export default {
  data() {
    return {
      surveyTime: [
        new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours(), new Date().getMinutes()),
        new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7, new Date().getHours(), new Date().getMinutes())
      ],
      contentIndex: '',
      sectionIndex: '',
      formLabelWidth: '110px',
      questionTitle: {},
      QuestionForm: {
        title: '',
        content: []
      },
      contentVisible: false,
      contentForm: {
        title: '',
        weights: '',
        section_list: []
      },
      questionTitleRules: {
        title: [
          { required: true, message: '请输入问卷标题', trigger: 'blur' }
        ] },
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
      },
      activeName:'section0'

    }
  },
  created() {
    this.fetchData()
    // this.QuestionForm = JSON.parse('{"title":"","content":[{"title":"组织管理","weights":"10","section_list":[{"title":"政府主体(40分）","score":"40","item_list":[{"title":"组织机构","content":"林业有害生物或松材线虫病指挥部机构文件","score":"5","chooses":[{"title":"有","choose_score":"5"},{"title":"无","choose_score":"0"}]},{"title":"安排部署","content":"会议、活动、（新发生的）启动应急预案","score":"10","chooses":[{"title":"有依据（文件、影像等资料，下同）","choose_score":"10"},{"title":"无依据","choose_score":"5"}]},{"title":"机构人员","content":"森防检疫机构设置与人员配备","score":"5","chooses":[{"title":"有","choose_score":"5"},{"title":"无","choose_score":"0"}]},{"title":"资金落实","content":"资金预算、资金下达文件","score":"10","chooses":[{"title":"数额≥预算","choose_score":"10"},{"title":"数额<预算","choose_score":"7"},{"title":"没有","choose_score":"0"}]},{"title":"政府检查督办","content":"是否纳入地方政府年度目标或领导责任考核；检查、督导、考核活动","score":"10","chooses":[{"title":"有依据","choose_score":"10"},{"title":"无依据","choose_score":"5"}]}]},{"title":"相关部门（20分）","score":"20","item_list":[{"title":"防疫活动","content":"相关部门和涉疫单位在执法、施工、宣传等方面协调与配合","score":"20","chooses":[{"title":"协调配合","choose_score":"20"},{"title":"比较配合","choose_score":"15"},{"title":"不配合","choose_score":"10"}]}]},{"title":"主管部门（40分）","score":"40","item_list":[{"title":"森防管理","content":"林业有害生物防治、松材线虫病防治工作推进文件、会议、活动等","score":"10","chooses":[{"title":"有依据","choose_score":"10"},{"title":"无依据","choose_score":"5"}]},{"title":"检疫执法管理","content":"检疫执法管理","score":"10","chooses":[{"title":"检疫员人数≥2人","choose_score":"2"},{"title":"产地、调运检疫工作","choose_score":"3"},{"title":"办理行政或刑事案件，办理","choose_score":"5"},{"title":"未办理","choose_score":"3"}]},{"title":"疫情管理","content":"疫情普查、监测、除治等工作管理与安排","score":"10","chooses":[{"title":"得力","choose_score":"10"},{"title":"不得力","choose_score":"5"}]},{"title":"部门检查督办","content":"工作检查与督办","score":"10","chooses":[{"title":"重视","choose_score":"10"},{"title":"一般","choose_score":"7"},{"title":"不重视","choose_score":"5"}]}]}]},{"title":"防控方案","weights":"10","section_list":[{"title":"防治方案(30分）","score":"30","item_list":[{"title":"规范性","content":"符合国家、省、市有关技术要求","score":"10","chooses":[{"title":"符合","choose_score":"10"},{"title":"部分符合","choose_score":"7"},{"title":"不符合","choose_score":"5"}]},{"title":"针对性","content":"适合本地实际情况，疫情与措施相匹配","score":"10","chooses":[{"title":"针对性强","choose_score":"10"},{"title":"一般","choose_score":"7"},{"title":"不强","choose_score":"5"}]},{"title":"专业性","content":"经同行专家评审","score":"10","chooses":[{"title":"有评审","choose_score":"10"},{"title":"无评审","choose_score":"5"}]}]},{"title":"作业设计（40分）","score":"40","item_list":[{"title":"一致性","content":"与防治方案、技术标准比较","score":"10","chooses":[{"title":"一致","choose_score":"10"},{"title":"部分一致","choose_score":"7"},{"title":"不一致","choose_score":"5"}]},{"title":"落地程度","content":"面积范围、数量、质量、标准、流程、时间进度等要求具体","score":"20","chooses":[{"title":"可操作性强","choose_score":"20"},{"title":"一般","choose_score":"15"},{"title":"操作性不强","choose_score":"10"}]},{"title":"技术性","content":"符合专业技术","score":"10","chooses":[{"title":"符合","choose_score":"10"},{"title":"部分符合","choose_score":"7"},{"title":"不符合","choose_score":"5"}]}]},{"title":"专项档案（30分）","score":"30","item_list":[{"title":"档案管理","content":"规范、标准","score":"15","chooses":[{"title":"符合","choose_score":"15"},{"title":"欠缺","choose_score":"10"}]},{"title":"技术档案","content":"系统、全面","score":"15","chooses":[{"title":"齐全","choose_score":"15"},{"title":"欠缺","choose_score":"10"}]}]}]},{"title":"实施过程","weights":"40","section_list":[{"title":"监测普查（10分）","score":"10","item_list":[{"title":"疫情监测","content":"疫情监测","score":"5","chooses":[{"title":"动态监测（每月数据）","choose_score":"5"},{"title":"诱捕器监测","choose_score":"2"}]},{"title":"疫情普查","content":"疫情普查","score":"5","chooses":[{"title":"春普","choose_score":"2"},{"title":"秋普","choose_score":"3"}]}]},{"title":"检疫执法（15分）","score":"15","item_list":[{"title":"检疫巡查","content":"组织开展涉木企业登记、检疫巡查、抽检或复检等","score":"10","chooses":[{"title":"有依据","choose_score":"5"},{"title":"没有","choose_score":"0"}]},{"title":"检疫宣传","content":"开展检疫宣传","score":"10","chooses":[{"title":"有依据","choose_score":"10"},{"title":"没有","choose_score":"0"}]}]},{"title":"防治施工（75）","score":"75","item_list":[{"title":"施工队伍","content":"施工队伍","score":"10","chooses":[{"title":"专业队伍（通过招标或询价，提供合同）","choose_score":"10"},{"title":"半专业队伍","choose_score":"7"},{"title":"非专业队伍","choose_score":"5"}]},{"title":"疫木清理","content":"对照方案和作业设计要求逐项核查施工台账等资料","score":"25","chooses":[{"title":"疫木、枝桠和伐桩处理规范及时","choose_score":"25"},{"title":"不规范及时","choose_score":"15"}]},{"title":"天牛防治","content":"对照方案和作业设计要求逐项核查施工台账等资料","score":"20","chooses":[{"title":"施工规范及时","choose_score":"20"},{"title":"不规范及时","choose_score":"10"}]},{"title":"施工安全","content":"人员、疫木、环境、火灾等安全管理","score":"10","chooses":[{"title":"无安全事故","choose_score":"10"},{"title":"每发生1起安全事故","choose_score":"5"}]},{"title":"施工监理","content":"监理报告","score":"10","chooses":[{"title":"资料齐全","choose_score":"10"},{"title":"缺失","choose_score":"5"}]}]}]},{"title":"防控效果","weights":"40","section_list":[{"title":"疫情分布（60分）","score":"60","item_list":[{"title":"发生面积","content":"发生面积（秋普）","score":"30","chooses":[{"title":"面积减少≥任务目标","choose_score":"30"},{"title":"面积不变或变幅小于目标","choose_score":"15"},{"title":"面积扩大或位移变化大","choose_score":"5"}]},{"title":"疫点","content":"疫点","score":"20","chooses":[{"title":"疫点减少","choose_score":"20"},{"title":"不变","choose_score":"15"},{"title":"增加","choose_score":"10"}]},{"title":"疫情小班","content":"疫情小班","score":"10","chooses":[{"title":"疫情小班减少","choose_score":"10"},{"title":"不变","choose_score":"7"},{"title":"增加","choose_score":"5"}]}]},{"title":"病枯死松树（40分）","score":"40","item_list":[{"title":"数量（株）","content":"秋普病枯死松树数量","score":"20","chooses":[{"title":"下降","choose_score":"20"},{"title":"不变","choose_score":"15"},{"title":"上升","choose_score":"10"}]}]}]}]}')
  },
  methods: {
    fetchData() {
      const id = this.$route.query.id
      if (id) {
        api.getDetailQuestionData(id).then(response => {
          if (response.data.length !== 0) {
            console.log(response.data.surveyTime)
            this.surveyTime = [new Date(response.data.start_at), new Date(response.data.end_at)]
            this.QuestionForm = response.data
          }
        })
      }
    },
    saveQuestion() {
      this.$refs.titleForm.validate((valid) => {
        if (valid) {
          const data = this.QuestionForm
          data.surveyTime = this.surveyTime
          console.log(data.surveyTime)
          api.addQuestion(data).then(response => {
            this.$router.push('/questionManage/list')
            this.$message.success('保存成功')
          })
        } else {
          return false
        }
      })
    },
    handleClick(tab, event) {
      this.activeName = tab.name
    },
    addContent(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.QuestionForm.content.push(this.contentForm)
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
          console.log(this.QuestionForm.content[this.contentIndex].section_list)
          // this.QuestionForm.content[this.contentIndex].section_list.push(this.sectionForm)
          // this.sectionVisible = false
          // this.sectionForm = {
          //   title: '',
          //   score: '',
          //   item_list: []
          // }
        } else {
          return false
        }
      })
    },
    editSection(section, cindex, sindex){
      this.contentIndex = cindex
      this.sectionIndex = sindex
      this.sectionVisible = true
      this.sectionForm = section
    },
    addItem(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.QuestionForm.content[this.contentIndex].section_list[this.sectionIndex].item_list.push(this.itemForm)
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
    },
    delIChoose(item) {
      const index = this.itemForm.chooses.indexOf(item)
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
.add-Question {
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
