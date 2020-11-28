<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="card-title">数据统计</span>
      </div>
      <div ref="chart" style="width:100%;height:376px"></div>
    </el-card>
  </div>
</template>

<script>
  import Echarts from 'echarts'

  export default {

    data() {
      return {
        dataList: [{
          year: '2018',
          data: [{
              label: '黄坡',
              pineForest: 60.1,
              valueList: [{
                  label: '疫点',
                  num: 11,
                  unit: '个'
                },
                {
                  label: '疫情小班',
                  num: 421,
                  unit: '个'
                },
                {
                  label: '发生面积',
                  num: 19.63,
                  unit: '万亩'
                },
                {
                  label: '死亡松树',
                  num: 54429,
                  unit: '株'
                },
                {
                  label: '资金投入',
                  num: 302,
                  unit: '万元'
                },
                {
                  label: '单位投入',
                  num: 15,
                  unit: '万元'
                },
              ]
            },

            {
              label: '新洲',
              pineForest: 10.63,
              valueList: [{
                  label: '疫点',
                  num: 3,
                  unit: '个'
                },
                {
                  label: '疫情小班',
                  num: 191,
                  unit: '个'
                },
                {
                  label: '发生面积',
                  num: 1.18,
                  unit: '万亩'
                },
                {
                  label: '死亡松树',
                  num: 2895,
                  unit: '株'
                },
                {
                  label: '资金投入',
                  num: 167,
                  unit: '万元'
                },
                {
                  label: '单位投入',
                  num: 142,
                  unit: '万元'
                }
              ]
            },

            {
              label: '江夏',
              pineForest: 7.6,
              valueList: [{
                  label: '疫点',
                  num: 10,
                  unit: '个'
                },
                {
                  label: '疫情小班',
                  num: 306,
                  unit: '个'
                },
                {
                  label: '发生面积',
                  num: 1.45,
                  unit: '万亩'
                },
                {
                  label: '死亡松树',
                  num: 45783,
                  unit: '株'
                },
                {
                  label: '资金投入',
                  num: 1800,
                  unit: '万元'
                },
                {
                  label: '单位投入',
                  num: 1241,
                  unit: '万元'
                }
              ]
            },

            {
              label: '蔡甸',
              pineForest: 3.23,
              valueList: [{
                  label: '疫点',
                  num: 6,
                  unit: '个'
                },
                {
                  label: '疫情小班',
                  num: 122,
                  unit: '个'
                },
                {
                  label: '发生面积',
                  num: 1.04,
                  unit: '万亩'
                },
                {
                  label: '死亡松树',
                  num: 27113,
                  unit: '株'
                },
                {
                  label: '资金投入',
                  num: 230,
                  unit: '万元'
                },
                {
                  label: '单位投入',
                  num: 221,
                  unit: '万元'
                }
              ]
            },

            {
              label: '东湖高新',
              pineForest: 2.73,
              valueList: [{
                  label: '疫点',
                  num: 8,
                  unit: '个'
                },
                {
                  label: '疫情小班',
                  num: 523,
                  unit: '个'
                },
                {
                  label: '发生面积',
                  num: 0.25,
                  unit: '万亩'
                },
                {
                  label: '死亡松树',
                  num: 15690,
                  unit: '株'
                },
                {
                  label: '资金投入',
                  num: 120,
                  unit: '万元'
                },
                {
                  label: '单位投入',
                  num: 480,
                  unit: '万元'
                }
              ]
            },

            {
              label: '东湖风景区',
              pineForest: 0.81,
              valueList: [{
                  label: '疫点',
                  num: 4,
                  unit: '个'
                },
                {
                  label: '疫情小班',
                  num: 21,
                  unit: '个'
                },
                {
                  label: '发生面积',
                  num: 0.31,
                  unit: '万亩'
                },
                {
                  label: '死亡松树',
                  num: 3022,
                  unit: '株'
                },
                {
                  label: '资金投入',
                  num: 482,
                  unit: '万元'
                },
                {
                  label: '单位投入',
                  num: 1555,
                  unit: '万元'
                }
              ]
            },

            {
              label: '汉南',
              pineForest: 0.64,
              valueList: [{
                  label: '疫点',
                  num: 1,
                  unit: '个'
                },
                {
                  label: '疫情小班',
                  num: 15,
                  unit: '个'
                },
                {
                  label: '发生面积',
                  num: 0.19,
                  unit: '万亩'
                },
                {
                  label: '死亡松树',
                  num: 2822,
                  unit: '株'
                },
                {
                  label: '资金投入',
                  num: 26,
                  unit: '万元'
                },
                {
                  label: '单位投入',
                  num: 137,
                  unit: '万元'
                }
              ]
            },

            {
              label: '洪山',
              pineForest: 0.47,
              valueList: [{
                  label: '疫点',
                  num: 4,
                  unit: '个'
                },
                {
                  label: '疫情小班',
                  num: 0,
                  unit: '个'
                },
                {
                  label: '发生面积',
                  num: 0.27,
                  unit: '万亩'
                },
                {
                  label: '死亡松树',
                  num: 414,
                  unit: '株'
                },
                {
                  label: '资金投入',
                  num: 281,
                  unit: '万元'
                },
                {
                  label: '单位投入',
                  num: 1041,
                  unit: '万元'
                }
              ]
            },

            {
              label: '武昌',
              pineForest: 0.22,
              valueList: [{
                  label: '疫点',
                  num: 2,
                  unit: '个'
                },
                {
                  label: '疫情小班',
                  num: 0,
                  unit: '个'
                },
                {
                  label: '发生面积',
                  num: 0.06,
                  unit: '万亩'
                },
                {
                  label: '死亡松树',
                  num: 260,
                  unit: '株'
                },
                {
                  label: '资金投入',
                  num: 0,
                  unit: '万元'
                },
                {
                  label: '单位投入',
                  num: 0,
                  unit: '万元'
                }
              ]
            },

            {
              label: '青山',
              pineForest: 0.14,
              valueList: [{
                  label: '疫点',
                  num: 1,
                  unit: '个'
                },
                {
                  label: '疫情小班',
                  num: 0,
                  unit: '个'
                },
                {
                  label: '发生面积',
                  num: 0.01,
                  unit: '万亩'
                },
                {
                  label: '死亡松树',
                  num: 70,
                  unit: '株'
                },
                {
                  label: '资金投入',
                  num: 0,
                  unit: '万元'
                },
                {
                  label: '单位投入',
                  num: 0,
                  unit: '万元'
                }
              ]
            }
          ]
        }, {
          year: '2019',
          data: [{
              label: '黄坡',
              pineForest: 60.1,
              valueList: [{
                  label: '疫点',
                  num: 12,
                  unit: '个'
                },
                {
                  label: '疫情小班',
                  num: 1405,
                  unit: '个'
                },
                {
                  label: '发生面积',
                  num: 19.78,
                  unit: '万亩'
                },
                {
                  label: '死亡松树',
                  num: 158753,
                  unit: '株'
                },
                {
                  label: '资金投入',
                  num: 1900,
                  unit: '万元'
                },
                {
                  label: '单位投入',
                  num: 96,
                  unit: '万元'
                },
              ]
            },

            {
              label: '新洲',
              pineForest: 10.63,
              valueList: [{
                  label: '疫点',
                  num: 8,
                  unit: '个'
                },
                {
                  label: '疫情小班',
                  num: 831,
                  unit: '个'
                },
                {
                  label: '发生面积',
                  num: 5.94,
                  unit: '万亩'
                },
                {
                  label: '死亡松树',
                  num: 12740,
                  unit: '株'
                },
                {
                  label: '资金投入',
                  num: 437,
                  unit: '万元'
                },
                {
                  label: '单位投入',
                  num: 74,
                  unit: '万元'
                }
              ]
            },

            {
              label: '江夏',
              pineForest: 7.6,
              valueList: [{
                  label: '疫点',
                  num: 14,
                  unit: '个'
                },
                {
                  label: '疫情小班',
                  num: 633,
                  unit: '个'
                },
                {
                  label: '发生面积',
                  num: 1.46,
                  unit: '万亩'
                },
                {
                  label: '死亡松树',
                  num: 59157,
                  unit: '株'
                },
                {
                  label: '资金投入',
                  num: 2146,
                  unit: '万元'
                },
                {
                  label: '单位投入',
                  num: 1470,
                  unit: '万元'
                }
              ]
            },

            {
              label: '蔡甸',
              pineForest: 3.23,
              valueList: [{
                  label: '疫点',
                  num: 8,
                  unit: '个'
                },
                {
                  label: '疫情小班',
                  num: 421,
                  unit: '个'
                },
                {
                  label: '发生面积',
                  num: 2.51,
                  unit: '万亩'
                },
                {
                  label: '死亡松树',
                  num: 15002,
                  unit: '株'
                },
                {
                  label: '资金投入',
                  num: 464,
                  unit: '万元'
                },
                {
                  label: '单位投入',
                  num: 185,
                  unit: '万元'
                }
              ]
            },

            {
              label: '东湖高新',
              pineForest: 2.73,
              valueList: [{
                  label: '疫点',
                  num: 9,
                  unit: '个'
                },
                {
                  label: '疫情小班',
                  num: 388,
                  unit: '个'
                },
                {
                  label: '发生面积',
                  num: 2.53,
                  unit: '万亩'
                },
                {
                  label: '死亡松树',
                  num: 4967,
                  unit: '株'
                },
                {
                  label: '资金投入',
                  num: 175,
                  unit: '万元'
                },
                {
                  label: '单位投入',
                  num: 69,
                  unit: '万元'
                }
              ]
            },

            {
              label: '东湖风景区',
              pineForest: 0.81,
              valueList: [{
                  label: '疫点',
                  num: 4,
                  unit: '个'
                },
                {
                  label: '疫情小班',
                  num: 11,
                  unit: '个'
                },
                {
                  label: '发生面积',
                  num: 0.41,
                  unit: '万亩'
                },
                {
                  label: '死亡松树',
                  num: 290,
                  unit: '株'
                },
                {
                  label: '资金投入',
                  num: 287,
                  unit: '万元'
                },
                {
                  label: '单位投入',
                  num: 700,
                  unit: '万元'
                }
              ]
            },

            {
              label: '汉南',
              pineForest: 0.64,
              valueList: [{
                  label: '疫点',
                  num: 2,
                  unit: '个'
                },
                {
                  label: '疫情小班',
                  num: 34,
                  unit: '个'
                },
                {
                  label: '发生面积',
                  num: 0.28,
                  unit: '万亩'
                },
                {
                  label: '死亡松树',
                  num: 893,
                  unit: '株'
                },
                {
                  label: '资金投入',
                  num: 130,
                  unit: '万元'
                },
                {
                  label: '单位投入',
                  num: 464,
                  unit: '万元'
                }
              ]
            },

            {
              label: '洪山',
              pineForest: 0.47,
              valueList: [{
                  label: '疫点',
                  num: 3,
                  unit: '个'
                },
                {
                  label: '疫情小班',
                  num: 12,
                  unit: '个'
                },
                {
                  label: '发生面积',
                  num: 0.15,
                  unit: '万亩'
                },
                {
                  label: '死亡松树',
                  num: 66,
                  unit: '株'
                },
                {
                  label: '资金投入',
                  num: 0,
                  unit: '万元'
                },
                {
                  label: '单位投入',
                  num: 0,
                  unit: '万元'
                }
              ]
            },

            {
              label: '武昌',
              pineForest: 0.22,
              valueList: [{
                  label: '疫点',
                  num: 4,
                  unit: '个'
                },
                {
                  label: '疫情小班',
                  num: 16,
                  unit: '个'
                },
                {
                  label: '发生面积',
                  num: 0.22,
                  unit: '万亩'
                },
                {
                  label: '死亡松树',
                  num: 2377,
                  unit: '株'
                },
                {
                  label: '资金投入',
                  num: 220,
                  unit: '万元'
                },
                {
                  label: '单位投入',
                  num: 1000,
                  unit: '万元'
                }
              ]
            },

            {
              label: '青山',
              pineForest: 0.14,
              valueList: [{
                  label: '疫点',
                  num: 1,
                  unit: '个'
                },
                {
                  label: '疫情小班',
                  num: 16,
                  unit: '个'
                },
                {
                  label: '发生面积',
                  num: 0.07,
                  unit: '万亩'
                },
                {
                  label: '死亡松树',
                  num: 1705,
                  unit: '株'
                },
                {
                  label: '资金投入',
                  num: 48,
                  unit: '万元'
                },
                {
                  label: '单位投入',
                  num: 686,
                  unit: '万元'
                }
              ]
            }
          ]
        }]
      }
    },
    created() {

    },
    mounted() {

      let yeatLIst = []
      let xAxisData = []
      let seriesData = []
      this.dataList.forEach(item => {
        yeatLIst.push(item.year)
        let dataList = []
        item.data.forEach(area => {
          if (xAxisData.indexOf(area.label) === -1) {
            xAxisData.push(area.label)
          }
          area.valueList.forEach(values => {
            if (values.label === '发生面积') {
              dataList.push(values.num)
            }
          })
        })
        seriesData.push({
          name: item.year,
          type: 'line',
          stack: '发生面积',
          data: dataList
        })

      })
      console.log(yeatLIst)
      console.log(xAxisData)
      console.log(seriesData)
      this.initEchart(yeatLIst, xAxisData, seriesData)
    },
    methods: {

      initEchart(yeatLIst, xAxisData, seriesData) {
        const chart = this.$refs.chart
        if (chart) {
          const myChart = Echarts.init(chart)

          var option = {
            title: {
              text: '折线图堆叠'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: yeatLIst
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: xAxisData
            },
            yAxis: {
              type: 'value'
            },
            series: seriesData
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
      }

    }
  }
</script>
<style lang="scss">
  .app-container {}
</style>
