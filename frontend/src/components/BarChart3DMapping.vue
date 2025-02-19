<template>
  <div ref="chart" :style="{  width: width, height: height, ...style}"></div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts/lib/chart/bar'; // Import bar chart
import 'echarts/lib/component/tooltip'; // Import tooltip component
import 'echarts/lib/component/title'; // Import title component
import 'echarts/lib/component/legend'; // Import legend component
import { d3MappingColorSubstrate1 as colorPalette, d3MappingColorSubstrate2 as colorPalette2 } from '@/maps/config/layerColors';
import { validSubstrates, validSubstrates2, validSubtrateMap } from '@/maps/config/substrateOrder';
import { debounce } from 'lodash';

const TIME_OUT = 150;

const subtrateLevelMapColor = {
  'Substrate_coarse': colorPalette,
  'Substrate_intermediate': colorPalette2
}

const validSubstratesMap = {
  'Substrate_coarse': validSubstrates,
  'Substrate_intermediate': validSubstrates2
}

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
    style: {
      type: Object,
      default: () => ({})
    },
    tooltip: {
      type: Boolean,
      default: true
    },
    substrateLevel: {
      type: String,
      default: 'Substrate_coarse'
    }
  },
  data() {
    return {
      chart: null,
      windowResizeInnerWidth: window.innerWidth,
      windowResizeInnerHeight: window.innerHeight,
    };
  },
  watch: {
    substrateLevel: {
      handler(newValue) {
        this.chart.clear();
        const option = this.getChartOption(this.rawData, newValue);
        this.chart.setOption(option);
      }
    },
    windowResizeInnerWidth: {
      handler(newValue) {
        this.handleResize(newValue);
      }
    },
    windowResizeInnerHeight: {
      handler(newValue) {
        this.handleResize(newValue);
      }
    },
  },
  mounted() {
    this.initChart();
    addEventListener('resize', this.updateWidth);
  },
  umounted() {
    this.chart?.dispose();
    removeEventListener('resize', this.updateWidth);
    this.handleResize.cancel();
  },
  methods: {
    handleResize: debounce(function() {
      if (this.chart) {
        this.chart.dispose();
        this.chart.clear();
        this.chart = null;
        this.chart = echarts.init(this.$refs.chart);
        const option = this.getChartOption(this.rawData, this.substrateLevel);
        this.chart.setOption(option);
      }
    }, TIME_OUT),
    updateWidth(value) {
      this.windowResizeInnerWidth = value.target.innerWidth;
      this.windowResizeInnerHeight = value.target.innerHeight;
    },
    initChart() {
        this.chart = echarts.init(this.$refs.chart);
        const option = this.getChartOption(this.rawData, this.substrateLevel);
        this.chart.setOption(option);
    },
    getChartOption(data, substrateLevel) {

      const ids = Array.from(new Set(data.map(x => x.id)))
      function getSiteNameFromSiteId(data, SiteId) {
        if (data === undefined) {
          return '';
        }
        return data.find((item) => item.id === parseInt(SiteId))?.sampling_site_name || '';
      }
      function processData(data, substrateLevel) {
        const seriesData = {};

        validSubstratesMap[substrateLevel].forEach((substrate) => {
          seriesData[substrate] = new Array(31).fill(0);
        });
        const idMapping = ids.reduce((acc, id, index) => {
          acc[id] = index;
          return acc;
        }, {});

        data.forEach((item) => {
          if (validSubstratesMap[substrateLevel].includes(item[substrateLevel])) {
            const index = idMapping[item.id];
            if (index !== undefined) {
              seriesData[item[substrateLevel]][index] += item.mean;
            }
          }
        });

        return validSubstratesMap[substrateLevel].map((substrate) => ({
          name: substrate,
          type: 'bar',
          stack: 'total',
          emphasis: { focus: 'series' },
          data: seriesData[substrate]
        }));
      }

      function getTooltip(data, substrateLevel) {
        return {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: (params) => {
            let result = `ID: ${params[0].axisValue}<br/>`;
            result += `Site Name: ${getSiteNameFromSiteId(data, params[0].axisValue)}<br/>`;
            params.forEach((param) => {
              result += `<span style="margin-right:1rem;background-color:${param.color};display: inline-block;width: 10px;height: 10px;"></span>${param.seriesName}: ${(param.value * 100).toFixed(2)}%<br/>`;
            });
            return result;
          }
        }
      }


      const titleMap = {
        Substrate_coarse: "main categories of coral reef benthic substrate",
        Substrate_intermediate: "main categories of coral reef benthic substrate and hard coral growth forms",
      }
      let gridBottom = substrateLevel === 'Substrate_coarse' ? '10%': '18%';
      let forceScrollLegend = false;
      if (window.innerWidth < 1500) {
        gridBottom = '23%';
      }
      if (window.innerWidth < 1100) {
        gridBottom = '35%';
      }
      if (window.innerWidth < 800 || window.innerHeight < 700) {
        gridBottom = '20%';
        forceScrollLegend = true;
      }

      let legendType = undefined;

      if (this.tooltip) {
        legendType = undefined;
      } else {
        legendType = 'scroll';
      }
      if (forceScrollLegend) {
        legendType = 'scroll';
      }
      return {
        title: {
          text: titleMap[substrateLevel],
        },
        tooltip: this.tooltip ? getTooltip(data, substrateLevel) : undefined,
        legend: {
          data: validSubstratesMap[substrateLevel],
          
          formatter: function (name) {
            return validSubtrateMap[name];
          },
          type: legendType,
          orient: 'horizontal',
          bottom: 0,
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: gridBottom,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: ids,
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
        series: processData(data, substrateLevel),
        color: subtrateLevelMapColor[substrateLevel]
      };
    }
  }
};
</script>

<style scoped>
</style>
