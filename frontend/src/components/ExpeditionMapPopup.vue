<template>
  <div class="popup">
    <button class="close-btn" @click="closeDrawer">Back</button>
        <h3>{{ expedition.region_name }} - {{ expedition.event_id }}</h3>
        <p>{{ expedition.reef_area }} - {{ expedition.sampling_site_name}}</p>
        <p>Position: 
            <span v-if="expedition.latitude_start">
              N {{ formatCoordinate(expedition.latitude_start, 'N') }} 
              E {{ formatCoordinate(expedition.longitude_start, 'E') }}
            </span>
          </p>
          <p v-if="expedition.latitude_end">End Position: 
            N {{ formatCoordinate(expedition.latitude_end, 'N') }} 
            E {{ formatCoordinate(expedition.longitude_end, 'E') }}
          </p>
        <p>{{ expedition.date_iso }}</p>
        <div v-if="expedition.experiment === '3D'">
          display echart here
          {{ sampling_site_id }}
        </div>
    <button @click="handleGoToExpedition" v-if="expedition.enabled">Go to {{ expedition.Site_Name }}</button>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

const formatCoordinate = (decimal: number, direction: 'N' | 'E'): string => {
  const absolute = Math.abs(decimal);
  const degrees = Math.floor(absolute);
  const minutes = (absolute - degrees) * 60;
  
  return `${degrees.toString().padStart(2, '0')}º${minutes.toFixed(3)}'`;
};

const props = defineProps({
  expedition: {
    type: Object,
    required: true
  },
  closeDrawer: {
    type: Function,
    required: true
  }
});


const sampling_site_id = computed(() => {
  const country = props.expedition.country.toLowerCase().replaceAll(' ', '_');
  // "Maskali / Moucha" should convert to "maskali"
  const reef_area = props.expedition.reef_area.toLowerCase().split('/')[0].trim().replaceAll(' ', '_');
  const site_name = props.expedition.sampling_site_name.toLowerCase().replaceAll(' ', '_');
  return `${country}_${reef_area}_${site_name}`;
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
