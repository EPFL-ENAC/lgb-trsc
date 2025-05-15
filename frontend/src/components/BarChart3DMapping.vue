<template>
  <div ref="chart" :style="{ width: width, height: height, ...style }"></div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts/lib/chart/bar'; // Import bar chart
import 'echarts/lib/component/tooltip'; // Import tooltip component
import 'echarts/lib/component/title'; // Import title component
import 'echarts/lib/component/legend'; // Import legend component
import { substrateLevelMapColor } from 'maps/config/layerColors';
import {
  validSubstratesMap,
  validSubtrateMapKeyText,
} from 'maps/config/substrateOrder';
import { debounce } from 'lodash';
import { useI18n } from 'vue-i18n';

const TIME_OUT = 150;

export default {
  name: 'BarChart3DMapping',
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
    style: {
      type: Object,
      default: () => ({}),
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
    '$i18n.locale': {
      handler() {
        if (this.chart) {
          const option = this.getChartOption(this.rawData, this.substrateLevel);
          this.chart.setOption(option);
        }
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
      this.chart = echarts.init(this.$refs.chart);
      const option = this.getChartOption(this.rawData, this.substrateLevel);
      this.chart.setOption(option);
    },
    getChartOption(data, substrateLevel) {
      const { t } = useI18n({ useScope: 'local' });
      const ids = Array.from(new Set(data.map((x) => x.id)));
      function getSiteNameFromSiteId(data, SiteId) {
        if (data === undefined) {
          return '';
        }
        return (
          data.find((item) => item.id === parseInt(SiteId))
            ?.sampling_site_name || ''
        );
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
          if (
            validSubstratesMap[substrateLevel].includes(item[substrateLevel])
          ) {
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
          data: seriesData[substrate],
        }));
      }

      function getTooltip(data) {
        return {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          formatter: (params) => {
            let result = `ID: ${params[0].axisValue}<br/>`;
            result += `Site Name: ${getSiteNameFromSiteId(
              data,
              params[0].axisValue
            )}<br/>`;
            params.forEach((param) => {
              result += `<span style="margin-right:1rem;background-color:${
                param.color
              };display: inline-block;width: 10px;height: 10px;"></span>${
                param.seriesName
              }: ${(param.value * 100).toFixed(2)}%<br/>`;
            });
            return result;
          },
        };
      }

      const titleMap = {
        Substrate_coarse: 'chart.title.coarse',
        Substrate_intermediate: 'chart.title.intermediate',
      };
      let gridBottom = substrateLevel === 'Substrate_coarse' ? '10%' : '18%';
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
          text: t(titleMap[substrateLevel]),
          textStyle: {
            fontSize: '1rem',
            fontFamily: 'Apax, Helvetica, Arial, sans-serif',
            fontWeight: 900,
          },
        },
        tooltip: this.tooltip
          ? {
              ...getTooltip(data),
              formatter: (params) => {
                let result = `${t('chart.tooltip.id')}: ${params[0].axisValue}<br/>`;
                result += `${t('chart.tooltip.siteName')}: ${getSiteNameFromSiteId(
                  data,
                  params[0].axisValue
                )}<br/>`;
                params.forEach((param) => {
                  result += `<span style="margin-right:1rem;background-color:${
                    param.color
                  };display: inline-block;width: 10px;height: 10px;"></span>${
                    param.seriesName
                  }: ${(param.value * 100).toFixed(2)}%<br/>`;
                });
                return result;
              },
            }
          : undefined,
        legend: {
          data: validSubstratesMap[substrateLevel],

          formatter: function (name) {
            return validSubtrateMapKeyText[name];
          },
          type: legendType,
          orient: 'horizontal',
          bottom: 0,
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: gridBottom,
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: ids,
          name: t('chart.xAxis'),
        },
        yAxis: {
          type: 'value',
          name: t('chart.yAxis'),
          axisLabel: {
            formatter: function (value) {
              return value * 100 + '%';
            },
          },
          max: 1,
          min: 0,
        },
        series: processData(data, substrateLevel),
        color: substrateLevelMapColor?.[substrateLevel],
      };
    },
  },
};
</script>

<style scoped></style>

<i18n lang="yaml">
en:
  chart:
    title:
      coarse: Main categories of coral reef benthic substrate
      intermediate: Main categories of coral reef benthic substrate and hard coral growth forms
    xAxis: Location ID
    yAxis: Percentage
    tooltip:
      id: ID
      siteName: Site Name
fr:
  chart:
    title:
      coarse: Principales catégories de substrat benthique des récifs coralliens
      intermediate: Principales catégories de substrat benthique des récifs coralliens et formes de croissance des coraux durs
    xAxis: Identifiant de site
    yAxis: Pourcentage
    tooltip:
      id: ID
      siteName: Nom du site
ar:
  chart:
    title:
      coarse: الفئات الرئيسية لركيزة قاع الشعاب المرجانية
      intermediate: الفئات الرئيسية لركيزة قاع الشعاب المرجانية وأشكال نمو المرجان الصلب
    xAxis: معرف الموقع
    yAxis: النسبة المئوية
    tooltip:
      id: المعرف
      siteName: اسم الموقع
</i18n>
