<template>
  <div ref="chartEl" :style="{ width, height, ...style }"></div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import { substrateLevelMapColor } from 'maps/config/layerColors';
import {
  validSubstratesMap,
  validSubtrateMapKeyText,
} from 'maps/config/substrateOrder';
import { debounce, min } from 'lodash';
import { useI18n } from 'vue-i18n';

const TIME_OUT = 150;

// Props
const props = defineProps({
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
  miniState: {
    type: Boolean,
    default: false,
  },
});

// i18n
const { t } = useI18n({ useScope: 'local' });

// Chart refs and state
const chartEl = ref(null);
const chart = ref(null);

// --- Chart Option Builder ---
function getChartOption(data, substrateLevel) {
  const ids = Array.from(new Set(data.map((x) => x.id)));

  function getSiteNameFromSiteId(data, SiteId) {
    if (!data) return '';
    return (
      data.find((item) => item.id === parseInt(SiteId))?.sampling_site_name || ''
    );
  }

  function processData(data, substrateLevel) {
    const seriesData = {};
    validSubstratesMap[substrateLevel].forEach((substrate) => {
      seriesData[substrate] = new Array(ids.length).fill(0);
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

    return validSubstratesMap[substrateLevel].map((substrate, index) => ({
      name: validSubtrateMapKeyText[substrate],
      type: 'bar',
      stack: 'total',
      emphasis: { focus: 'series' },
      data: seriesData[substrate],
      color: substrateLevelMapColor?.[substrateLevel]?.[index],
      itemStyle: {
        color: substrateLevelMapColor?.[substrateLevel]?.[index],
      },
    }));
  }

  function getTooltip(data) {
    return {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
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
    };
  }

  const titleMap = {
    Substrate_coarse: 'chart.title.coarse',
    Substrate_intermediate: 'chart.title.intermediate',
  };

  let gridBottom = substrateLevel === 'Substrate_coarse' ? '10%' : '18%';
  let forceScrollLegend = false;
  if (window.innerWidth < 1500) gridBottom = '23%';
  if (window.innerWidth < 1100) gridBottom = '35%';
  if (window.innerWidth < 800 || window.innerHeight < 700) {
    gridBottom = '20%';
    forceScrollLegend = true;
  }

  let legendType = props.tooltip ? undefined : 'scroll';
  if (forceScrollLegend) legendType = 'scroll';

  return {
    title: {
      text: t(titleMap[substrateLevel]),
      textStyle: {
        fontSize: '1rem',
        fontFamily: 'Apax, Helvetica, Arial, sans-serif',
        fontWeight: 900,
      },
    },
    tooltip: props.tooltip ? getTooltip(data) : undefined,
    legend: {
      data: validSubstratesMap[substrateLevel].map((substrate) => validSubtrateMapKeyText[substrate]),
      orient: 'horizontal',
      selectedMode: 'multiple',
      bottom: 0,
      type: legendType,
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
      nameTextStyle: {
        color: '#000',
        fontSize: '9px',
        padding: [0, 0, 0, 5],
      },
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
}

// --- Chart Lifecycle ---
const handleResize = debounce(() => {
  chart.value?.resize();
}, TIME_OUT);

const initChart = () => {
  if (!chart.value && chartEl.value) {
    chart.value = echarts.init(chartEl.value);
  }
  const option = getChartOption(props.rawData, props.substrateLevel);
  chart.value?.setOption(option);
};

const closeChart = () => {
  chart.value?.dispose();
  chart.value = null;
};

onMounted(() => {
  initChart();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  closeChart();
  handleResize?.cancel();
});

// --- Watchers ---
watch(
  () => props.rawData,
  (value) => {
    if (!value || value.length === 0) return;
    closeChart();
    initChart();
  },
  { deep: true }
);

watch(
  () => props.miniState === false,
  () => {
    debugger;
    closeChart();
    initChart();
  }
);

watch(
  () => props.substrateLevel,
  () => {
    closeChart();
    initChart();
  }
);

watch(
  () => t('chart.title.coarse'),
  () => {
    closeChart();
    initChart();
  }
);
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
