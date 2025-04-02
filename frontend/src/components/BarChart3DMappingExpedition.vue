<template>
  <div ref="chartRef" :style="{ width: width, height: height, margin: '0 auto',cursor: 'pointer'}"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue';
import * as echarts from 'echarts';
import 'echarts/lib/chart/bar'; // Import bar chart
import 'echarts/lib/component/tooltip'; // Import tooltip component
import 'echarts/lib/component/title'; // Import title component
import 'echarts/lib/component/legend'; // Import legend component
import {
  validSubstratesMap,
  validSubtrateMapKeyText,
} from '@/maps/config/substrateOrder';
import { substrateLevelMapColor } from '@/maps/config/layerColors';
import { debounce } from 'lodash';

const TIME_OUT = 150;

// Props definition
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

// Reactive state
const chartRef = ref<HTMLElement | null>(null);
const chart = ref<echarts.ECharts | null>(null);
const windowResizeInnerWidth = ref(window.innerWidth);
const windowResizeInnerHeight = ref(window.innerHeight);

// Methods
const processData = (data: any[], substrateLevel: string) => {
  const seriesData: Record<string, number> = {}; // init to 0
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
};

const getChartOption = (data: any[]) => {
  let localTooltip = {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
    formatter: function (params: any[]) {
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

  if (props.tooltip === false) {
    localTooltip = false;
  }

  return {
    title: {
      text: `Benthic cover at ${props.substrateLevel} level`,
      left: '-6px',
    },
    tooltip: localTooltip,
    legend: {
      formatter: function (name: string) {
        return validSubtrateMapKeyText[name];
      },
      orient: 'horizontal',
      bottom: props.substrateLevel === 'Substrate_coarse' ? 0 : 0,
    },
    grid: {
      left: '2.4%',
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
      name: 'substrate',
    },
    yAxis: {
      type: 'value',
      name: 'Percentage cover',
      axisLabel: {
        formatter: function (value: number) {
          return value * 100 + '%';
        },
      },
      max: 1,
      min: 0,
    },
    series: processData(data, props.substrateLevel),
  };
};

const initChart = () => {
  if (chart.value == null && chartRef.value) {
    chart.value = echarts.init(chartRef.value);
  }
  const option = getChartOption(props.rawData);
  chart.value?.setOption(option);
};

const handleResize = debounce(() => {
  if (chart.value && chartRef.value) {
    chart.value.dispose();
    chart.value = null;
    chart.value = echarts.init(chartRef.value);
    const option = getChartOption(props.rawData);
    chart.value.setOption(option);
  }
}, TIME_OUT);

const updateWidth = (value: any) => {
  windowResizeInnerWidth.value = value.target.innerWidth;
  windowResizeInnerHeight.value = value.target.innerHeight;
};

// Lifecycle hooks
onMounted(() => {
  initChart();
  window.addEventListener('resize', updateWidth);
});

onUnmounted(() => {
  chart.value?.dispose();
  window.removeEventListener('resize', updateWidth);
});

// Watchers
watch(
  () => props.rawData,
  (value) => {
    if (value.length === 0) {
      return;
    }
    initChart();
  },
  { deep: true }
);

watch(
  () => props.substrateLevel,
  () => {
    if (chart.value) {
      chart.value.clear();
      const option = getChartOption(props.rawData);
      chart.value.setOption(option);
    }
  }
);

watch([windowResizeInnerWidth, windowResizeInnerHeight], () => {
  handleResize();
});
</script>

<style scoped></style>
