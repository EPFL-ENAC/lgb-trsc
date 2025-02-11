<template>
  <div ref="chart" :style="{ width: width, height: height }"></div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts/lib/chart/bar'; // Import bar chart
import 'echarts/lib/component/tooltip'; // Import tooltip component
import 'echarts/lib/component/title'; // Import title component
import 'echarts/lib/component/legend'; // Import legend component

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
  methods: {
    initChart() {
      const chart = echarts.init(this.$refs.chart);
      const option = this.getChartOption(this.rawData);
      chart.setOption(option);
    },
    getChartOption(data) {
      const validSubstrates = [
        'sand',
        'rubble',
        'unknown_hard_substrate',
        'algae_covered_substrate',
        'coral_bleached',
        'coral_dead',
        'coral_alive',
        'other_invertebrates',
        'anemone',
        'other_animal',
        'trash',
      ];
      const colorPalette = [
        '#d4b483',
        '#a39081',
        '#828282',
        '#5b7065',
        '#fff1af',
        '#8b6b61',
        '#5c8374',
        '#9db2bf',
        '#526d82',
        '#27374d',
        '#000000',
      ];
      // function getSiteNameFromSiteId(data, SiteId) {
      //   if (data === undefined) {
      //     return '';
      //   }
      //   return data.find((item) => item.id === parseInt(SiteId))?.Site || '';
      // }
      function processData(data) {
        const seriesData = {}; // init to 0
        // init to 0
        validSubstrates.forEach((substrate) => {
          seriesData[substrate] = 0;
        });

        data.forEach((item) => {
          if (validSubstrates.includes(item.Substrate_1)) {
            console.log(item.mean);
            seriesData[item.Substrate_1] += item.mean;
          }
        });
        return validSubstrates.map((substrate, index) => ({
          name: substrate,
          value: seriesData[substrate],
          itemStyle: {
            color: colorPalette[index],
          },
        }));
      }

      let localTooltip = {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function (params) {
            let result = `Substrate1: ${params[0].axisValue}<br/>`;
            // result+= `Site Name: ${getSiteNameFromSiteId(data, params[0].axisValue)}<br/>`
            params.forEach((param) => {
              result += `<span style="margin-right:1rem;background-color:${param.color};display: inline-block;width: 10px;height: 10px;"></span>${(param.value * 100).toFixed(
                2
              )}%<br/>`;
            });
            return result;
          }
        };
      if (this.tooltip ===false) {
        localTooltip = false;
      }
      return {
        // title: {
        //   text: 'Substrate Distribution',
        // },
        tooltip: localTooltip,
        legend: {
          data: validSubstrates,
          type: 'scroll',
          orient: 'horizontal',
          bottom: 0
        },
        grid: {
          left: '4%',
          right: '4%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: validSubstrates,
          name: 'substrate',
        },
        yAxis: {
          type: 'value',
          name: 'Percentage',
          axisLabel: {
            formatter: function (value) {
              return value * 100 + '%';
            },
          },
          max: 1,
          min: 0,
        },
        series: [
          {
            data: processData(data),
            type: 'bar',
          },
        ],
      };
    },
  },
};
</script>

<style scoped>

</style>
