<template>
  <div ref="chart" :style="{ width: width, height: height }"></div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts/lib/chart/bar'; // Import bar chart
import 'echarts/lib/component/tooltip'; // Import tooltip component
import 'echarts/lib/component/title'; // Import title component
import 'echarts/lib/component/legend'; // Import legend component
import {
  validSubstrates,
  validSubstrates2,
  validSubtrateMap,
} from '@/maps/config/substrateOrder';
import {
  d3MappingColorSubstrate1 as colorPalette,
  d3MappingColorSubstrate2 as colorPalette2,
} from '@/maps/config/layerColors';
import { debounce } from 'lodash';

const TIME_OUT = 150;

const substrateLevelMapColor = {
  Substrate_coarse: colorPalette,
  Substrate_intermediate: colorPalette2,
};

const validSubstratesMap = {
  Substrate_coarse: validSubstrates,
  Substrate_intermediate: validSubstrates2,
};

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
    substrateLevel: {
      type: String,
      default: 'Substrate_coarse',
    },
  },
  data() {
    return {
      chart: null,
      windowResizeInnerWidth: window.innerWidth,
      windowResizeInnerHeight: window.innerHeight,
    };
  },
  watch: {
    rawData: {
      handler(value) {
        if (value.length === 0) {
          return;
        }
        this.initChart();
      },
      deep: true,
    },

    substrateLevel: {
      handler(newValue) {
        this.chart.clear();
        const option = this.getChartOption(this.rawData, newValue);
        this.chart.setOption(option);
      },
    },
    windowResizeInnerWidth: {
      handler(newValue) {
        this.handleResize(newValue);
      },
    },
    windowResizeInnerHeight: {
      handler(newValue) {
        this.handleResize(newValue);
      },
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
    handleResize: debounce(function () {
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
      if (this.chart == null) {
        this.chart = echarts.init(this.$refs.chart);
      }
      const option = this.getChartOption(this.rawData, this.substrateLevel);
      this.chart.setOption(option);
    },
    getChartOption(data) {
      function processData(data, substrateLevel) {
        const seriesData = {}; // init to 0
        const currentSubstrates = validSubstratesMap[substrateLevel];
        // init to 0
        currentSubstrates.forEach((substrate) => {
          seriesData[substrate] = 0;
        });

        data.forEach((item) => {
          if (currentSubstrates.includes(item[substrateLevel])) {
            seriesData[item[substrateLevel]] += item.mean;
          }
        });
        const size = currentSubstrates.length;
        return currentSubstrates.map((substrate, index) => {
          const _data = new Array(size).fill(0);
          _data[index] = seriesData[substrate];

          return {
            name: substrate,
            type: 'bar',
            data: _data,
            itemStyle: {
              color: substrateLevelMapColor?.[substrateLevel][index],
            },
            barGap: '-100%',
            barCategoryGap: '0%',
            barWidth: '80%',
          };
        });
      }

      let localTooltip = {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter: function (params) {
          let result = '';
          let param = params[params[0].dataIndex];
          if (param === undefined) {
            return '';
          }
          result += `<span style="margin-right:1rem;background-color:${param.color};display: inline-block;width: 10px;height: 10px;"></span>`;
          result += `${param.axisValueLabel} ${(param.value * 100).toFixed(
            2
          )}%<br/>`;

          return result;
        },
      };
      if (this.tooltip === false) {
        localTooltip = false;
      }
      return {
        title: {
          text: `Benthic cover at ${this.substrateLevel} level`,
          left: '-6px',
        },
        tooltip: localTooltip,
        legend: {
          formatter: function (name) {
            return validSubtrateMap[name];
          },
          orient: 'horizontal',
          bottom: this.substrateLevel === 'Substrate_coarse' ? 0 : 0,
        },
        grid: {
          left: '2.4%',
          right: '4%',
          bottom: this.substrateLevel === 'Substrate_coarse' ? '100px' : '250px',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: validSubstratesMap[this.substrateLevel],
          axisLabel: {
            show: false,
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
        series: processData(data, this.substrateLevel),
      };
    },
  },
};
</script>

<style scoped></style>
