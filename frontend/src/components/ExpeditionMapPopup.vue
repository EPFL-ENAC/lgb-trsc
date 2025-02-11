<template>
  <div class="popup">
    <button class="close-btn" @click="closeDrawer">Back</button>
    <h3>{{ expedition.region_name }} - {{ expedition.event_id }}</h3>
    <p>{{ expedition.reef_area }} - {{ expedition.sampling_site_name }}</p>
    <p>
      Position:
      <span v-if="expedition.latitude_start">
        N {{ formatCoordinate(expedition.latitude_start, 'N') }} E
        {{ formatCoordinate(expedition.longitude_start, 'E') }}
      </span>
    </p>
    <p v-if="expedition.latitude_end">
      End Position: N {{ formatCoordinate(expedition.latitude_end, 'N') }} E
      {{ formatCoordinate(expedition.longitude_end, 'E') }}
    </p>
    <p>{{ expedition.date_iso }}</p>
    <div v-if="expedition.experiment === '3D'">
      <div v-if="sampleSet.length > 0">
        display echart here
        {{ sampling_site_id }}
        <br />
        {{ sampleSet.map((x) => x.ID_site) }}
      </div>
      <div v-else>No 3D Mapping data available</div>
    </div>
    <button @click="handleGoToExpedition" v-if="expedition.enabled">
      Go to {{ expedition.Site_Name }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
// for now we hard code the data for Djibouti 3D Mapping
import Djibouti3DMapping from '@/assets/data/dji_3d_mapping_all_results.json';

interface MappingData {
  id: number;
  Site: string;
  Site_name: string;
  ID_site: string;
  year: number;
  Date: string;
  date_iso: string;
  country: string;
  latitude_begin: number;
  longitude_begin: number;
  latitude_end: number;
  mean: number;
}

interface D3Mapping {
  Site_name: string;
  [key: string]: unknown;
}

const threedMappingByCountry: Record<string, MappingData[]> = {
  djibouti: Djibouti3DMapping,
};

const formatCoordinate = (decimal: number, direction: 'N' | 'E'): string => {
  const absolute = Math.abs(decimal);
  const degrees = Math.floor(absolute);
  const minutes = (absolute - degrees) * 60;

  return `${degrees.toString().padStart(2, '0')}º${minutes.toFixed(3)}'`;
};

const props = defineProps({
  expedition: {
    type: Object,
    required: true,
  },
  closeDrawer: {
    type: Function,
    required: true,
  },
});

const countryLower = computed(() =>
  props.expedition.country.toLowerCase().replaceAll(' ', '_')
);

const sampling_site_id = computed(() => {
  const country = props.expedition.country.toLowerCase().replaceAll(' ', '_');
  // "Maskali / Moucha" should convert to "maskali"
  const reef_area = props.expedition.reef_area
    .toLowerCase()
    .split('/')[0]
    .trim()
    .replaceAll(' ', '_');
  const site_name = props.expedition.sampling_site_name
    .toLowerCase()
    .replaceAll(' ', '_');
  return `${country}_${reef_area}_${site_name}`;
});

const sampleSet = computed(() => {
  const sampleByIds = threedMappingByCountry[countryLower.value].filter(
    (d3Mapping) => d3Mapping.Site_name === sampling_site_id.value
  );
  return sampleByIds.filter((d3Mapping) => {
    console.log(d3Mapping.date_iso, props.expedition.date_iso);
    return d3Mapping.date_iso == props.expedition.date_iso;
  });
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
