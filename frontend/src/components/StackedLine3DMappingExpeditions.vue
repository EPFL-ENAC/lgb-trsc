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
} from '@/maps/config/substrateOrder';
import { substrateLevelMapColor } from '@/maps/config/layerColors';

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

// Methods
const preselectedLegend = ['live coral', 'dead coral', 'bleached coral'];
const getChartOption = (data: any[]) => {
  return {
    title: {
      text: 'Stacked Line',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: data.map((item) => item.name),
      selected: validSubstratesMap[props.substrateLevel].reduce(
        (acc, substrate) => {
          acc[validSubtrateMapKeyText[substrate]] = preselectedLegend.includes(validSubtrateMapKeyText[substrate]);
          return acc;
        },
        {} as Record<string, boolean>
      ),
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
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
      data: data[0].dates,
    },
    yAxis: {
      type: 'value',
    },
    series: data.map((item) => ({
      name: item.name,
      type: 'line',
      stack: 'Total',
      data: item.data,
    })),
  };
};

const initChart = () => {
  if (chart.value == null && chartRef.value) {
    chart.value = echarts.init(chartRef.value);
  }
  const option = getChartOption(props.rawData);
  chart.value?.setOption(option);
};

// Lifecycle hooks
onMounted(() => {
  initChart();
});

onUnmounted(() => {
  chart.value?.dispose();
});

// Watchers
watch(() => props.rawData, (value) => {
  if (value.length === 0) {
    return;
  }
  initChart();
}, { deep: true });
</script>

<style scoped></style>