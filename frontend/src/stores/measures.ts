import { Datasets, SensorData } from 'src/models';
import { api } from 'src/boot/api';
import { roundToNearestHours, addDays } from 'date-fns';

export const useMeasuresStore = defineStore('measures', () => {
  const datasets = ref<Datasets>();
  const loading = ref(false);
  const sensors = ref<SensorData[]>([]);
  const sensorsSampled = ref<SensorData[]>([]);
  const startDate = ref<Date>();
  const endDate = ref<Date>();
  const sensorsRaw = ref<SensorData[]>([]);

  const timeseriesStore = useTimeseriesChartsStore();

  watch(() => timeseriesStore.timeRange, async () => {
    const startDateRange = timeseriesStore.timeRange[0];
    startDateRange.setMinutes(0, 0, 0);
    const endDateRange = timeseriesStore.timeRange[1];
    endDateRange.setMinutes(0, 0, 0);
    // Add one hour to round up to the nearest next hour
    endDateRange.setHours(endDateRange.getHours() + 1);
    // Calculate the time range in hours
    const timeRangeHours = (endDateRange.getTime() - startDateRange.getTime()) / (1000 * 60 * 60);
    if (timeRangeHours < 7 * 24) {
      // check if the time range is included in the current time range
      if (startDate.value && endDate.value && startDateRange.getTime() >= startDate.value.getTime() && endDateRange.getTime() <= endDate.value.getTime()) {
        //console.debug('Time range is included in the current time range');
        return;
      }
      startDate.value = roundToNearestHours(startDateRange);
      endDate.value = addDays(startDate.value, 7);
      if (loading.value) return;
      loadDatasetsRaw();
    } else {
      startDate.value = undefined;
      endDate.value = undefined;
      sensors.value = sensorsSampled.value;
    }
  });

  async function loadDatasets() {
    if (datasets.value) return Promise.resolve();

    loading.value = true;
    sensors.value = [];
    sensorsSampled.value = [];
    const response = await api.get('measures/datasets');
    datasets.value = response.data;

    let loaded = 0;
    const promises: Promise<void>[] = [];
    datasets.value?.sensors.forEach((sensor) => {
      promises.push(api.get(`measures/dataset/${sensor.name}`).then((response) => {
        sensorsSampled.value.push(response.data);
      }).finally(() => {
        loaded++;
        if (loaded === datasets.value?.sensors.length) {
          loading.value = false;
          sensors.value = sensorsSampled.value;
        }
      }));
    });
    return Promise.all(promises);
  }

  async function loadDatasetsRaw() {
    loading.value = true;
    sensorsRaw.value = [];
    
    let loaded = 0;
    const promises: Promise<void>[] = [];
    datasets.value?.sensors.forEach((sensor) => {
      promises.push(api.get(`measures/dataset/${sensor.name}`, {
        params: {
          start: startDate.value?.toISOString(),
          end: endDate.value?.toISOString(),
        },
      }).then((response) => {
        const data = response.data as SensorData;
        sensorsRaw.value.push(data);
      }).finally(() => {
        loaded++;
        if (loaded === datasets.value?.sensors.length) {
          loading.value = false;
          sensors.value = sensorsRaw.value;
        }
      }));
    });
    return Promise.all(promises);
  }

  return {
    loading,
    datasets,
    sensors,
    loadDatasets,
  };
});
