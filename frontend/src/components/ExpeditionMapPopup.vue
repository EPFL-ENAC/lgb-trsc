<template>
  <div v-if="selectedExpedition" id="expedition-popup" class="popup">
    <div class="btn-group">
      <button class="close-btn" @click="closeExpedition">Back</button>
      <button class="download-btn" @click="() => downloadExpedition()">
        {{ `Download ${selectedExpedition.sampling_site_name} Summary` }}
      </button>
      <div v-if="isDev" class="debug-dropdown">
        <button class="debug-toggle" @click="isDebugOpen = !isDebugOpen">
          {{ isDebugOpen ? 'Hide Debug Info' : 'Show Debug Info' }}
        </button>
        <div v-if="isDebugOpen" class="debug-content">
          <div class="debug-panel">
            <div class="debug-section">
              <h4 class="debug-title">Collection Data</h4>
              <div class="debug-item">
                <span class="debug-label">Expeditions:</span>
                <span class="debug-value">{{
                  selectedExpeditions.length
                }}</span>
              </div>
              <div class="debug-item">
                <span class="debug-label">Location Hash:</span>
                <span class="debug-value">{{
                  selectedExpedition.locationNameHash
                }}</span>
              </div>
            </div>

            <div class="debug-section">
              <h4 class="debug-title">Selected Filters</h4>
              <div class="debug-item">
                <span class="debug-label">Date:</span>
                <span class="debug-value">{{ selectedExpeditionDate }}</span>
              </div>
              <div class="debug-item">
                <span class="debug-label">Year:</span>
                <span class="debug-value">{{ selectedExpeditionYear }}</span>
              </div>
              <div class="debug-item">
                <span class="debug-label">Experiment:</span>
                <span class="debug-value">{{
                  selectedExpeditionExperiment
                }}</span>
              </div>
            </div>

            <div class="debug-section">
              <h4 class="debug-title">Available Options</h4>
              <div class="debug-item">
                <span class="debug-label">Years:</span>
                <span class="debug-value">{{ selectedExpeditionsYears }}</span>
              </div>
              <div class="debug-item">
                <span class="debug-label">Dates:</span>
                <span class="debug-value">{{ selectedExpeditionsDates }}</span>
              </div>
              <div class="debug-item">
                <span class="debug-label">Experiments:</span>
                <span class="debug-value">{{
                  selectedExpeditionsExperiments
                }}</span>
              </div>
            </div>

            <div class="debug-section">
              <h4 class="debug-title">Relationships</h4>
              <div class="debug-item">
                <span class="debug-label">Years by Experiment:</span>
                <pre class="debug-json">{{
                  JSON.stringify(selectedExpeditionsYearsByExperiment, null, 2)
                }}</pre>
              </div>
              <div class="debug-item">
                <span class="debug-label">Dates by Experiment:</span>
                <pre class="debug-json">{{
                  JSON.stringify(selectedExpeditionsDatesByExperiment, null, 2)
                }}</pre>
              </div>
              <div class="debug-item">
                <span class="debug-label">Experiments by Years:</span>
                <pre class="debug-json">{{
                  JSON.stringify(selectedExpeditionsExperimentsByYears, null, 2)
                }}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h2 class="first-expedition-header">
      {{
        headerMap?.[selectedExpedition.experiment] ??
        selectedExpedition.experiment
      }}
      project
    </h2>
    <h3>
      {{ selectedExpedition.reef_area }} -
      {{ selectedExpedition.sampling_site_name }}
    </h3>
    <p>
      {{ selectedExpedition.region_name }} -
      {{ selectedExpedition.event_id }}
    </p>
    <p>
      <span v-if="selectedExpedition.latitude_end">Start</span> Position:
      <span v-if="selectedExpedition.latitude_start">
        N {{ formatCoordinate(selectedExpedition.latitude_start, 'N') }} E
        {{ formatCoordinate(selectedExpedition.longitude_start, 'E') }}
      </span>
    </p>
    <p v-if="selectedExpedition.latitude_end">
      End Position: N
      {{ formatCoordinate(selectedExpedition.latitude_end, 'N') }} E
      {{ formatCoordinate(selectedExpedition.longitude_end, 'E') }}
    </p>
    <p>
      {{
        DateFormatter.formatDate(
          selectedExpeditionsDatesByExperiment[dateSliderIndex],
          {
            locale,
            dateStyle: 'long',
            timeStyle: 'long',
          }
        )
      }}
    </p>
    <p v-if="selectedExpedition.experiment === '3D'">
      Length of the transect: {{ selectedExpedition.length }} m
    </p>
    <p v-if="selectedExpedition.experiment === '3D'">
      Average depth: {{ selectedExpedition.depth ?? 5 }} m
    </p>

    <!-- Add this where you want the date slider to appear -->
    <hr class="expedition-separation-bar" />

    <div
      v-if="
        selectedExpeditionExperiment &&
        selectedExpeditionsDatesByExperiment.length > 0
      "
      class="date-slider-container"
    >
      <p class="date-slider-label">
        Select a date to view expedition data from different time periods
      </p>
      <q-slider
        v-model="dateSliderIndex"
        :min="0"
        :max="selectedExpeditionsDatesByExperiment.length - 1"
        :step="1"
        markers
        :marker-labels="markerFormatter"
        marker-labels-class="marker-label"
        label
        :label-value="
          DateFormatter.formatDate(
            selectedExpeditionsDatesByExperiment[dateSliderIndex]
          )
        "
        @update:model-value="(newValue) => console.log(newValue)"
      />
    </div>
    <div v-if="selectedExpedition.experiment === '3D'">
      <hr class="expedition-separation-bar" />
      <div v-if="sampleSet.length > 0">
        <q-toggle
          :model-value="selectedExpeditionSubstrateLevel"
          true-value="Substrate_coarse"
          false-value="Substrate_intermediate"
          :label="selectedExpeditionSubstrateLevel"
          @update:model-value="setSelectedExpeditionSubstrateLevel"
        ></q-toggle>
        <BarChart3DMappingExpedition
          v-if="isValidSampleSet"
          :raw-data="sampleSet"
          height="400px"
          width="400px"
          :substrate-level="selectedExpeditionSubstrateLevel"
          :tooltip="true"
          :scroll-legend="true"
        />
      </div>
      <hr class="expedition-separation-bar" />
      <StackedLine3DMappingExpeditions
        v-if="isValidSampleSet"
        :raw-data="timeSeriesSet"
        height="400px"
        width="400px"
        :substrate-level="selectedExpeditionSubstrateLevel"
        :tooltip="true"
        :scroll-legend="true"
      />
      <p>Change in Coral cover since</p>
      <!-- Note: Using random placeholder values. Will be replaced with actual data. -->
      <div class="coral-changes">
        <div v-for="(value, key) in summaryStats" :key="key" class="coral-change-item">
          <div class="coral-type">{{ key }}</div>
          <div class="change-indicator">
            <q-icon
              :name="value.icon as string"
              :color="value.color as string"
              size="md"
            />
            <span class="percentage" :class="value.color"
              >{{ value.value }}%</span
            >
          </div>
        </div>
      </div>
      <hr class="expedition-separation-bar" />
    </div>
    <div v-else>No 3D Mapping data available</div>
    <hr class="expedition-separation-bar" />

    <p>
      Data generated with the
      <a href="https://josauder.github.io/deepreefmap/" target="_blank"
        >Deep Reef Map</a
      >
      methodology
    </p>
    <div class="card">
      <!-- <img src="/seacape-genomics.png" alt="Seascape Genomics" /> -->
      <p>In Collaboration with</p>
      <div style="display: flex; gap: 1rem">
        <div
          v-for="community in computedCountryCommunities"
          :key="community.name"
          class="logo-item"
        >
          <a :href="community.url" target="_blank" class="logo-item-link">
            <q-img
              :src="community.logo"
              :alt="community.name"
              fit="contain"
              style="height: 150px; width: 150px"
            >
            </q-img>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
// for now we hard code the data for Djibouti 3D Mapping
import { useMapStore } from '@/stores/mapStore';
import BarChart3DMappingExpedition from '@/components/BarChart3DMappingExpedition.vue';
import StackedLine3DMappingExpeditions from '@/components/StackedLine3DMappingExpeditions.vue';
import { storeToRefs } from 'pinia';
import communities from '@/assets/communities';
import { DateFormatter } from '@/dateFormatter';
import { substrateLevelPresetMap } from '@/maps/config/substrateOrder';
import {
  mdiTriangleSmallDown,
  mdiTriangleSmallUp,
} from '@quasar/extras/mdi-v7';

const isDev = ref(import.meta.env.DEV);
const locale = 'en-US';
const headerMap: Record<string, string> = {
  '3D': '3D Mapping',
  eDNA: 'eDNA',
  seascape_genomics: 'Seascape Genomics',
};

function markerFormatter(index: number): string {
  return DateFormatter.formatDate(
    selectedExpeditionsDatesByExperiment.value[index],
    {
      locale,
      dateStyle: 'short',
      dateOnly: true,
    }
  );
}

const formatCoordinate = (decimal: number): string => {
  const absolute = Math.abs(decimal);
  const degrees = Math.floor(absolute);
  const minutes = (absolute - degrees) * 60;

  return `${degrees.toString().padStart(2, '0')}º${minutes.toFixed(3)}'`;
};

const isDebugOpen = ref(false);

const mapStore = useMapStore();
const {
  selectedExpedition,
  selectedExpeditions,
  selectedExpeditionsYears,
  selectedExpeditionsExperiments,
  selectedExpeditionsDates,
  selectedExpeditionYear,
  selectedExpeditionExperiment,
  selectedExpeditionDate,
  selectedExpeditionsYearsByExperiment,
  selectedExpeditionsDatesByExperiment,
  selectedExpeditionsExperimentsByYears,
  selectedExpeditionSubstrateLevel,
  dateSliderIndex,
  isValidSampleSet,
  sampleSet,
  timeSeriesSet,
} = storeToRefs(mapStore);
const {
  closeExpedition,
  downloadExpedition,
  setSelectedExpeditionSubstrateLevel,
} = mapStore;

const summaryStats = computed(() => {
  function calculatePercentageChange(
    currentValue: number,
    previousValue: number
  ): number {
    return ((currentValue - previousValue) / previousValue) * 100;
  }

  function calculatePercentageChangeFromDataSeries(dataSerie: number[]) {
    // should be latest elements first
    const lastIndex = dataSerie.length - 1;
    if (lastIndex < 1) {
      return 0;
    }
    const lastLastIndex = 0;
    return calculatePercentageChange(
      dataSerie[lastIndex],
      dataSerie[lastLastIndex]
    );
  }
  const authorized_ids = substrateLevelPresetMap[selectedExpeditionSubstrateLevel.value];
  const results = authorized_ids.reduce((acc, authorized_id, index) => {
    acc[authorized_id] = calculatePercentageChangeFromDataSeries(
      timeSeriesSet.value.filter((item) => item.name === authorized_id)[0].data
    );
    return acc;
  }, {} as Record<string, number>);
  // we should ceil the values to 2 decimal places
  authorized_ids.forEach((authorized_id) => {
    results[authorized_id] = Math.ceil(results[authorized_id] * 100) / 100;
  });
  return authorized_ids.reduce((acc, authorized_id) => {
    if (!results[authorized_id]) {
      return acc;
    }
    if (authorized_id.includes('alive')) {
      acc[authorized_id] = {
        value: results[authorized_id],
        icon: results[authorized_id] >= 0 ? mdiTriangleSmallUp : mdiTriangleSmallDown,
        color: results[authorized_id] >= 0 ? 'positive' : 'negative',
      };
    } else {
      acc[authorized_id] = {
        value: results[authorized_id],
        icon: results[authorized_id] >= 0 ? mdiTriangleSmallUp : mdiTriangleSmallDown,
        color: results[authorized_id] <= 0 ? 'positive' : 'negative',
      };
    }
    return acc;
  }, {} as Record<string, Record<string, string | number>>);
});

const countryLower = computed(
  () =>
    selectedExpedition.value?.country.toLowerCase().replaceAll(' ', '_') ?? ''
);

const computedCountryCommunities = computed(() => {
  return communities.filter(
    (community) =>
      community.country.toLowerCase().replaceAll(' ', '_') ===
      countryLower.value
  );
});
</script>

<style scoped lang="scss">
.expedition-separation-bar {
  border: 1px solid #e0e0e0;
}
.btn-group {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  gap: 1rem;
  margin-right: 60px;
}
.date-slider-container {
  margin-top: 1rem;
  // Ensure container has enough padding
  padding: 0 20px;
}
:deep(.marker-label) {
  font-size: 0.8rem;
  // Prevent overflow
  overflow: visible;
  white-space: nowrap;

  // Adjust positioning
  &.q-slider__marker-label {
    // Add some space between labels and slider
    margin-top: 8px;

    // Handle text overflow
    max-width: 100px; // Adjust as needed
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
h2 {
  color: black;
  font-size: 1.4rem;
  line-height: 1.4rem;
  font-weight: bold;
  font-style: italic;
  margin: 0px;
  margin-bottom: 0.1rem;
  padding: 0;
}
h3 {
  color: red;
  font-size: 1.2rem;
  margin: 0rem;
  margin-bottom: 0.1rem;
}
p {
  margin: 0;
  font-size: 1rem;
}
.popup {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: left;
  position: relative;
}

.close-btn {
  background-color: white;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 5px 10px;
  margin-bottom: 10px;
  position: absolute;
  top: 10px;
  right: 10px;
}

.download-btn {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.debug-panel {
  background-color: #f8f9fa;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 16px;
  font-family: monospace;
  font-size: 0.9rem;
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.1);
}

.debug-section {
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.debug-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.debug-title {
  margin: 0 0 8px 0;
  font-size: 1rem;
  color: #333;
  font-weight: bold;
}

.debug-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 6px;
}

.debug-label {
  color: #666;
  margin-right: 8px;
  font-weight: bold;
}

.debug-value {
  color: #0066cc;
  word-break: break-word;
}

.debug-json {
  background-color: #f0f0f0;
  padding: 8px;
  border-radius: 4px;
  margin: 4px 0;
  max-height: 120px;
  overflow: auto;
  font-size: 0.85rem;
  white-space: pre-wrap;
}

.coral-changes {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
  flex-wrap: wrap;
  gap: 15px;
}

.coral-change-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 15px;
  background: #f5f5f5;
  border-radius: 8px;
  min-width: 120px;
}

.coral-type {
  font-weight: bold;
  margin-bottom: 5px;
}

.change-indicator {
  display: flex;
  align-items: center;
  gap: 5px;
}

.percentage {
  font-size: 1.1rem;
  font-weight: bold;
}

.positive {
  color: #21ba45;
}
.negative {
  color: #c10015;
}
.warning {
  color: #f2c037;
}
</style>
