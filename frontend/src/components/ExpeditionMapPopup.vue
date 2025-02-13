<template>
  <div class="popup">
    <button class="close-btn" @click="closeExpedition">Back</button>
    <h3>{{ selectedExpedition.region_name }} - {{ selectedExpedition.event_id }}</h3>
    <p>{{ selectedExpedition.reef_area }} - {{ selectedExpedition.sampling_site_name }}</p>
    <p>
      Position:
      <span v-if="selectedExpedition.latitude_start">
        N {{ formatCoordinate(selectedExpedition.latitude_start, 'N') }} E
        {{ formatCoordinate(selectedExpedition.longitude_start, 'E') }}
      </span>
    </p>
    <p v-if="selectedExpedition.latitude_end">
      End Position: N {{ formatCoordinate(selectedExpedition.latitude_end, 'N') }} E
      {{ formatCoordinate(selectedExpedition.longitude_end, 'E') }}
    </p>
    <p>{{ selectedExpedition.date_iso }}</p>
    <p>experiment: {{ selectedExpedition.experiment }}</p>
    <div v-if="selectedExpedition.experiment === '3D'">
      <div v-if="sampleSet.length > 0">
        <BarChart3DMappingExpedition
          v-if="isValidSampleSet"
          :rawData="sampleSet"
          height="400px"
          width="400px"
          :tooltip="true"
        />
      </div>
      <div v-else>No 3D Mapping data available</div>
    </div>
    <button @click="handleGoToExpedition" v-if="selectedExpedition.enabled">
      Go to {{ selectedExpedition.Site_Name }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
// for now we hard code the data for Djibouti 3D Mapping
import Djibouti3DMapping from '@/assets/data/dji_3d_mapping_all_results.json';
import { useMapStore } from '@/stores/mapStore';
import BarChart3DMappingExpedition from '@/components/BarChart3DMappingExpedition.vue';
import { storeToRefs } from 'pinia';

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
  Substrate_1: string;
  mean: number;
}

interface D3Mapping {
  sampling_site_name: string;
  event_id: string;
  [key: string]: unknown;
}

const threedMappingByCountry: Record<string, MappingData[]> = {
  djibouti: Djibouti3DMapping as any,
};

const formatCoordinate = (decimal: number, direction: 'N' | 'E'): string => {
  const absolute = Math.abs(decimal);
  const degrees = Math.floor(absolute);
  const minutes = (absolute - degrees) * 60;

  return `${degrees.toString().padStart(2, '0')}º${minutes.toFixed(3)}'`;
};

const mapStore = useMapStore();
const { selectedCountry, selectedExpedition, drawer } = storeToRefs(mapStore);
const { closeDrawer, closeExpedition } =
  mapStore;

const countryLower = computed(() =>
  selectedExpedition.value.country.toLowerCase().replaceAll(' ', '_')
);

// const sampling_site_id = computed(() => {
//   const country = selectedExpedition.value.country.toLowerCase().replaceAll(' ', '_');
//   // "Maskali / Moucha" should convert to "maskali"
//   const reef_area = selectedExpedition.value.reef_area
//     .toLowerCase()
//     .split('/')[0]
//     .trim()
//     .replaceAll(' ', '_');
//   const site_name = selectedExpedition.value.sampling_site_name
//     .toLowerCase()
//     .replaceAll(' ', '_');
//   return `${country}_${reef_area}_${site_name}`;
// });

const sampleSet = computed(() => {
  try {
    const eventID = selectedExpedition.value.event_id;
    const sampleByIds = threedMappingByCountry[countryLower.value]?.filter(
      (d3Mapping) => d3Mapping.event_id === eventID
    ) || [];
    
    const result = sampleByIds.filter((d3Mapping) => 
      d3Mapping.date_iso === selectedExpedition.value.date_iso
    );
    return result.map(x => ({
      Substrate_1: String(x.Substrate_1),
      mean: Number(x.mean)
    }));
  } catch (error) {
    console.error('Error processing sample set:', error);
    return [];
  }
});

const isValidSampleSet = computed(() => {
  return sampleSet.value.every(sample => 
    typeof sample === 'object' &&
    sample !== null &&
    'Substrate_1' in sample &&
    'mean' in sample &&
    typeof sample.mean === 'number'
  );
});

const handleGoToExpedition = () => {
  // props.zoomToExpedition();
};
</script>

<style scoped>
h3 {
  color: red;
  font-size: 1.5rem;
  margin-bottom: 0.2rem;
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
