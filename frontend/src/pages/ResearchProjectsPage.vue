<template>
  <div id="map" class="map"></div>
</template>

<script setup lang="ts">
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { onMounted } from 'vue';

onMounted(() => {
  new Map({
    target: 'map',
    pixelRatio: 2, // Enable HiDPI support
    layers: [
      new TileLayer({
        source: new XYZ({
          // url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
        }),
      }),
    ],
    view: new View({
      center: [39.0, 21.5], // Coordinates for the Red Sea
      zoom: 5,
      projection: 'EPSG:4326',
    }),
  });
});
</script>

<style scoped>
.map {
  width: 100%;
  height: 100vh;
}
</style>
