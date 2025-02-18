<template>
  <div ref="chart" :style="{ width: width, height: height }"></div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts/lib/chart/bar'; // Import bar chart
import 'echarts/lib/component/tooltip'; // Import tooltip component
import 'echarts/lib/component/title'; // Import title component
import 'echarts/lib/component/legend'; // Import legend component
import { d3MappingColorSubstrate1 as colorPalette } from '@/maps/config/layerColors';
import { validSubstrates, validSubtrateMap } from '@/maps/config/substrateOrder';

export default {
  name: 'BarChart3DMappingExpedition',
  props: {
    rawData: {
      type: Array,
      required: true,
    },
    height: {
      type: String,
      default: '250px',
    },
    width: {
      type: String,
      default: '100%',
    },
    tooltip: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    this.initChart();
  },
  watch: {
    rawData: {
      handler() {
        this.initChart();
      },
      deep: true,
    },
  },
  methods: {
    initChart() {
      const chart = echarts.init(this.$refs.chart);
      const option = this.getChartOption(this.rawData);
      chart.setOption(option);
    },
    getChartOption(data) {;

      function processData(data) {
        const seriesData = {}; // init to 0
        // init to 0
        validSubstrates.forEach((substrate) => {
          seriesData[substrate] = 0;
        });

        data.forEach((item) => {
          if (validSubstrates.includes(item.Substrate_coarse)) {
            seriesData[item.Substrate_coarse] += item.mean;
          }
        });
        return validSubstrates.map((substrate, index) => {
          const size = validSubstrates.length;
          const _data = new Array(size).fill(0);
          _data[index] = seriesData[substrate];

          return ({
          name: substrate,
          type: 'bar',
          data: _data,
          itemStyle: {
            color: colorPalette[index]
          },
          barGap: '-100%',
          barCategoryGap: '0%',
          barWidth: '80%',
        })
        });
      }

      let localTooltip = {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function (params) {
            let result = ``;
            let param = params[params[0].dataIndex];
            if (param === undefined) {
              return '';
            }
            result+= `<span style="margin-right:1rem;background-color:${param.color};display: inline-block;width: 10px;height: 10px;"></span>`;
            result+= `${param.axisValueLabel} ${(param.value *100).toFixed(2)}%<br/>`
            
            return result;
          }
        };
      if (this.tooltip ===false) {
        localTooltip = false;
      }
      return {
        title: {
          text: 'Benthic cover at coarse substrate level',
        },
        tooltip: localTooltip,
        legend: {
          data: validSubstrates,
          formatter: function (name) {
            return validSubtrateMap[name];
          },
          orient: 'horizontal',
          bottom: 10
        },
        grid: {
          left: '4%',
          right: '4%',
          bottom: '130px',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: validSubstrates,
            axisLabel: { 
            show: false
            },
          name: 'substrate',
        },
        yAxis: {
          type: 'value',
          name: 'Percentage cover',
          axisLabel: {
            formatter: function (value) {
              return value * 100 + '%';
            },
          },
          max: 1,
          min: 0,
        },
        series: processData(data),
      };
    },
  },
};
</script>

<style scoped>

</style>
