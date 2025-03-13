<template>
  <div v-if="selectedExpedition" class="popup">
    <button class="close-btn" @click="closeExpedition">Back</button>
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
    <p>{{ selectedExpedition.date_iso }}</p>
    <p v-if="selectedExpedition.experiment === '3D'">
      Length of the transect: {{ selectedExpedition.length }} m
    </p>
    <p v-if="selectedExpedition.experiment === '3D'">
      Average depth: {{ selectedExpedition.depth ?? 5 }} m
    </p>
    <div v-if="selectedExpedition.experiment === '3D'">
      <div v-if="sampleSet.length > 0">
        <BarChart3DMappingExpedition
          v-if="isValidSampleSet"
          :raw-data="sampleSet"
          height="400px"
          width="400px"
          :tooltip="true"
        />
      </div>
      <div v-else>No 3D Mapping data available</div>
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
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
// for now we hard code the data for Djibouti 3D Mapping
import Djibouti3DMapping from '@/assets/data/dji_3d_mapping_all_results.json';
import { useMapStore } from '@/stores/mapStore';
import BarChart3DMappingExpedition from '@/components/BarChart3DMappingExpedition.vue';
import { storeToRefs } from 'pinia';
import communities from '@/assets/communities';

const headerMap = {
  '3D': '3D Mapping',
  eDNA: 'eDNA',
  seascape_genomics: 'Seascape Genomics',
};

interface MappingData {
  id: number;
  sampling_site_name: string;
  event_id: string;
  year: number;
  date_iso: string;
  country: string;
  latitude_start: number;
  longitude_start: number;
  latitude_end: number;
  Substrate_coarse: string;
  mean: number;
}

const threedMappingByCountry: Record<string, MappingData[]> = {
  djibouti: Djibouti3DMapping as any,
};

const formatCoordinate = (decimal: number): string => {
  const absolute = Math.abs(decimal);
  const degrees = Math.floor(absolute);
  const minutes = (absolute - degrees) * 60;

  return `${degrees.toString().padStart(2, '0')}º${minutes.toFixed(3)}'`;
};

const mapStore = useMapStore();
const { selectedExpedition } = storeToRefs(mapStore);
const { closeExpedition } = mapStore;

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

const sampleSet = computed(() => {
  try {
    const eventID = selectedExpedition.value?.event_id;
    const sampleByIds =
      threedMappingByCountry[countryLower.value]?.filter(
        (d3Mapping) => d3Mapping.event_id === eventID
      ) || [];

    const result = sampleByIds.filter(
      (d3Mapping) => d3Mapping.date_iso === selectedExpedition.value?.date_iso
    );
    return result.map((x) => ({
      Substrate_coarse: String(x.Substrate_coarse),
      mean: Number(x.mean),
    }));
  } catch (error) {
    console.error('Error processing sample set:', error);
    return [];
  }
});

const isValidSampleSet = computed(() => {
  return sampleSet.value.every(
    (sample) =>
      typeof sample === 'object' &&
      sample !== null &&
      'Substrate_coarse' in sample &&
      'mean' in sample &&
      typeof sample.mean === 'number'
  );
});
</script>

<style scoped>
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

button {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
