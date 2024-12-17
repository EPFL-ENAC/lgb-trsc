<template>
  <div class="popup">
    <button class="close-btn" @click="closeDrawer">Close</button>
    <h3>{{ expedition.Event_ID }}</h3>
    <p>Date: {{ expedition.Date }}</p>
    <p>Time: {{ expedition.Time }}</p>
    <p>Site Name: {{ expedition.Site_Name }}</p>
    <p>Project Code: {{ expedition.Project_Code }}</p>
    <p>Project Name: {{ expedition.Project_Name }}</p>
    <p>Team Members: {{ expedition.Team_Members }}</p>
    <p>Latitude Start: {{ expedition.Latitude_Start }}</p>
    <p>Longitude Start: {{ expedition.Longitude_Start }}</p>
    <p>Comments: {{ expedition.Comments }}</p>
    <button @click="handleGoToExpedition" v-if="expedition.enabled">Go to {{ expedition.Site_Name }}</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  expedition: {
    type: Object,
    required: true
  },
  closeDrawer: {
    type: Function,
    required: true
  },
  zoomToExpedition: {
    type: Function,
    required: true
  }
});


const handleGoToExpedition = () => {
  props.zoomToExpedition();
};
</script>

<style scoped>
.popup {
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
