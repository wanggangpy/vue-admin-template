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
        <el-table-column prop="evaluate" label="评价参考语" header-align="center"></el-table-column>
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
      ]
    }
  },
  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
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
            return {rowspan: 18, colspan: 1}
          } else {
            return {rowspan: 0, colspan: 0}
          }
        }
      }

      if (['分项', 'IV', 'III', 'II', 'I'].includes(column.label)) {
        if (['1.政府主体', '3.主管部门'].includes(row.item)) {
          if ([1, 5].includes(rowIndex)) {
            return {rowspan: 3, colspan: 1}
          } else {
            return {rowspan: 0, colspan: 0}
          }
        }

        if (['1.防治方案', '2.作业设计', '3.专业档案'].includes(row.item)) {
          if ([9, 12, 15].includes(rowIndex)) {
            return {rowspan: 3, colspan: 1}
          } else {
            return {rowspan: 0, colspan: 0}
          }
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

