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
    <div class="images">
      <div class="card">
        <img src="/3d-mapping.png" alt="3D Mapping">
        <p>3D Mapping</p>
      </div>
      <div class="card">
        <img src="/eDNA.png" alt="eDNA">
        <p>eDNA</p>
      </div>
      <div class="card">
        <img src="/seacape-genomics.png" alt="Seascape Genomics">
        <p>Seascape Genomics</p>
      </div>
    </div>
    <button @click="handleGoToCountry" v-if="country.enabled">Go to {{ country.name }}</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  country: {
    type: Object,
    required: true
  },
  closeDrawer: {
    type: Function,
    required: true
  },
  zoomToCountry: {
    type: Function,
    required: true
  }
});

const handleGoToCountry = () => {
  props.zoomToCountry();
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

.close-btn {
  background-color: #ff0000;
  color: white;
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
    grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
    gap: 1rem;
    width: 100%;
}

.card {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    border: 1px solid #ccc; /* Optional styling */
    overflow: hidden; /* To avoid overflow issues */
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
