import { ref } from 'vue';
import { MapController } from '@/maps/MapController';

const mapController = ref<MapController | null>(null);

export function useMapController() {
  if (!mapController.value || !mapController.value.getMap()) {
    mapController.value = new MapController('map');
    mapController.value.init();
  }
  return mapController.value;
}
