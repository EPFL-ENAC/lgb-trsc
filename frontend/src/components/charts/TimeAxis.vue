<template>
  <div>
    <div :style="`height: 40px; width: 100%;`">
      <e-charts
        ref="chart"
        autoresize
        group="timeseries"
        :init-options="initOptions"
        :option="option"
        :update-options="updateOptions"
        :loading="loading"
        @datazoom="onDataZoomChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'TimeAxis',
});
</script>

<script setup lang="ts">
import ECharts from 'vue-echarts';
import type { EChartsOption, ECElementEvent } from 'echarts';
import { use } from 'echarts/core';
import { LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { initOptions, updateOptions } from './utils';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DataZoomComponent,
} from 'echarts/components';

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DataZoomComponent,
]);

const measuresStore = useMeasuresStore();
const timeseriesStore = useTimeseriesChartsStore();

const chart = shallowRef<typeof ECharts | null>(null);

const option = ref<EChartsOption>({});
const loading = ref(false);

function initChartOptions() {
  if (measuresStore.loading) {
    return;
  }
  option.value = {};
  buildOptions();
}

onMounted(() => {
  initChartOptions();
});

watch([() => measuresStore.loading], () => {
  initChartOptions();
});

watch(() => timeseriesStore.timeRange, onRangeChange);

function onRangeChange() {
  if (chart.value !== null && timeseriesStore.timeRange !== undefined) {
    chart.value.dispatchAction({
      type: 'dataZoom',
      dataZoomIndex: 0,
      startValue: timeseriesStore.timeRange[0],
      endValue: timeseriesStore.timeRange[1],
    });
  }
}

const onDataZoomChange = (e: ECElementEvent) => {
  initChartOptions();
};

function buildOptions() {
  loading.value = true;
  const newOption: EChartsOption = {
    renderer: 'canvas',
    animation: false,
    grid: [
      {
        top: 0,
        left: 60,
        right: 10,
        bottom: 40,
      },
    ],
    xAxis: [
      {
        type: 'time',
        min: timeseriesStore.timeRange[0],
        max: timeseriesStore.timeRange[1],
        axisLabel: {
          formatter: {
            month: '{monthStyle|{dd}/{MM}}',
            day: '{dd}/{MM}',
            hour: '{hourStyle|{HH}:{mm}}',
            minute: '{mm}',
          },
          rich: {
            monthStyle: {
              fontWeight: 'bolder',
            },
            hourStyle: {
              color: 'silver',
            },
          },
        },
      },
    ],
    yAxis: {
      type: 'value',
    },
    series: [],
  };

  option.value = newOption;
  loading.value = false;
}
</script>
