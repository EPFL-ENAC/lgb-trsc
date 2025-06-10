<template>
    <div
      id="map"
      ref="mapElement"
      class="map"
    >
      <div id="info"></div>
      <div id="map-zoom-reset" class="ol-control ol-control-layer-icon">
        <q-tooltip>
          {{ leftMiniDrawer ? $t('Expand drawer') : $t('Collapse drawer') }}
        </q-tooltip>
        <button class="" type="button" @click="leftMiniDrawer = !leftMiniDrawer">
          <q-icon :name="leftMiniDrawer ? 'chevron_right' : 'chevron_left'" size="1.125rem" />
        </button>
      </div>
    </div>

</template>

<script setup lang="ts">
import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';
import 'src/css/app.scss'

import { onMounted, onUnmounted, ref, watch } from 'vue';
import { MapController } from 'maps/MapController';
import { storeToRefs } from 'pinia';
import { useMapStore } from 'stores/mapStore';
import {
  useMapController,
  destroyMapController,
} from 'maps/composables/useMapController';
import { destroyLayerController } from 'maps/composables/useLayerController';

const mapStore = useMapStore();
const mapElement = ref<HTMLElement | null>(null);
const mapWidth = ref(0);
const mapHeight = ref(0);
const mapController = ref<MapController | null>(null);

const { drawer, leftMiniDrawer } = storeToRefs(mapStore);
console.log('drawer', drawer.value);

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
  mapController.value?.destroy();
  mapController.value = null;

  destroyMapController();
  destroyLayerController();
  // we should probably reset the store country selection here also
  useMapStore().resetAll();
});
</script>

<style scoped lang="scss">
@import 'src/css/app.scss';

.map-container {
  display: flex;
  flex-direction: row;
  position: relative;
  width: 100vw;
  height: calc(100vh - var(--header-height) - var(--footer-height));
  box-sizing: border-box;
}

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
