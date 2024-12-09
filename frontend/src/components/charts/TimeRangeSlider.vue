<template>
  <div>
    <div class="slider-container">
      <div class="row">
        <q-btn-dropdown
          v-model="selectedDateRange"
          flat
          icon="date_range">
          <q-list>
            <template v-for="range in DateRangeOptions" :key="range.value">
              <q-item clickable v-close-popup @click="onDateRangeOption(range.value)">
                <q-item-section>
                  <q-item-label>{{ $t(range.label) }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-list> 
        </q-btn-dropdown>
        <q-btn
          :class="isDefault ? 'hidden' : ''"
          round
          icon="restore"
          @click="resetSlider"
          hidden
          flat
        ></q-btn>
        <q-space />
        <q-btn
          v-if="player"
          round
          :icon="playing ? 'pause' : 'play_arrow'"
          @click="togglePlay"
          :disable="isDefault"
          flat
        />
      </div>
    </div>
    <div id="slider-round" ref="sliderHTML" class="slider-styled" />
    <time-range-dialog v-model="showDateSelector" />
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'TimeRangeSlider',
});
</script>
<script setup lang="ts">
import TimeRangeDialog from 'src/components/charts/TimeRangeDialog.vue';
import noUiSlider from 'nouislider';
import { PipsMode, type API as SliderAPI } from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { DateRangeOptions } from 'src/utils/options';

const props = defineProps<{
  step?: number;
  player?: boolean;
}>();

const selectedDateRange = ref();
const showDateSelector = ref(false);
const slider = ref<SliderAPI | null>(null);
const sliderHTML = ref<HTMLDivElement | null>(null);
const playing = ref(false);
let playInterval: NodeJS.Timeout | undefined;

const timeseriesStore = useTimeseriesChartsStore();

const defaultStep = 60 * 60 * 1000; //step is hour


const updateSlider = () => {
  if (slider.value) {
    slider.value.destroy(); // Destroy existing slider instance
  }

  if (sliderHTML.value) {
    const minMs = timeseriesStore.MIN_DATE.getTime();
    const maxMs = timeseriesStore.MAX_DATE.getTime();

    slider.value = noUiSlider.create(sliderHTML.value, {
      start: [minMs, maxMs],
      tooltips: [formatterTooltip, formatterTooltip],
      connect: true,
      behaviour: 'drag',
      step: props.step || defaultStep,
      range: {
        min: new Date(timeseriesStore.timeRange[0]).getTime(),
        max: new Date(timeseriesStore.timeRange[1]).getTime(),
      },
      pips: {
        mode: PipsMode.Steps,
        filter: filterPips,
        density: 100, // Reduced density for better performance
        format: formatter,
      },
    });
    slider.value.on('update', (values) => {
      timeseriesStore.lastUpdatedChartID = 'timeRangeSlider';
      timeseriesStore.timeRange = values.map(
        (val) => new Date(Number(val)),
      ) as [Date, Date];
    });
  }
};

watch(
  () => timeseriesStore.timeRange,
  () => {
    if (
      slider.value &&
      timeseriesStore.lastUpdatedChartID !== 'timeRangeSlider'
    ) {
      const [min, max] = timeseriesStore.timeRange.map((date) =>
        date.getTime(),
      );
      slider.value.set([min, max]);
    }
  },
);

const play = () => {
  if (!slider.value || playing.value) return;
  playing.value = true;
  const [min, max] = (slider.value.get() as [string, string]).map(Number);
  if (max === timeseriesStore.MAX_DATE.getTime()) {
    const range = max - min;
    slider.value.set([
      timeseriesStore.MIN_DATE.getTime(),
      timeseriesStore.MIN_DATE.getTime() + range,
    ]);
  }
  playInterval = setInterval(() => {
    if (slider.value) {
      const current = (slider.value.get() as [string, string]).map(Number);
      if (current[1] >= timeseriesStore.MAX_DATE.getTime()) {
        stop();
      } else {
        slider.value.set([
          current[0] + (props.step || defaultStep * 12),
          current[1] + (props.step || defaultStep * 12),
        ]);
      }
    }
  }, 1000); // Adjusted interval to reduce frequent updates
};

const stop = () => {
  playing.value = false;
  if (playInterval) clearInterval(playInterval);
};

const togglePlay = () => {
  if (playing.value) stop();
  else play();
};

const isDefault = computed(() => {
  return (
    timeseriesStore.timeRange[0].getTime() ===
      timeseriesStore.MIN_DATE.getTime() &&
    timeseriesStore.timeRange[1].getTime() ===
      timeseriesStore.MAX_DATE.getTime()
  );
});

const resetSlider = () => {
  if (slider.value) {
    slider.value.set([
      timeseriesStore.MIN_DATE.getTime(),
      timeseriesStore.MAX_DATE.getTime(),
    ]);
  }
};

onUnmounted(() => {
  if (playInterval) clearInterval(playInterval);
});

watch(
  () => [timeseriesStore.MIN_DATE, timeseriesStore.MAX_DATE, props.step],
  () => {
    updateSlider();
  },
  { deep: true },
);

onMounted(() => {
  updateSlider();
});

const formatter = {
  to: (value: number) => {
    const date = new Date(value);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    // const year = date.getFullYear().toString().slice(-2); // Get last two digits of year

    // Start/end of the range
    if (timeseriesStore.MIN_DATE.getTime() === value) {
      return `${day}/${month}`;
    }
    if (timeseriesStore.MAX_DATE.getTime() === value) {
      return ''; // Hide the last to avoid overlap
    }

    const closeToFirstOfMonth = Number(day) !== 1; // && (Number(day) < 3 || Number(day) > 28); // When pips are close to beginning of month it can reduce readability

    return closeToFirstOfMonth ? '' : `${day}/${month}`;
  },
  from: (value: string) => {
    const [day, month, year2] = value.split('/').map(Number);
    const year = year2 ? 2000 + year2 : new Date().getFullYear(); // Use the current year if not in string
    return new Date(year, month - 1, day).getTime();
  },
};

const formatterTooltip = {
  to: (value: number) => {
    const date = new Date(value);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  },
  from: (value: string) => {
    const [datePart, timePart] = value.split(' ');
    const [day, month, year] = datePart.split('/').map(Number);
    const [hours, minutes] = timePart.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes).getTime();
  },
};

const filterPips = (value: number) => {
  if (
    timeseriesStore.MIN_DATE.getTime() === value ||
    timeseriesStore.MAX_DATE.getTime() === value
  ) {
    return 1; // Start/end of the range
  }

  const date = new Date(value);
  const day = date.getUTCDate();
  const weekDay = date.getUTCDay();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();

  if (day === 1 && hours === 0 && minutes === 0 && seconds === 0) {
    return 1; // First of the month
  } else if (weekDay === 0 && hours === 0 && minutes === 0 && seconds === 0) {
    return 2; // First day of the week (Sunday)
  } else if (hours === 0 && minutes === 0 && seconds === 0) {
    return 0; // Start of the day
  } else {
    return -1; // Hide pip
  }
};

const onShowDateSelector = () => {
  showDateSelector.value = true;
};

const onDateRangeOption = (value: string) => {
  if (value === 'custom') {
    onShowDateSelector();
  } else {
    const now = new Date();
    now.setMinutes(0, 0, 0);
    // Add one hour to round up to the nearest next hour
    now.setHours(now.getHours() + 1);
    const range = Number(value.slice(0, -1));
    const newFromDate = new Date(now.getTime() - range * 24 * 60 * 60 * 1000);
    const newToDate = now;
    timeseriesStore.timeRange = [newFromDate, newToDate];
  }
};
</script>
<style scoped>
.slider-container {
  position: relative;
}

.button-container {
  position: absolute;
  top: -45px;
  right: 0; /* Aligns the button to the top-right corner */
  margin: 0; /* Adjust margin as needed */
}

.slider-styled {
  position: relative;
  width: 100%; /* Ensures the slider expands to fill the container */
  height: 10px;
  padding: 0 7px;
}

.drag-icon {
  position: relative;
}

:deep() .noUi-value-large {
  padding-top: 6px;
  color: var(--q-dark);
  font-weight: bold;
  font-size: smaller;
}

:deep() .noUi-value-sub {
  padding-top: 2px;
  color: var(--q-dark);
}

:deep() .slider-styled {
  height: 10px;
  padding: 0 7px;
}

:deep() .noUi-handle:before,
:deep() .noUi-handle:after {
  display: none;
}

:deep() .slider-styled .noUi-connect {
  background: var(--q-primary);
}

:deep() .slider-styled .noUi-handle {
  height: 18px;
  width: 18px;
  top: -5px;
  right: -9px; /* half the width */
  border-radius: 9px;
}

:deep() .noUi-touch-area {
  height: 250%;
  width: 250%;
  cursor: col-resize;
  z-index: 1000;
}

:deep() .noUi-handle-lower .noUi-touch-area {
  transform: translate(-50%, -25%);
}
:deep() .noUi-handle-upper .noUi-touch-area {
  transform: translate(0, -25%);
}
:deep() .noUi-pips {
  font-family: Arial, Helvetica, sans-serif;
}

:deep() .noUi-pips-horizontal {
  padding: 4px 0;
}

:deep() .noUi-tooltip {
  display: none;
}
:deep() .noUi-active .noUi-tooltip {
  display: block;
}
</style>
