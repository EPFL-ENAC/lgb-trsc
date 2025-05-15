<template>
  <div
    ref="chartEl"
    :style="{
      width,
      height,
      margin: '0 auto',
      cursor: 'pointer',
    }"
  ></div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';
import { useI18n } from 'vue-i18n';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import {
  validSubstratesMap,
  validSubtrateMapKeyText,
} from 'maps/config/substrateOrder';
import { substrateLevelMapColor } from 'maps/config/layerColors';
import { debounce } from 'lodash';

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
  tooltip: {
    type: Boolean,
    default: true,
  },
  substrateLevel: {
    type: String,
    default: 'Substrate_coarse',
  },
});

// i18n
const { t, locale } = useI18n({ useScope: 'local' });

// Chart refs and state
const chartEl = ref(null);
const chart = ref(null);

// --- Chart Option Builder ---
function processData(data, substrateLevel) {
  const seriesData = {};
  const currentSubstrates = validSubstratesMap[substrateLevel];

  // Initialize all to 0
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
      name: validSubtrateMapKeyText[substrate],
      type: 'bar',
      data: _data,
      itemStyle: {
        color: substrateLevelMapColor?.[substrateLevel][index],
      },
      barGap: '-100%',
      barCategoryGap: '0%',
      barWidth: '80%',
      emphasis: { focus: 'series' },
    };
  });
}

function getChartOption(data) {
  // Tooltip
  let localTooltip = {
    trigger: 'axis',
    show: true,
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
      result += `${param.axisValueLabel} ${(param.value * 100).toFixed(2)}%<br/>`;
      return result;
    },
  };

  if (props.tooltip === false) {
    localTooltip = { show: false };
  }

  const series = processData(data, props.substrateLevel);
  const maxValue = Number(
    Math.max(...series.map((item) => Math.max(...item.data))).toFixed(1)
  );

  const titleMap = {
    Substrate_coarse: 'chart.title.coarse',
    Substrate_intermediate: 'chart.title.intermediate',
  };

  return {
    title: {
      text: t(titleMap[props.substrateLevel]),
      left: '-6px',
    },
    tooltip: localTooltip,
    legend: {
      data: validSubstratesMap[props.substrateLevel].map((substrate) => validSubtrateMapKeyText[substrate]),
      formatter: function (name) {
        return name;
      },
      orient: 'horizontal',
      bottom: 0,
    },
    grid: {
      left: '5px',
      right: '4%',
      bottom: props.substrateLevel === 'Substrate_coarse' ? '100px' : '250px',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: validSubstratesMap[props.substrateLevel],
      axisLabel: {
        show: false,
      },
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
      max: maxValue,
      min: 0,
    },
    series,
    color: substrateLevelMapColor?.[props.substrateLevel],
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
  const option = getChartOption(props.rawData);
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
  handleResize.cancel && handleResize.cancel();
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
    xAxis: Substrate
    yAxis: Percentage cover
fr:
  chart:
    title:
      coarse: Principales catégories de substrat benthique des récifs coralliens
      intermediate: Principales catégories de substrat benthique des récifs coralliens et formes de croissance des coraux durs
    xAxis: Substrat
    yAxis: Pourcentage de couverture
ar:
  chart:
    title:
      coarse: الفئات الرئيسية لركيزة قاع الشعاب المرجانية
      intermediate: الفئات الرئيسية لركيزة قاع الشعاب المرجانية وأشكال نمو المرجان الصلب
    xAxis: الركيزة
    yAxis: نسبة التغطية
</i18n>
