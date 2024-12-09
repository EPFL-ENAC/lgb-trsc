<template>
  <q-page id="q-page-content" style="display: flex;">
    <div id="tooltip-container" class="flex"></div>

    <div class="row" style="flex: 1;">
      <div class="col-12 col-md-3 bg-grey-2">
        <q-card bordered class="q-ma-sm q-mb-md">
          <div style="height: 250px">
            <maplibre-map
              position
              :center="[6.57, 46.5225]"
              :zoom="15"
              @map:loaded="onMapLoaded"
            />
          </div>
          <div>
            <q-btn-group flat spread class="q-ma-none">
              <template v-for="sensor in SensorSpecs" :key="sensor.color">
                <q-btn-dropdown
                  v-if="sensor.label !== 'D'"
                  size="14px"
                  :label="`Sensors ${sensor.label}`"
                  :title="sensor.title"
                  no-caps
                  class="text-grey-3"
                  :style="`background-color: ${sensor.color};`"
                >
                  <q-list>
                    <q-item dense class="q-pa-none">
                      <q-item-section class="q-pa-none">
                        <q-btn-group flat spread>
                          <q-btn flat size="sm" :label="$t('all')" @click="onApplySensors(sensor.label)" />
                          <q-btn flat size="sm" :label="$t('clear')" @click="onRemoveSensors(sensor.label)" />
                        </q-btn-group>
                      </q-item-section>
                    </q-item>
                    <q-separator />
                    <template v-for="(location, idx) in sensor.locations" :key="location">
                      <q-item dense clickable @click="onToggleSensorLocation(location)">
                        <q-item-section avatar>
                          <q-icon color="secondary" :name="filtersStore.sensors.includes(location) ? 'check_box' : 'check_box_outline_blank'" />
                        </q-item-section>
                        <q-item-section no-wrap>
                          <span>{{ location }}</span>
                        </q-item-section>
                        <q-item-section side>
                          <q-icon name="circle" size="xs" :style="`color: ${sensor.colors[idx]}`" />
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-list>
                </q-btn-dropdown>
              </template>
            </q-btn-group>
          </div>
        </q-card>
        <q-list>
          <q-item-label header class="text-h6">{{
            $t('parameters')
          }}</q-item-label>
          <q-list separator dense>
            <q-item
              v-ripple
              v-for="measure in MeasureOptions"
              :key="measure.key"
            >
              <q-item-section>
                <div class="row">
                  <q-checkbox
                    v-model="measuresVisible[measure.key]"
                    :disable="measuresStore.loading"
                    :label="measure.label"
                  />
                  <template
                    v-for="spec in getSensorSpec(measure.key)"
                    :key="spec.label"
                  >
                    <q-icon
                      name="circle"
                      :style="`color: ${spec.color};`"
                      :title="`${spec.label}: ${spec.title}`"
                      class="on-right"
                      style="margin-top: 14px"
                    />
                  </template>
                  <q-btn
                    v-if="measuresVisible[measure.key]"
                    :disable="measuresStore.loading"
                    icon="fullscreen"
                    color="secondary"
                    flat
                    dense
                    rounded
                    size="sm"
                    @click="onShowMeasure(measure.key)"
                    class="on-right"
                  />
                </div>
              </q-item-section>
            </q-item>
          </q-list>
          <q-item-label header class="text-h6 q-pb-none">{{
            $t('time_range')
          }}</q-item-label>
          <q-item>
            <div class="full-width q-mb-xl">
              <time-range-slider player class="q-ml-md q-mr-md" />
            </div>
          </q-item>
          <q-item-label header class="text-h6 q-pb-none">
            <span>{{ $t('scenarios') }}</span>
          </q-item-label>
          <q-item>
            <div v-if="scenariiStore.scenarii.length === 0" class="text-help">
              {{ $t('scenario_info') }}
            </div>
            <div v-else>
              <q-chip
                v-for="scenario in scenariiStore.scenarii"
                :key="`${scenario.watershed}:${scenario.name}`"
                removable
                @remove="onRemoveScenario(scenario)"
                size="sm"
              >
                {{ `${scenario.watershed}: ${scenario.name}` }}
              </q-chip>
            </div>
          </q-item>
    
        </q-list>
      </div>
      <div class="col-12 col-md-9">
        <q-toolbar>
          <template v-for="range in DateRangeOptions" :key="range.value">
            <q-btn
              v-if="range.value !== 'custom'"
              :disable="measuresStore.loading"
              :label="$t(range.label)"
              :value="range.value"
              size="sm"
              flat
              no-caps
              color="grey-6"
              @click="onDateRangeOption(range.value)"
            />
          </template>
          <q-btn
            :disable="measuresStore.loading"
            :label="$t('all')"
            size="sm"
            flat
            no-caps
            color="grey-6"
            @click="onDateRangeOption(null)"
          />
          <q-spinner-dots v-if="measuresStore.loading" color="primary" size="md" class="on-right"/>
          <q-space />
          <span class="text-help on-left" style="font-size: smaller;">Charts height</span>
          <q-slider
            v-model="chartHeight"
            :disable="measuresStore.loading"
            :min="100"
            :max="500"
            :step="50"
            :label-value="chartHeight + ' px'"
            switch-label-side
            debounce="300"
            class="q-mr-lg"
            style="max-width: 200px;" />
          <q-btn-toggle
            v-model="colsSpan"
            :disable="measuresStore.loading"
            toggle-color="primary"
            :options="[
              {value: '12', slot: 'one'},
              {value: '6', slot: 'two'},
            ]"
            size="xs"
          >
            <template v-slot:one>
              <div class="row items-center no-wrap">
                <q-icon name="splitscreen" />
              </div>
            </template>

            <template v-slot:two>
              <div class="row items-center no-wrap">
                <q-icon name="grid_view" />
              </div>
            </template>
          </q-btn-toggle>
        </q-toolbar>
        <div class="row">
          <template v-for="measure in MeasureOptions" :key="measure.key">
            <div v-show="measuresVisible[measure.key]" :class="colsClass">
              <q-card square bordered flat>
                <q-card-section>
                  <timeseries-chart
                    :measure="measure.key"
                    :label="measure.label"
                    :unit="measure.unit"
                    :precision="measure.precision"
                    :height="chartHeight"
                    stacked
                  />
                </q-card-section>
              </q-card>
            </div>
          </template>
        </div>
      </div>
    </div>

    <scenarii-dialog v-model="showScenario" />
    <sensor-dialog v-model="showSensor" />

    <q-dialog v-if="measureSelected" v-model="showMeasure" maximized>
      <q-card>
        <q-bar class="bg-white q-ma-md">
          <div class="text-h6">
            {{ MeasureOptions.find((m) => m.key === measureSelected)?.label }}
          </div>
          <q-space />
          <q-btn dense flat icon="close" size="lg" v-close-popup> </q-btn>
        </q-bar>
        <q-card-section>
          <timeseries-chart
            :measure="measureSelected"
            :label="
              MeasureOptions.find((m) => m.key === measureSelected)?.label || ''
            "
            :height="80"
            :height-unit="'vh'"
            :debounce-time="30"
            class="q-pa-sm"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import MaplibreMap from 'src/components/MaplibreMap.vue';
import { Map } from 'maplibre-gl';
import TimeseriesChart from 'src/components/charts/TimeseriesChart.vue';
import TimeRangeSlider from 'src/components/charts/TimeRangeSlider.vue';
import ScenariiDialog from 'src/components/ScenariiDialog.vue';
import SensorDialog from 'src/components/SensorDialog.vue';
import { Settings } from 'src/stores/settings';
import {
  MeasureOptions,
  SensorSpecs,
} from 'src/utils/options';
import { Scenario } from 'src/stores/scenarii';
import { DateRangeOptions } from 'src/utils/options';

const timeseriesStore = useTimeseriesChartsStore();
const settingsStore = useSettingsStore();
const mapStore = useMapStore();
const filtersStore = useFiltersStore();
const measuresStore = useMeasuresStore();
const scenariiStore = useScenariiStore();

const showScenario = ref(false);
const showSensor = ref(false);
const showMeasure = ref(false);
const measureSelected = ref<string>();
const colsSpan = ref('6');
const colsClass = computed(() => `col-12 col-md-${colsSpan.value}`);
const chartHeight = ref(200);

const measuresVisible = ref<Record<string, boolean>>(
  settingsStore.settings?.measuresVisible || {},
);

onMounted(() => {
  measuresStore.loadDatasets();
});

watch(
  () => mapStore.bvSelected,
  () => {
    if (mapStore.bvSelected) {
      showScenario.value = true;
    }
  },
);

watch(
  () => mapStore.sensorSelected,
  () => {
    if (mapStore.sensorSelected) {
      showSensor.value = true;
    }
  },
);

watch(
  [() => scenariiStore.scenarii, () => filtersStore.sensors],
  () => {
    mapStore.applyState();
  },
  { deep: true },
);

watch(() => measuresVisible.value, onMeasureVisibilityChange, { deep: true });

function onMapLoaded(map: Map) {
  mapStore.initLayers(map).then(() => {
    mapStore.applyState();
  });
}

function onMeasureVisibilityChange() {
  settingsStore.saveSettings({
    measuresVisible: measuresVisible.value,
  } as Settings);
}

function onShowMeasure(measure: string) {
  measureSelected.value = measure;
  showMeasure.value = true;
}

function getSensorSpec(measure: string) {
  return SensorSpecs.filter((opt) => opt.measures.includes(measure));
}

function onApplySensors(family: string) {
  filtersStore.applySensors(SensorSpecs.find((ss) => ss.label === family)?.locations);
}

function onRemoveSensors(family: string) {
  filtersStore.removeSensors(SensorSpecs.find((ss) => ss.label === family)?.locations);
}

function onToggleSensorLocation(location: string) {
  filtersStore.toggleSensor(location);
}

function onRemoveScenario(scenario: Scenario) {
  scenariiStore.removeScenario(scenario);
}

const onDateRangeOption = (value: string | null) => {
  if (value === null) {
    timeseriesStore.timeRange = [timeseriesStore.MIN_DATE, timeseriesStore.MAX_DATE];
    return;
  }
  const now = new Date();
  now.setMinutes(0, 0, 0);
  // Add one hour to round up to the nearest next hour
  now.setHours(now.getHours() + 1);
  const range = Number(value.slice(0, -1));
  const newFromDate = new Date(now.getTime() - range * 24 * 60 * 60 * 1000);
  const newToDate = now;
  timeseriesStore.timeRange = [newFromDate, newToDate];
};
</script>
