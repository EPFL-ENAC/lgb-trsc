<template>
  <div class="popup">
    <button class="close-btn" @click="closeDrawer">Back</button>
        <!--
          title in h3 red {{ Region Name - Event Id}}
          {{ Reef Area }} -- {{ Sampling Site Name}}
          Position N E
          Date as Day Month Year {{  date_iso }}
        -->
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
        <!-- <p><strong>Comments:</strong> {{ expedition.comments }}</p>
        <p><strong>Date:</strong> {{ expedition.date_iso }}</p>
        <p><strong>Event ID:</strong> {{ expedition.event_id }}</p>
        <p><strong>Latitude <span v-if="expedition.latitude_end">Start</span>:</strong> {{ expedition.latitude_start }}</p>
        <p><strong>Longitude <span v-if="expedition.latitude_end">Start</span>:</strong> {{ expedition.longitude_start }}</p>
        <p v-if="expedition.latitude_end"><strong>Latitude End:</strong> {{ expedition.latitude_end }}</p>
        <p v-if="expedition.longitude_end"><strong>Longitude End:</strong> {{ expedition.longitude_end }}</p>
        <p><strong>Reef Area:</strong> {{ expedition.reef_area }}</p>
        <p><strong>Region Name:</strong> {{ expedition.region_name }}</p>
        <p><strong>Sampling Site Name:</strong> {{ expedition.sampling_site_name }}</p>
        <p><strong>Time:</strong> {{ expedition.time }}</p> -->
        <div v-if="expedition.experiment === '3D'">
          display echart here
        </div>
    <button @click="handleGoToExpedition" v-if="expedition.enabled">Go to {{ expedition.Site_Name }}</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

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
