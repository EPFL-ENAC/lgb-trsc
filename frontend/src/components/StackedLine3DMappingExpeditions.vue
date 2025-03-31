<template>
  <div ref="chartRef" :style="{ width: width, height: height }"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue';
import * as echarts from 'echarts';
import 'echarts/lib/chart/line'; // Import line chart
import 'echarts/lib/component/tooltip'; // Import tooltip component
import 'echarts/lib/component/title'; // Import title component
import 'echarts/lib/component/legend'; // Import legend component
import 'echarts/lib/component/toolbox'; // Import toolbox component
import {
  validSubstratesMap,
  validSubtrateMapKeyText,
  substrateLevelPresetMap,
} from '@/maps/config/substrateOrder';
import { substrateLevelMapColor } from '@/maps/config/layerColors';
import { DateFormatter } from '@/dateFormatter';

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
  substrateLevel: {
    type: String,
    default: 'Substrate_coarse',
  },
});

// Reactive state
const chartRef = ref<HTMLElement | null>(null);
const chart = ref<echarts.ECharts | null>(null);

const locale = 'en-US';

const getChartOption = (data: any[], substrateLevel: string) => {
  const selected = validSubstratesMap[substrateLevel].reduce(
    (acc, substrate) => {
      const name = validSubtrateMapKeyText[substrate];
      if (substrateLevelPresetMap[substrateLevel].includes(name)){
        acc[name] = true;
      }
      return acc;
    },
    {} as Record<string, boolean>
  );
  return {
    title: {
      text: 'Timeseries',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      // Simplify legend data to just be an array of strings matching series names
      data: substrateLevelPresetMap[substrateLevel],
      orient: 'horizontal',
      selectedMode: 'multiple',
      bottom: substrateLevel === 'Substrate_coarse' ? 0 : 0,
      selected: substrateLevelPresetMap[substrateLevel].reduce((acc, item) => {
        acc[item] = selected[item];
        return acc;
      }, {} as Record<string, boolean>),
      // Apply colors to legend items through textStyle
      textStyle: {
        rich: data.reduce((acc, item, index) => {
          acc[item.name] = {
            color: substrateLevelMapColor?.[substrateLevel][index]
          };
          return acc;
        }, {})
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: substrateLevel === 'Substrate_coarse' ? '100px' : '150px',
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data[0].dates.map((date: string) =>
        DateFormatter.formatDate(date, {
          locale,
          dateStyle: 'short',
          dateOnly: true,
        })
      ),
    },
    yAxis: {
      type: 'value',
    },
    series: data.filter(data => substrateLevelPresetMap[substrateLevel].includes(data.name)).map((item, index) => ({
      name: item.name,
      type: 'line',
      lineStyle: {
        width: 2,
        color: substrateLevelMapColor?.[substrateLevel][index],
      },
      stack: 'Total',
      data: item.data,
      color: substrateLevelMapColor?.[substrateLevel][index],
      // Add itemStyle to ensure legend interactions work properly
      itemStyle: {
        color: substrateLevelMapColor?.[substrateLevel][index]
      },
      // Add specific emphasis settings
      emphasis: {
        focus: 'series'
      }
    })),
  };
};

const initChart = () => {
  if (chart.value == null && chartRef.value) {
    chart.value = echarts.init(chartRef.value);
  }
  const option = getChartOption(props.rawData, props.substrateLevel);
  chart.value?.setOption(option);
};

// Lifecycle hooks
onMounted(() => {
  initChart();
  
  // Add window resize handler
  const resizeHandler = () => {
    chart.value?.resize();
  };
  
  window.addEventListener('resize', resizeHandler);
  
  // Store the handler reference for proper cleanup
  onUnmounted(() => {
    window.removeEventListener('resize', resizeHandler);
    chart.value?.dispose();
  });
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
  (value) => {
    if (value.length === 0) {
      return;
    }
    initChart();
  },
  { deep: true }
);
</script>

<style scoped></style>
