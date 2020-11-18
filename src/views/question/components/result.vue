<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="card-title"><strong>{{ tableData.title }}</strong></span>
      </div>
      <el-row :gutter="24">
        <el-col :span="20" :offset="5">
          <el-table :data="tableData.data" style="width: 70%" border :header-row-style="{height:'2px'}" :cell-style="{padding:'2px'}"
            :header-cell-style="{padding:'2px'}" :row-style="{height:'2px'}" :span-method="objectSpanMethod">
            <el-table-column prop="id" label="序号" width="80" header-align="center" align="center"></el-table-column>
            <el-table-column prop="content" label="评估内容" width="160" header-align="center" align="center"></el-table-column>
            <el-table-column prop="item" label="分项" width="200" header-align="center" align="center">
              <template slot-scope="scope">
                <div v-html="scope.row.item"></div>
              </template>
            </el-table-column>
            <el-table-column prop="opinion" label="评估意见" header-align="center" align="center"></el-table-column>
          </el-table>
        </el-col>
      </el-row>

    </el-card>

  </div>
</template>

<script>
  import {
    getUserQuestionResult
  } from '@/api/w'
  export default {
    data() {
      return {
        tableData: {
          "title": "松材线虫病防控绩效评估综合评价表（定性）",
          "data": [{
            "id": 1,
            "content": "组织管理",
            "item": "1,政府主题",
            "opinion": '领导很重视\n资金落实很到位\n检查督办很得力\n配合很协调\n工作很主动\n落实很具体\n推进很扎实'
          }, {
            "id": 1,
            "content": "组织管理",
            "item": "2, 相关部门",
            "opinion": ''
          }, {
            "id": 1,
            "content": "组织管理",
            "item": "3, 主管部门",
            "opinion": ''
          },{
            "id": 2,
            "content": "防治方案",
            "item": "1,防止方案",
            "opinion": '科学性很强\n针对性很强\n专业性很强\n很合理\n与防治方案和技术规程非常一致\n操作性很强\n很完备\n很规范\n很系统'
          }, {
            "id": 2,
            "content": "防治方案",
            "item": "2, 作业设计",
            "opinion": ''
          }, {
            "id": 2,
            "content": "防治方案",
            "item": "3, 专业档案",
            "opinion": ''
          },{
            "id": 3,
            "content": "实施过程",
            "item": "1, 动态监测",
            "opinion": '措施很扎实'
          }, {
            "id": 3,
            "content": "实施过程",
            "item": "2, 天牛监测",
            "opinion": ''
          }, {
            "id": 3,
            "content": "实施过程",
            "item": "3, 春秋普查",
            "opinion": ''
          }, {
            "id": 3,
            "content": "实施过程",
            "item": "4, 检疫巡查",
            "opinion": ''
          }, {
            "id": 3,
            "content": "实施过程",
            "item": "5, 检疫宣传",
            "opinion": ''
          }, {
            "id": 3,
            "content": "实施过程",
            "item": "6, 防治施工",
            "opinion": ''
          }, {
            "id": 3,
            "content": "实施过程",
            "item": "7, 施工监理",
            "opinion": ''
          }, {
            "id": 4,
            "content": "防控效果",
            "item": "1, 疫情分布",
            "opinion": '发生面积下降\n疫点数大幅减少\n疫情小班大幅减少\n分布范围大幅缩小\n数量大幅减少\n密度大幅降低'
          }, {
            "id": 4,
            "content": "防控效果",
            "item": "2, 病枯死松树",
            "opinion": ''
          },, {
            "id": "总计（95）",
            "content": "",
            "item": "",
            "opinion": ''
          }]
        },
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        getUserQuestionResult(this.$route.query.uid, this.$route.query.title).then(response => {
          // this.tableData = response.data
        })
      },

      objectSpanMethod({
        row,
        column,
        rowIndex,
        columnIndex
      }) {
        if (rowIndex === 45) {
          if (columnIndex === 0) {
            return [1, 9]
          } else {
            return [0, 0]
          }
        }


        if (rowIndex === 15) {
          if (columnIndex === 0) {
            return [1, 9]
          } else {
            return [0, 0]
          }
        }

        if (['序号', '评估内容'].includes(column.label)) {
          if (row.content === '组织管理') {
            if (rowIndex === 0) {
              return {
                rowspan: 3,
                colspan: 1
              }
            } else {
              return {
                rowspan: 0,
                colspan: 0
              }
            }
          }

          if (row.content === '防治方案') {
            if ([3].includes(rowIndex)) {
              return {
                rowspan: 3,
                colspan: 1
              }
            } else {
              return {
                rowspan: 0,
                colspan: 0
              }
            }
          }

          if (row.content === '实施过程') {
            if ([6].includes(rowIndex)) {
              return {
                rowspan: 7,
                colspan: 1
              }
            } else {
              return {
                rowspan: 0,
                colspan: 0
              }
            }
          }

          if (row.content === '防控效果') {
            if ([13].includes(rowIndex)) {
              return {
                rowspan: 2,
                colspan: 1
              }
            } else {
              return {
                rowspan: 0,
                colspan: 0
              }
            }
          }



          // if (row.content === '特别评价') {
          //   if ([36].includes(rowIndex)) {
          //     return {rowspan: 4, colspan: 1}
          //   } else {
          //     return {rowspan: 0, colspan: 0}
          //   }
          // }
          //
          // if (row.content === '整体评价') {
          //   if ([40].includes(rowIndex)) {
          //     return {rowspan: 5, colspan: 1}
          //   } else {
          //     return {rowspan: 0, colspan: 0}
          //   }
          // }

        }



        if (column.label === '评估意见') {
          if (row.content === '组织管理') {
            if (rowIndex === 0) {
              return {
                rowspan: 3,
                colspan: 1
              }
            } else {
              return {
                rowspan: 0,
                colspan: 0
              }
            }
          }

          if (row.content === '防治方案') {
            if ([3].includes(rowIndex)) {
              return {
                rowspan: 3,
                colspan: 1
              }
            } else {
              return {
                rowspan: 0,
                colspan: 0
              }
            }
          }

          if (row.content === '实施过程') {
            if ([6].includes(rowIndex)) {
              return {
                rowspan: 7,
                colspan: 1
              }
            } else {
              return {
                rowspan: 0,
                colspan: 0
              }
            }
          }

          if (row.content === '防控效果') {
            if ([13].includes(rowIndex)) {
              return {
                rowspan: 2,
                colspan: 1
              }
            } else {
              return {
                rowspan: 0,
                colspan: 0
              }
            }
          }

          if (row.content === '特别评价') {
            if ([36].includes(rowIndex)) {
              return {
                rowspan: 4,
                colspan: 1
              }
            } else {
              return {
                rowspan: 0,
                colspan: 0
              }
            }
          }

          if (row.content === '整体评价') {
            if ([40].includes(rowIndex)) {
              return {
                rowspan: 5,
                colspan: 1
              }
            } else {
              return {
                rowspan: 0,
                colspan: 0
              }
            }
          }

        }

        //  if (['1.疫情分布'].includes(row.item) && column.label !== '评价参考用语' && column.label !== '分项') {
        //     if ([31].includes(rowIndex)) {
        //       return {rowspan: 2, colspan: 1}
        //     }
        //   }
        //
        // if (row.content === '特别评价') {
        //   if (columnIndex === 3) {
        //     return [1, 6]
        //   } else {
        //       return {rowspan: 0, colspan: 0}
        //   }
        // }

      }


    }
  }
</script>

<style scoped>
  .clearfix {
    text-align: center;
  }

  .card-title {
    font-weight: 500;
    font-size: 20px;
  }

  /deep/
  .el-table .cell {
  white-space: pre-line;
  }
</style>
