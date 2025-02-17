<template>
  <div class="popup">
    <button class="close-btn" @click="closeDrawer">Back</button>
    <h3>{{ country.name }}</h3>
    <p>{{ country.description }}</p>
    <p>{{ country.visited }}</p>
    <p>{{ country.projects }}</p>
    <p>{{ country.lead }}</p>
    <p>{{ country.collaboration }}</p>
    <p>{{ country.sites }}</p>
    <p>{{ country.samples }}</p>
    <p>{{ country.divers }}</p>
    <p>{{ country.monitoring }}</p>
    <q-dialog
      v-model="showZoomedChart"
      persistent
      :maximized="false"
        
      class="popup"
    >
      <q-card style="width: 80vw; max-width: 1200px; height: 80vh; max-height: 800px;">
        <q-card-section class="q-pa-md row items-center justify-between">
          <h4 class="q-pa-sm q-ma-sm">3D Mapping</h4>
          <div class="right-actions">

            <q-toggle v-model="substrateLevel"
              trueValue="Substrate_coarse"
              falseValue="Substrate_intermediate"
              :label="substrateLevel"></q-toggle>
            <q-btn
              icon="close"
              class="close-btn"
              flat
              round
              dense
              v-close-popup
            />
          </div>
        </q-card-section>
        <BarChart3DMapping
          :rawData="country.rawData"
          :style="{ margin: '0 auto'}"
          height="76%"
          width="90%"
          :tooltip="true"
          :substrateLevel="substrateLevel"
        />

        <q-card-actions align="right">
          <q-btn
            label="View on Map"
            color="white"
            flat
            @click="toggle3DZoomedChart"
          />
          </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="images">
      <div class="card" @click="toggle3DZoomedChart">
        <BarChart3DMapping :rawData="country.rawData" :tooltip="false" width="90%"/>
        <p>3D Mapping</p>
      </div>
      <div class="card">
        <!-- <img src="/eDNA.png" alt="eDNA" /> -->
        <p>eDNA</p>
        <p><i>Coming soon</i></p>
      </div>
      <div class="card">
        <!-- <img src="/seacape-genomics.png" alt="Seascape Genomics" /> -->
        <p>Seascape Genomics</p>
        <p><i>Coming soon</i></p>
      </div>
    </div>
    <button @click="handleGoToCountry" v-if="country.enabled">
      Go to {{ country.name }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import BarChart3DMapping from './BarChart3DMapping.vue';
import { useMapController } from '@/maps/composables/useMapController';

const props = defineProps({
  country: {
    type: Object,
    required: true,
  },
  closeDrawer: {
    type: Function,
    required: true,
  },
});

const substrateLevel = ref('Substrate_coarse');

const handleGoToCountry = () => {
  // props.zoomToCountry();
  // closeDrawer();
  const mapController = useMapController();
  mapController.zoomToCountry();
};

let showZoomedChart = ref(false);
// toggle3DZoomedChart
const toggle3DZoomedChart = () => {
  showZoomedChart.value = !showZoomedChart.value;
};
</script>

<style scoped>
.popup {
  /* background: red;
  padding: 10px;
  border: 1px solid red;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  min-width: 400px;
  max-width: 400px; */
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.right-actions {
  display: flex;
  width: 206px;
  justify-content: space-between;
  align-self: center;
  flex-direction: column;
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

.images {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: repeat(auto-fit, minmax(50px, 1fr));
  gap: 1rem;
  width: 100%;
}

:deep(.card) {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border: 1px solid #ccc; /* Optional styling */
  overflow: hidden; /* To avoid overflow issues */
  /* height: 80vh; */
  width: 100%;
}

.card img {
  width: 100%;
  height: auto; /* Maintains aspect ratio */
  flex: 1; /* Allows the image to grow and fill space */
}

.card p {
  margin: 0; /* Removes default margin */
  height: 50px; /* Set the footer height */
  line-height: 50px; /* Centers text vertically */
  text-align: center; /* Centers text horizontally */
  background-color: #f0f0f0; /* Optional background for distinction */
  flex-shrink: 0; /* Prevents shrinking of the footer */
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
