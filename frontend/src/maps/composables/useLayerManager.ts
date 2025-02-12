import { ref, onMounted } from 'vue';
import { useMapStore } from '@/stores/mapStore';
import BaseLayer from 'ol/layer/Base';
import LayerGroup from 'ol/layer/Group';
import { useMapController } from './useMapController';

export interface LayerInfo {
  title: string;
  visible: boolean;
  layer: BaseLayer;
}

export interface LayerGroupInfo {
  title: string;
  layers: LayerInfo[];
}

export function useLayerManager() {
  const mapStore = useMapStore();
  const baseMaps = ref<LayerInfo[]>([]);
  const overlayGroups = ref<LayerGroupInfo[]>([]);

  const initializeLayers = () => {
    const controller = useMapController();
    if (!controller) return;

    // Initialize base maps
    baseMaps.value = controller.getBaseMaps().map((layer: BaseLayer) => ({
      title: layer.get('title') || 'Untitled',
      visible: layer.getVisible(),
      layer
    }));

    // Initialize overlay groups
    overlayGroups.value = controller.getOverlayMaps().map((group: LayerGroup) => {
      const layers = (group instanceof LayerGroup ? group.getLayers().getArray() : [group])
        .map((layer: BaseLayer) => ({
          title: layer.get('title') || 'Untitled',
          visible: layer.getVisible(),
          layer
        }));

      return {
        title: group.get('title') || 'Untitled',
        layers
      };
    });
  };

  const setBaseMapVisible = (layerTitle: string) => {
    const controller = useMapController();
    if (!controller) return;

    baseMaps.value.forEach((layerInfo, index) => {
      const visible = layerInfo.title === layerTitle;
      layerInfo.visible = visible;
      controller.setBaseMapVisible(index);
    });
  };

  const toggleOverlayLayer = (groupIndex: number, layerIndex: number, visible: boolean) => {
    const controller = useMapController();
    if (!controller) return;

    if (overlayGroups.value[groupIndex]?.layers[layerIndex]) {
      overlayGroups.value[groupIndex].layers[layerIndex].visible = visible;
      controller.setLayerVisibility(groupIndex, layerIndex, visible);
    }
  };

  onMounted(() => {
    initializeLayers();
  });

  return {
    baseMaps,
    overlayGroups,
    setBaseMapVisible,
    toggleOverlayLayer,
    initializeLayers
  };
}