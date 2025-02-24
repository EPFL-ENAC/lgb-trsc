<template>
  <div class="popup">
    <button class="close-btn" @click="closeDrawer">Back</button>
    <h3 class="country-name">{{ country.name }}</h3>
    <div class="country-info">
      <p><strong>Date of past visits:</strong> {{ country.visited }}</p>
      <p><strong>Ongoing projects:</strong> {{ country.projects }}</p>
      <p><strong>Number of sites visited:</strong> {{ country.sites }}</p>
      <p>
        <strong>Number of permanent monitoring sites:</strong>
        {{ country.monitoring }}
      </p>
      <p v-if="country.training">
        <strong>Number of training workshop completed:</strong>
        {{ country.training }}
      </p>
      <p><strong>Local collaborators:</strong> {{ country.collaboration }}</p>
      <p v-if="country.contact">
        <strong>Contact persons:</strong> {{ country.contact }}
      </p>
    </div>
    <q-dialog
      v-model="showZoomedChart"
      persistent
      :maximized="false"
      class="popup"
    >
      <q-card
        style="width: 80vw; max-width: 1200px; height: 80vh; max-height: 800px"
      >
        <q-card-section class="q-pa-md row items-center justify-between">
          <h4 class="q-pa-sm q-ma-sm">3D Mapping</h4>
          <div class="right-actions">
            <q-toggle
              v-model="substrateLevel"
              trueValue="Substrate_coarse"
              falseValue="Substrate_intermediate"
              :label="substrateLevel"
            ></q-toggle>
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
          :style="{ margin: '0 auto' }"
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
        <BarChart3DMapping
          :rawData="country.rawData"
          :tooltip="false"
          width="90%"
        />
        <p>3D Mapping</p>
      </div>
      <div class="card">
        <p>eDNA</p>
        <img src="/eDNA.png" alt="eDNA" />
        <!-- <p><i>Coming soon</i></p> -->
      </div>
      <div class="card">
        <!-- <img src="/seacape-genomics.png" alt="Seascape Genomics" /> -->
        <p>Seascape Genomics</p>
        <p><i>Coming soon</i></p>
      </div>
      <div class="card">
        <!-- <img src="/seacape-genomics.png" alt="Seascape Genomics" /> -->
        <p>In Collaboration with</p>
        <div style="display: flex; gap: 1rem">
          <div
            class="logo-item"
            v-for="community in computedCountryCommunities"
            :key="community.name"
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
import { defineProps, ref, computed } from 'vue';
import BarChart3DMapping from './BarChart3DMapping.vue';
import communities from '@/assets/communities';

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

const computedCountryCommunities = computed(() => {
  return communities.filter(
    (community) => community.country === props.country.name
  );
});
const substrateLevel = ref('Substrate_coarse');

let showZoomedChart = ref(false);
const toggle3DZoomedChart = () => {
  showZoomedChart.value = !showZoomedChart.value;
};
</script>

<style scoped>
.country-name {
  margin: 0px;
}
.popup {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: left;
  position: relative;
}

.right-actions {
  display: flex;
  width: 206px;
  justify-content: space-between;
  align-self: center;
  flex-direction: column;
  margin-right: 60px;
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

.country-info {
  width: 100%;
  text-align: left;
  margin: 1rem 0;
}

.country-info p {
  margin: 0.5rem 0;
}

.country-info strong {
  font-weight: bold;
}
</style>
