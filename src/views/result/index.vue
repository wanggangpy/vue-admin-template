<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="card-title">定性</span>
      </div>
      <el-table
        :data="tableData" style="width: 100%" border
        :header-row-style="{height:'2px'}"
        :cell-style="{padding:'2px'}"
        :header-cell-style="{padding:'2px'}"
        :row-style="{height:'2px'}"
        :span-method="objectSpanMethod"
      >
        <el-table-column prop="id" label="序号" width="80" header-align="center"></el-table-column>
        <el-table-column prop="content" label="评估内容" width="160" header-align="center"></el-table-column>
        <el-table-column prop="item" label="分项" width="160" header-align="center">
          <template slot-scope="scope">
             <div v-html="scope.row.item"></div>
          </template>
        </el-table-column>
        <el-table-column prop="evaluate" label="评价参考用语" header-align="center"></el-table-column>
        <el-table-column label="评估分值与等级" width="180" header-align="center">
          <el-table-column prop="" label="≥95" width="80" header-align="center">
            <el-table-column prop="grades_IV" label="IV" width="80" header-align="center">
              <template slot-scope="scope">
                <div v-html="scope.row.grades_IV"></div>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column prop="" label="95>p≥80" width="80" header-align="center">
            <el-table-column prop="grades_III" label="III" width="80" header-align="center">
              <template slot-scope="scope">
                <div v-html="scope.row.grades_III"></div>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column prop="" label="80>p≥70" width="80" header-align="center">
            <el-table-column prop="grades_II" label="II" width="80" header-align="center">
              <template slot-scope="scope">
                <div v-html="scope.row.grades_II"></div>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column prop="" label="<70" width="80" header-align="center">
            <el-table-column prop="grades_I" label="I" width="80" header-align="center">
              <template slot-scope="scope">
                <div v-html="scope.row.grades_I"></div>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="opinion" label="评估意见" header-align="center"></el-table-column>
      </el-table>
    </el-card>

  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {'id': 1, 'content': '组织管理', 'item': '<strong>评价结果</strong>', 'evaluate': '', 'grades_IV': '<strong>优秀</strong>', 'grades_III': '<strong>良好</strong>', 'grades_II': '<strong>一般</strong>', 'grades_I': '<strong>较差</strong>', 'c': ''},
        {'id': 1, 'content': '组织管理', 'item': '1.政府主体', 'evaluate': '领导*重视', 'grades_IV': '很', 'grades_III': '*', 'grades_II': '比较', 'grades_I': '不够', 'c': ''},
        {'id': 1, 'content': '组织管理', 'item': '1.政府主体', 'evaluate': '资金落实*到位', 'grades_IV': '很', 'grades_III': '*', 'grades_II': '比较', 'grades_I': '不够', 'c': ''},
        {'id': 1, 'content': '组织管理', 'item': '1.政府主体', 'evaluate': '检查督办*得力', 'grades_IV': '很', 'grades_III': '*', 'grades_II': '比较', 'grades_I': '不够', 'c': ''},
        {'id': 1, 'content': '组织管理', 'item': '2.相关部门', 'evaluate': '配合*协调', 'grades_IV': '很', 'grades_III': '*', 'grades_II': '比较', 'grades_I': '不够', 'c': ''},
        {'id': 1, 'content': '组织管理', 'item': '3.主管部门', 'evaluate': '工作*主动', 'grades_IV': '很', 'grades_III': '*', 'grades_II': '比较', 'grades_I': '不够', 'c': ''},
        {'id': 1, 'content': '组织管理', 'item': '3.主管部门', 'evaluate': '落实*具体', 'grades_IV': '很', 'grades_III': '*', 'grades_II': '比较', 'grades_I': '不够', 'c': ''},
        {'id': 1, 'content': '组织管理', 'item': '3.主管部门', 'evaluate': '推进*扎实', 'grades_IV': '很', 'grades_III': '*', 'grades_II': '比较', 'grades_I': '不够', 'c': ''},
        {'id': 2, 'content': '防治方案', 'item': '<strong>评价结果</strong>', 'evaluate': '', 'grades_IV': '<strong>优秀</strong>', 'grades_III': '<strong>良好</strong>', 'grades_II': '<strong>一般</strong>', 'grades_I': '<strong>较差</strong>', 'c': ''},
        {'id': 2, 'content': '防治方案', 'item': '1.防治方案', 'evaluate': '科学性*强', 'grades_IV': '很', 'grades_III': '*', 'grades_II': '比较', 'grades_I': '不够', 'c': ''},
        {'id': 2, 'content': '防治方案', 'item': '1.防治方案', 'evaluate': '针对性*强', 'grades_IV': '很', 'grades_III': '*', 'grades_II': '比较', 'grades_I': '不够', 'c': ''},
        {'id': 2, 'content': '防治方案', 'item': '1.防治方案', 'evaluate': '专业性*强', 'grades_IV': '很', 'grades_III': '*', 'grades_II': '比较', 'grades_I': '不够', 'c': ''},
        {'id': 2, 'content': '防治方案', 'item': '2.作业设计', 'evaluate': '*合理', 'grades_IV': '很', 'grades_III': '*', 'grades_II': '基本', 'grades_I': '不够', 'c': ''},
        {'id': 2, 'content': '防治方案', 'item': '2.作业设计', 'evaluate': '与防治方案和技术规程*一致', 'grades_IV': '很', 'grades_III': '*', 'grades_II': '基本', 'grades_I': '不够', 'c': ''},
        {'id': 2, 'content': '防治方案', 'item': '2.作业设计', 'evaluate': '操作性*强', 'grades_IV': '很', 'grades_III': '*', 'grades_II': '基本', 'grades_I': '不够', 'c': ''},
        {'id': 2, 'content': '防治方案', 'item': '3.专业档案', 'evaluate': '*完备', 'grades_IV': '很', 'grades_III': '*', 'grades_II': '比较', 'grades_I': '不够', 'c': ''},
        {'id': 2, 'content': '防治方案', 'item': '3.专业档案', 'evaluate': '*规范', 'grades_IV': '很', 'grades_III': '*', 'grades_II': '比较', 'grades_I': '不够', 'c': ''},
        {'id': 2, 'content': '防治方案', 'item': '3.专业档案', 'evaluate': '*系统', 'grades_IV': '很', 'grades_III': '*', 'grades_II': '比较', 'grades_I': '不够', 'c': ''},
        {'id': 3, 'content': '实施过程', 'item': '<strong>评价结果</strong>', 'evaluate': '', 'grades_IV': '<strong>优秀</strong>', 'grades_III': '<strong>良好</strong>', 'grades_II': '<strong>一般</strong>', 'grades_I': '<strong>较差</strong>', 'c': ''},
        {'id': 3, 'content': '实施过程', 'item': '1.动态监测', 'evaluate': '措施*扎实', 'grades_IV': '很', 'grades_III': '*', 'grades_II': '比较', 'grades_I': '不够', 'c': ''},
        {'id': 3, 'content': '实施过程', 'item': '2.天牛监测', 'evaluate': '措施*扎实', 'grades_IV': '很', 'grades_III': '*', 'grades_II': '比较', 'grades_I': '不够', 'c': ''},
        {'id': 3, 'content': '实施过程', 'item': '3.春秋普查', 'evaluate': '措施*扎实', 'grades_IV': '很', 'grades_III': '*', 'grades_II': '比较', 'grades_I': '不够', 'c': ''},
        {'id': 3, 'content': '实施过程', 'item': '4.检疫巡查', 'evaluate': '措施*扎实', 'grades_IV': '很', 'grades_III': '*', 'grades_II': '比较', 'grades_I': '不够', 'c': ''},
        {'id': 3, 'content': '实施过程', 'item': '5.检疫宣传', 'evaluate': '措施*扎实', 'grades_IV': '很', 'grades_III': '*', 'grades_II': '比较', 'grades_I': '不够', 'c': ''},
        {'id': 3, 'content': '实施过程', 'item': '6.防治施工', 'evaluate': '队伍*专业性', 'grades_IV': '很', 'grades_III': '*', 'grades_II': '比较', 'grades_I': '不够', 'c': ''},
        {'id': 3, 'content': '实施过程', 'item': '6.防治施工', 'evaluate': '操作*规范性', 'grades_IV': '很', 'grades_III': '*', 'grades_II': '比较', 'grades_I': '不够', 'c': ''},
        {'id': 3, 'content': '实施过程', 'item': '6.防治施工', 'evaluate': '措施时效性*强', 'grades_IV': '很', 'grades_III': '*', 'grades_II': '比较', 'grades_I': '不够', 'c': ''},
        {'id': 3, 'content': '实施过程', 'item': '6.防治施工', 'evaluate': '安全管理*到位', 'grades_IV': '很', 'grades_III': '*', 'grades_II': '比较', 'grades_I': '不够', 'c': ''},
        {'id': 3, 'content': '实施过程', 'item': '7.施工监理', 'evaluate': '措施*得力', 'grades_IV': '很', 'grades_III': '*', 'grades_II': '比较', 'grades_I': '不够', 'c': ''},
        {'id': 4, 'content': '防控效果', 'item': '<strong>评价结果</strong>', 'evaluate': '', 'grades_IV': '<strong>优秀</strong>', 'grades_III': '<strong>良好</strong>', 'grades_II': '<strong>一般</strong>', 'grades_I': '<strong>较差</strong>', 'c': ''},
        {'id': 4, 'content': '防控效果', 'item': '1.疫情分布', 'evaluate': '发生面积', 'grades_IV': '大幅下降', 'grades_III': '下降', 'grades_II': '变化不大', 'grades_I': '上升', 'c': ''},
        {'id': 4, 'content': '防控效果', 'item': '1.疫情分布', 'evaluate': '疫点数', 'grades_IV': '大幅减少', 'grades_III': '减少', 'grades_II': '变化不大', 'grades_I': '增加', 'c': ''},
        {'id': 4, 'content': '防控效果', 'item': '1.疫情分布', 'evaluate': '疫情小班', 'grades_IV': '大幅减少', 'grades_III': '减少', 'grades_II': '变化不大', 'grades_I': '增加', 'c': ''},
        {'id': 4, 'content': '防控效果', 'item': '2.病枯死松树', 'evaluate': '分布范围', 'grades_IV': '大幅缩小', 'grades_III': '缩小', 'grades_II': '变化不大', 'grades_I': '扩大', 'c': ''},
        {'id': 4, 'content': '防控效果', 'item': '2.病枯死松树', 'evaluate': '数量', 'grades_IV': '大幅减少', 'grades_III': '减少', 'grades_II': '变化不大', 'grades_I': '增加', 'c': ''},
        {'id': 4, 'content': '防控效果', 'item': '2.病枯死松树', 'evaluate': '密度', 'grades_IV': '大幅降低', 'grades_III': '降低', 'grades_II': '变化不大', 'grades_I': '上升', 'c': ''},
        {'id': 5, 'content': '特别评价', 'item': '组织管理', 'evaluate': '领导重视、资金落实、相关部门配合协调、主管部门主动性等特别好或差。', 'grades_IV': '', 'grades_III': '', 'grades_II': '', 'grades_I': '', 'c': ''},
        {'id': 5, 'content': '特别评价', 'item': '防控方案', 'evaluate': '特别好或差。1.重点松（树）林保护：打孔注药。2.非疫（区）点预防措施（生物、化学防治等）', 'grades_IV': '', 'grades_III': '', 'grades_II': '', 'grades_I': '', 'c': ''},
        {'id': 5, 'content': '特别评价', 'item': '实施执行', 'evaluate': '特别好或差。如：针对天气、疫情等变化，采取灵活应对措施。', 'grades_IV': '', 'grades_III': '', 'grades_II': '', 'grades_I': '', 'c': ''},
        {'id': 5, 'content': '特别评价', 'item': '防控效果', 'evaluate': '特别好或差。1.发生面积或病枯死松树数量下降比例超预期（≥30%、50%、70%前期）。2、发生面积或病枯死松树数量上升比例超预期（≥30%、50%、70%前期）。', 'grades_IV': '', 'grades_III': '', 'grades_II': '', 'grades_I': '', 'c': ''},
        {'id': 6, 'content': '整体评价', 'item': '<strong>评价结果</strong>', 'evaluate': '', 'grades_IV': '<strong>优秀</strong>', 'grades_III': '<strong>良好</strong>', 'grades_II': '<strong>一般</strong>', 'grades_I': '<strong>较差</strong>', 'c': ''},
        {'id': 6, 'content': '整体评价', 'item': '组织管理', 'evaluate': '领导重视程度、有关部门配合程度、主管部门主动程度', 'grades_IV': '很高', 'grades_III': '高', 'grades_II': '比较', 'grades_I': '不够', 'c': ''},
        {'id': 6, 'content': '整体评价', 'item': '防控方案', 'evaluate': '方案*科学、设计*合理、档案*完备', 'grades_IV': '很', 'grades_III': '*', 'grades_II': '比较', 'grades_I': '不够', 'c': ''},
        {'id': 6, 'content': '整体评价', 'item': '实施执行', 'evaluate': '队伍*专业、措施*扎实、操作*规范、安全管理*到位', 'grades_IV': '很', 'grades_III': '*', 'grades_II': '比较', 'grades_I': '不够', 'c': ''},
        {'id': 6, 'content': '整体评价', 'item': '防控效果', 'evaluate': '防控效果*好', 'grades_IV': '很', 'grades_III': '*', 'grades_II': '比较', 'grades_I': '不够', 'c': ''},
        {'id': '备注：大幅是指变幅≥30%以上，变化不大是指变幅＜10%以下', 'content': '', 'item': '', 'evaluate': '', 'grades_IV': '很', 'grades_III': '*', 'grades_II': '', 'grades_I': '', 'c': ''},
      ]
    }
  },
  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 45) {
        if (columnIndex === 0) {
          return [1, 9]
        } else {
          return [0, 0]
        }
      }


      if (['序号', '评估内容'].includes(column.label)) {
        if (row.content === '组织管理') {
          if (rowIndex === 0) {
            return {rowspan: 8, colspan: 1}
          } else {
            return {rowspan: 0, colspan: 0}
          }
        }

        if (row.content === '防治方案') {
          if ([8].includes(rowIndex)) {
            return {rowspan: 10, colspan: 1}
          } else {
            return {rowspan: 0, colspan: 0}
          }
        }

        if (row.content === '实施过程') {
          if ([18].includes(rowIndex)) {
            return {rowspan: 11, colspan: 1}
          } else {
            return {rowspan: 0, colspan: 0}
          }
        }

        if (row.content === '防控效果') {
          if ([29].includes(rowIndex)) {
            return {rowspan: 7, colspan: 1}
          } else {
            return {rowspan: 0, colspan: 0}
          }
        }

        if (row.content === '特别评价') {
          if ([36].includes(rowIndex)) {
            return {rowspan: 4, colspan: 1}
          } else {
            return {rowspan: 0, colspan: 0}
          }
        }

        if (row.content === '整体评价') {
          if ([40].includes(rowIndex)) {
            return {rowspan: 5, colspan: 1}
          } else {
            return {rowspan: 0, colspan: 0}
          }
        }

      }

      if (['分项', '评价参考用语', 'IV', 'III', 'II', 'I'].includes(column.label)) {
        if (['1.政府主体', '3.主管部门'].includes(row.item) && column.label !== '评价参考用语') {
          if ([1, 5].includes(rowIndex)) {
            return {rowspan: 3, colspan: 1}
          } else {
            return {rowspan: 0, colspan: 0}
          }
        }

        if (['1.防治方案', '2.作业设计', '3.专业档案'].includes(row.item) && column.label !== '评价参考用语') {
          if ([9, 12, 15].includes(rowIndex)) {
            return {rowspan: 3, colspan: 1}
          } else {
            return {rowspan: 0, colspan: 0}
          }
        }

        if (['6.防治施工'].includes(row.item) && column.label !== '评价参考用语') {
          if ([24].includes(rowIndex)) {
            return {rowspan: 4, colspan: 1}
          } else {
            return {rowspan: 0, colspan: 0}
          }
        }

        if (['1.疫情分布'].includes(row.item) && column.label === '分项') {
          if ([30].includes(rowIndex)) {
            return {rowspan: 3, colspan: 1}
          } else {
            return {rowspan: 0, colspan: 0}
          }
        }


        if (['2.病枯死松树'].includes(row.item) && column.label === '分项') {
          if ([33].includes(rowIndex)) {
            return {rowspan: 3, colspan: 1}
          } else {
            return {rowspan: 0, colspan: 0}
          }
        }


        if (row.evaluate === '措施*扎实' && column.label !== '分项' ) {
          if ([19].includes(rowIndex)) {
            return {rowspan: 5, colspan: 1}
          } else {
            return {rowspan: 0, colspan: 0}
          }
        }

      }

       if (column.label === '评估意见') {
         if (row.content === '组织管理') {
          if (rowIndex === 0) {
            return {rowspan: 8, colspan: 1}
          } else {
            return {rowspan: 0, colspan: 0}
          }
        }
         if (row.content === '防治方案') {
          if ([8].includes(rowIndex)) {
            return {rowspan: 10, colspan: 1}
          } else {
            return {rowspan: 0, colspan: 0}
          }
        }

        if (row.content === '实施过程') {
          if ([18].includes(rowIndex)) {
            return {rowspan: 11, colspan: 1}
          } else {
            return {rowspan: 0, colspan: 0}
          }
        }

        if (row.content === '防控效果') {
          if ([29].includes(rowIndex)) {
            return {rowspan: 7, colspan: 1}
          } else {
            return {rowspan: 0, colspan: 0}
          }
        }

         if (row.content === '特别评价') {
          if ([36].includes(rowIndex)) {
            return {rowspan: 4, colspan: 1}
          } else {
            return {rowspan: 0, colspan: 0}
          }
        }

         if (row.content === '整体评价') {
          if ([40].includes(rowIndex)) {
            return {rowspan: 5, colspan: 1}
          } else {
            return {rowspan: 0, colspan: 0}
          }
        }

       }

       if (['1.疫情分布'].includes(row.item) && column.label !== '评价参考用语' && column.label !== '分项') {
          if ([31].includes(rowIndex)) {
            return {rowspan: 2, colspan: 1}
          }
        }

      if (row.content === '特别评价') {
        if (columnIndex === 3) {
          return [1, 6]
        } else {
            return {rowspan: 0, colspan: 0}
        }
      }

      }


  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
.card-title {
  font-weight: 500;
  font-size: 15px;
}

</style>

