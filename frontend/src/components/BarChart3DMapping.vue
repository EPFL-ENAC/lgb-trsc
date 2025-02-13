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
import { validSubstrates } from '@/maps/config/substrateOrder';

export default {
  name: 'BarChart3DMapping',
  props: {
    rawData: {
      type: Array,
      required: true
    },
    height: {
      type: String,
      default: '250px'
    },
    width: {
      type: String,
      default: '100%'
    },
    tooltip: {
      type: Boolean,
      default: true
    },
    substrateLevel: {
      type: String,
      default: 'Substrate_1'
    }
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
      function getSiteNameFromSiteId(data, SiteId) {
        if (data === undefined) {
          return '';
        }
        return data.find((item) => item.id === parseInt(SiteId))?.sampling_site_name || '';
      }
      function processData(data) {
        const seriesData = {};

        validSubstrates.forEach((substrate) => {
          seriesData[substrate] = new Array(31).fill(0);
        });

        const idMapping = [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 2000, 2001, 2002,
          2003, 2004, 2005, 2006, 2007, 2008, 2009, 2011, 2012, 2013, 2015
        ].reduce((acc, id, index) => {
          acc[id] = index;
          return acc;
        }, {});

        data.forEach((item) => {
          if (validSubstrates.includes(item.Substrate_1)) {
            const index = idMapping[item.id];
            if (index !== undefined) {
              seriesData[item.Substrate_1][index] += item.mean;
            }
          }
        });

        return validSubstrates.map((substrate) => ({
          name: substrate,
          type: 'bar',
          stack: 'total',
          emphasis: { focus: 'series' },
          data: seriesData[substrate]
        }));
      }

      let localTooltip = {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function (params) {
            let param = params[params[0].dataIndex];
            if (param === undefined) {
              return '';
            }
            let result = `ID: ${params[0].axisValue}<br/>`;
            result+= `Site Name: ${getSiteNameFromSiteId(data, params[0].axisValue)}<br/>`
            params.forEach((param) => {
              result += `<span style="margin-right:1rem;background-color:${param.color};display: inline-block;width: 10px;height: 10px;"></span>${param.seriesName}: ${(param.value * 100).toFixed(
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
        title: {
          text: 'Substrate Distribution by Location ID'
        },
        tooltip: localTooltip,
        legend: {
          data: [
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
            'trash'
          ],
          type: 'scroll',
          orient: 'horizontal',
          bottom: 0
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 2000, 2001,
            2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2011, 2012, 2013, 2015
          ],
          name: 'Location ID'
        },
        yAxis: {
          type: 'value',
          name: 'Percentage',
            axisLabel: {
            formatter: function(value) {
              return (value * 100) + '%';
            }
            },
          max: 1,
          min: 0
        },
        series: processData(data),
        color: colorPalette
      };
    }
  }
};
</script>

<style scoped>
</style>
