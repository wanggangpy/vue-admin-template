<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="card-title">测评结果</span>
        <el-button v-show="delResultList.length" type="danger" size="mini" style="float: right;" @click="delQuestionResult()">删除</el-button>
      </div>
      <div class="chart-box">
        <el-select size="mini" @change="getEchartData" class="chart-select" v-model="value" placeholder="请选择">
          <el-option v-for="item in options" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
        <div ref="chart" style="width:100%;height:376px"></div>
      </div>
      <el-divider></el-divider>
      <el-table v-loading="listLoading" :data="tableData" element-loading-text="Loading" style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="name" label="测评单位" />
        <el-table-column prop="total_score" label="总分" />
        <el-table-column prop="created_at" label="日期" />
        <el-table-column align="center" prop="created_at" label="操作" width="250">
          <template slot-scope="scope">
            <el-button type="success" icon="el-icon-video-play" size="mini" @click="$router.push({path:'/question/result', query: { uid: scope.row.uid, title: scope.row.title}})">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

  </div>
</template>

<script>
  import * as api from '@/api/w'
  import Echarts from 'echarts'

  export default {
    data() {
      return {
        tableData: [],
        uploadDialogVisible: false,
        listLoading: false,
        dialogWidth: '30%',
        delResultList: [],
        options: [],
        value: '总分'
      }
    },
    created() {

    },
    mounted() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        api.getQuestionResult().then(response => {
          this.tableData = response.data
          this.listLoading = false

          let content_title_list = ['总分']
          response.data.forEach(item => {
            item.content_score_list.forEach(content => {
              let title = content.title
              if (content_title_list.indexOf(title) === -1) {
                content_title_list.push(title)
              }
            })
          })
          this.options = content_title_list
          this.getEchartData('总分')
        })
      },

      getEchartData(key){
        let res = {}
        if (key === '总分'){
          this.tableData.forEach(item => {
            res[item.name] = item.total_score
          })
        }else{
          this.tableData.forEach(item => {
            const name = item.name
            item.content_score_list.forEach(content => {
              if (content.title === key){
                res[name] = content.score
              }
            })
          })
        }
        this.initEchart(`测评表${key}统计图`, res)
      },

      initEchart(titleText, data) {
        const chart = this.$refs.chart
        if (chart) {
          const myChart = Echarts.init(chart)
          const option = {
            title: {
              left: 'center',
              text: titleText,
            },
            color: ['#3398DB'],
            tooltip: {
              trigger: 'axis',
              axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [{
              type: 'category',
              data: Object.keys(data),
              axisTick: {
                alignWithLabel: true
              }
            }],
            yAxis: [{
              type: 'value'
            }],
            series: [{
              name: '',
              type: 'bar',
              barWidth: '60%',
              data: Object.values(data)
            }]
          };
          myChart.setOption(option)
          window.addEventListener("resize", function() {
            myChart.resize()
          })
        }
        this.$on('hook:destroyed', () => {
          window.removeEventListener("resize", function() {
            myChart.resize();
          });
        })
      },

      handleSelectionChange(val) {
        this.delResultList = val.map(item => {
          return item.id
        })
      },

      delQuestionResult() {
        let delData = {
          list_id: JSON.stringify(this.delResultList)
        }
        this.$confirm('此操作将删除选择调研结果, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.delQuestionResult(delData).then(response => {
            if (response.code === 200) {
              this.fetchData()
              this.$message.success('删除成功！')
            } else {
              this.$message.error('删除失败, 请重试！')
            }
          })
        }).catch(() => {});
      }

    }
  }
</script>

<style lang="scss" scoped>
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

  .chart-box {
    position: relative;

    .chart-select {
      position: absolute;
      right: 0px;
      z-index: 500;
    }
  }
</style>
