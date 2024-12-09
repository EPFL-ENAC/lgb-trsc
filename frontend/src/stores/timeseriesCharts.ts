import { defineStore } from 'pinia';

export type TimeseriesChartsParams = {
  timeRange: [Date, Date];
  axisPointer: Date | undefined;
  lastUpdatedChartID: string | undefined;
  lastUpdatedPointerID: string | undefined;
  MIN_DATE: Date;
  MAX_DATE: Date;
};

const MIN_DATE = new Date('2024-04-08T12:00:00.000Z');
const MAX_DATE = new Date();
MAX_DATE.setMinutes(0, 0, 0);
// Add one hour to round up to the nearest next hour
MAX_DATE.setHours(MAX_DATE.getHours() + 1);
const MIN_DATE_MS = MIN_DATE.getTime();
const MAX_DATE_MS = MAX_DATE.getTime();
const DATE_RANGE_MS = MAX_DATE_MS - MIN_DATE_MS;

export const useTimeseriesChartsStore = defineStore('timeseriesCharts', () => {
  const timeRange = ref<[Date, Date]>([MIN_DATE, MAX_DATE]);
  const axisPointer = ref<Date | undefined>(undefined);
  const lastUpdatedChartID = ref<string | undefined>(undefined);
  const lastUpdatedPointerID = ref<string | undefined>(undefined);

  function reset() {
    timeRange.value = [MIN_DATE, MAX_DATE];
    axisPointer.value = undefined;
    lastUpdatedChartID.value = undefined;
    lastUpdatedPointerID.value = undefined;
  }

  return {
    timeRange,
    axisPointer,
    lastUpdatedChartID,
    lastUpdatedPointerID,
    MIN_DATE,
    MAX_DATE,
    MIN_DATE_MS,
    MAX_DATE_MS,
    DATE_RANGE_MS,
    reset,
  };
});
