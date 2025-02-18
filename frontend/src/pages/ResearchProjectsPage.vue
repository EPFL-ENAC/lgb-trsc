<template>
  <div
    id="map"
    ref="mapElement"
    class="map"
    :style="{ '--drawer-width': drawer ? '500px' : '0px', '--left-drawer-width': '300px' }"
  >
    <div id="info"></div>
  </div>
  <!-- <MapLegend :isAbsolute="true" /> -->
  <MapTooltip 
    :content="hoveredExpedition" 
    :position="hoveredExpeditionPixel"
    :mapWidth="mapWidth"
    :mapHeight="mapHeight"
  />
  <MapLeftPanel />
  <MapRightPanel />
</template>

<script setup lang="ts">
import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';

import { onMounted, onUnmounted, ref, watch } from 'vue';
import { MapController } from '@/maps/MapController';
import { storeToRefs } from 'pinia';
import { useMapStore } from '@/stores/mapStore';
import MapLegend from '@/components/MapLegend.vue';
import MapRightPanel from '@/components/MapRightPanel.vue';
import MapTooltip from '@/components/MapTooltip.vue';
import { useMapController } from '@/maps/composables/useMapController';
import MapLeftPanel from '@/components/MapLeftPanel.vue';

const mapStore = useMapStore();
const mapElement = ref<HTMLElement | null>(null);
const mapWidth = ref(0);
const mapHeight = ref(0);
const mapController = ref<MapController | null>(null);

const { hoveredExpedition, hoveredExpeditionPixel, drawer } = storeToRefs(mapStore);

// Update dimensions when drawer changes
watch(drawer, () => {
  updateMapDimensions();
});

const updateMapDimensions = () => {
  if (mapElement.value) {
    mapWidth.value = mapElement.value.clientWidth;
    mapHeight.value = mapElement.value.clientHeight;
  }
};

onMounted(() => {
  mapController.value = useMapController();
  const map = mapController.value?.getMap();
  map?.renderSync();
  updateMapDimensions();
  
  // Add resize observer to update dimensions when window resizes
  const resizeObserver = new ResizeObserver(updateMapDimensions);
  if (mapElement.value) {
    resizeObserver.observe(mapElement.value);
  }
});

onUnmounted(() => {
  mapController.value?.destroy()
  mapController.value = null;
});
</script>

<style scoped lang="scss">
@import '@/css/app.scss';
@import '@/maps/css/control.css';

.map {
  width: calc(100vw - var(--drawer-width) - var(--left-drawer-width));
  // margin-left: var(--left-drawer-width);
  /* height: 100vh minus header, minus footer, minus border footer*/
  height: calc(100vh - var(--header-height) - var(--footer-height) - 1px);
}
#info {
        position: absolute;
        display: inline-block;
        height: auto;
        width: auto;
        z-index: 100;
        background-color: #333;
        color: #fff;
        text-align: center;
        border-radius: 4px;
        padding: 5px;
        left: 50%;
        transform: translateX(3%);
        visibility: hidden;
        pointer-events: none;
      }
</style>
