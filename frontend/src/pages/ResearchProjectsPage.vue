<template>
  <div
    id="map"
    class="map"
    :style="{ '--drawer-width': drawer ? '500px' : '0px' }"
  ></div>
  <MapLegend />
  <MapTooltip :content="hoveredExpedition" :position="hoveredExpeditionPixel"/>
  <MapRightPanel />
</template>

<script setup lang="ts">
import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';

import { onMounted, onUnmounted, ref } from 'vue';
import { MapController } from '@/maps/MapController';
import { storeToRefs } from 'pinia';
import { useMapStore } from '@/stores/mapStore';
import MapLegend from '@/components/MapLegend.vue';
import MapRightPanel from '@/components/MapRightPanel.vue';
import MapTooltip from '@/components/MapTooltip.vue';
import { useMapController } from '@/maps/composables/useMapController';

const mapStore = useMapStore();

const mapController = ref<MapController | null>(null);

const { hoveredExpedition, hoveredExpeditionPixel, drawer } = storeToRefs(mapStore);

onMounted(() => {
  mapController.value = useMapController();
});

onUnmounted(() => {
  mapController.value?.destroy();
  mapController.value = null;
});
</script>

<style scoped lang="scss">
@import '@/css/app.scss';
@import '@/maps/css/control.css';

.map {
  width: calc(100vw - var(--drawer-width));
  /* height: 100vh minus header, minus footer, minus border footer*/
  height: calc(100vh - var(--header-height) - var(--footer-height) - 1px);
}
</style>
