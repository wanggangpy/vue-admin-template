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
						<el-table-column prop="content" label="评估内容" width="160" header-align="center" align="center">
						</el-table-column>
						<el-table-column prop="item" label="分项" width="200" header-align="center" align="center">
							<template slot-scope="scope">
								<div v-html="scope.row.item"></div>
							</template>
						</el-table-column>
						<el-table-column prop="opinion" label="评估意见" header-align="center" align="center">
							<template slot-scope="scope">
								<el-input v-if="scope.row.content==='特别评价' && hasFillEvaluation()" type="textarea" :autosize="{ minRows: 4, maxRows: 4}"
								 placeholder="请输入特别评价" v-model="scope.row.opinion">
								</el-input>
								<span v-else>{{scope.row.opinion}}</span>
							</template>
						</el-table-column>
						<el-table-column prop="compute_weights_score" label="分项总分" header-align="center" align="center" width="100"></el-table-column>
					</el-table>
				</el-col>

				<el-col :span="20" :offset="5" style="margin-top: 20px;">
					<el-button type="success" v-show="hasFillEvaluation()" @click="submit()" style="width: 70%;">保存</el-button>
				</el-col>

			</el-row>

		</el-card>

	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import {
		getUserQuestionResult,
		updateQuestionResult
	} from '@/api/w'
	export default {
		computed: {
			...mapGetters([
				'roles'
			])
		},
		data() {
			return {
				tableData: {}
			}
		},
		created() {
			this.fetchData()
		},
		methods: {
			fetchData() {
				getUserQuestionResult(this.$route.query.uid, this.$route.query.title).then(response => {
					this.tableData = response.data
					let tableTotalScore = this.tableData.tableTotalScore
					this.tableData.data.push({
						"id": `总计（${tableTotalScore}）`,
						"content": "",
						"item": "",
						"opinion": ''
					})
				})
			},

			submit() {
				let qid = this.tableData.id
				this.tableData.data.pop()
				let sendData = {
					result: this.tableData.data
				}
				updateQuestionResult(qid, sendData).then(response => {
					if (response.code === 200) {
						this.$message.success('修改成功')
					}
				})
			},

			hasFillEvaluation() {
				if (this.tableData.end_at > Date.parse(new Date()) && this.roles.indexOf('expert') !== -1) {
					return true
				}
				return false
			},

			objectSpanMethod({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				let contentList = this.tableData.data.map(item => {
					return item.content
				})

				if (rowIndex === 45) {
					if (columnIndex === 0) {
						return [1, 9]
					} else {
						return [0, 0]
					}
				}

				if (rowIndex === contentList.length - 1) {
					if (columnIndex === 0) {
						return [1, 9]
					} else {
						return [0, 0]
					}
				}

				if (['序号', '评估内容'].includes(column.label)) {
					if (row.content === '组织管理') {
						if ([contentList.indexOf('组织管理')].includes(rowIndex)) {
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

					if (row.content === '防控方案') {
						if ([contentList.indexOf('防控方案')].includes(rowIndex)) {
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

					if (row.content === '档案管理') {
						if ([contentList.indexOf('档案管理')].includes(rowIndex)) {
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

					if (row.content === '实施过程') {
						if ([contentList.indexOf('实施过程')].includes(rowIndex)) {
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

					if (row.content === '防控效果') {
						if ([contentList.indexOf('防控效果')].includes(rowIndex)) {
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
						if ([contentList.indexOf('特别评价')].includes(rowIndex)) {
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

					if (row.content === '整体评价') {
						if ([contentList.indexOf('整体评价')].includes(rowIndex)) {
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


				if (column.label === '评估意见' || column.label === '分项总分') {
					if (row.content === '组织管理') {
						if ([contentList.indexOf('组织管理')].includes(rowIndex)) {
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

					if (row.content === '防控方案') {
						if ([contentList.indexOf('防控方案')].includes(rowIndex)) {
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

					if (row.content === '档案管理') {
						if ([contentList.indexOf('档案管理')].includes(rowIndex)) {
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

					if (row.content === '实施过程') {
						if ([contentList.indexOf('实施过程')].includes(rowIndex)) {
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

					if (row.content === '防控效果') {
						if ([contentList.indexOf('防控效果')].includes(rowIndex)) {
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
						if ([contentList.indexOf('特别评价')].includes(rowIndex)) {
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

					if (row.content === '整体评价') {
						if ([contentList.indexOf('整体评价')].includes(rowIndex)) {
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

	/deep/ .el-table .cell {
		white-space: pre-line;
	}
</style>
