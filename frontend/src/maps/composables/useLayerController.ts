import { ref } from 'vue';
import { LayerController } from '@/maps/LayerController';

const layerController = ref<LayerController | null>(null);

export function useLayerController() {
  if (!layerController.value) {
    layerController.value = new LayerController();
  }
  return layerController.value;
}

export function destroyLayerController() {
  if (layerController.value) {
    layerController.value.destroy();
    layerController.value = null;
  }
}
