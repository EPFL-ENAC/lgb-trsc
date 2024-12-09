import { defineStore } from 'pinia';

export const useFiltersStore = defineStore(
  'filters',
  () => {
    const sensors = ref<string[]>([]);

    function reset() {
      sensors.value = [];
    }

    function toggleSensor(id: string) {
      if (sensors.value.includes(id)) {
        sensors.value = sensors.value.filter((val) => val !== id);
      } else {
        sensors.value.push(id);
        sensors.value.sort();
      }
    }

    function applySensors(ids: string[] | undefined) {
      if (!ids) return;
      // merge ids into on array
      const merged = [ ...sensors.value, ...ids]
      // unique values
      sensors.value = merged.filter((value, index, array) => array.indexOf(value) === index);
    }

    function removeSensors(ids: string[] | undefined) {
      if (!ids) return;
      sensors.value = sensors.value.filter((value) => !ids.includes(value));
    }

    return {
      sensors,
      reset,
      toggleSensor,
      applySensors,
      removeSensors,
    };
  },
  { persist: true },
);
