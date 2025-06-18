import { ref } from 'vue';
import { MapController } from 'maps/MapController';

const mapController = ref<MapController | null>(null);

export function useMapController() {
  if (!mapController.value || !mapController.value.getMap()) {
    mapController.value = new MapController('map');
    // Initialize asynchronously - the map will work but environmental layers will load when ready
    mapController.value.init().catch(error => {
      console.error('Failed to initialize map controller:', error);
    });
  }
  return mapController.value;
}

export function destroyMapController() {
  if (mapController.value) {
    mapController.value.destroy();
    mapController.value = null;
  }
}
