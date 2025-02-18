import { ref, onMounted } from 'vue';
import BaseLayer from 'ol/layer/Base';
import LayerGroup from 'ol/layer/Group';
import { useMapController } from './useMapController';

export interface LayerInfo {
  title: string;
  showInLayerSwitcher?: boolean;
  layer: BaseLayer;
}

export interface LayerGroupInfo {
  title: string;
  inputType?: 'radio' | 'checkbox';
  layers: LayerInfo[];
}

export function useLayerManager() {
  const baseMaps = ref<LayerInfo[]>([]);
  const overlayGroups = ref<LayerGroupInfo[]>([]);

  const initializeLayers = () => {
    const controller = useMapController();
    if (!controller) {
      console.error('MapController is not available. Unable to initialize layers.');
      return;
    }

    // Initialize base maps
    baseMaps.value = controller.getBaseMaps().map((layer: BaseLayer) => ({
      title: layer.get('title') || 'Untitled',
      showInLayerSwitcher: layer.get('showInLayerSwitcher'),
      layer
    }));

    // Initialize overlay groups
    overlayGroups.value = controller.getOverlayMaps().filter(
      (baseLayer: BaseLayer) => {
        const value = baseLayer.getProperties();
        return value.showInLayerSwitcher === undefined
      }
    ).map((baseLayer: BaseLayer) => {
      const group = baseLayer as LayerGroup;
      const layers = (group instanceof LayerGroup ? group.getLayers().getArray() : [group])
        .map((layer: BaseLayer) => ({
          title: layer.get('title') || 'Untitled',
          inputType: layer.get('inputType'),
          visible: layer.getVisible(),
          showInLayerSwitcher: layer.get('showInLayerSwitcher'),
          layer
        }))
        .filter((layer: LayerInfo) => {
          return layer.showInLayerSwitcher !== false
        });

      return {
        title: group.get('title') || 'Untitled',
        inputType: group.get('inputType'),
        showInLayerSwitcher: group.get('showInLayerSwitcher'),
        visible: group.getVisible(),
        layers
      };
    });
  };

  const setBaseMapVisible = (layerTitle: string) => {

    const controller = useMapController();
    if (!controller) {
      console.error('MapController is not available. Unable to initialize layers.');
      return;
    }

    baseMaps.value.forEach((layerInfo) => {
      const visible = layerInfo.title === layerTitle;
      layerInfo.layer.setVisible(visible);
    });

  };

  const toggleOverlayLayer = (groupIndex: number, layerIndex: number, visible: boolean) => {
    const controller = useMapController();
    if (!controller) {
      console.error('MapController is not available. Unable to initialize layers.');
      return;
    }

    if (overlayGroups.value[groupIndex]?.layers[layerIndex]) {
      overlayGroups.value[groupIndex].layers[layerIndex].visible = visible;
      controller.setLayerVisibility(groupIndex, layerIndex, visible);
    }
  };

  const setOverlayLayerRadio = (groupIndex: number, layerIndex: number) => {
    const controller = useMapController();
    if (!controller) {
      console.error('MapController is not available. Unable to initialize layers.');
      return;
    }

    const group = overlayGroups.value[groupIndex];
    if (group) {
      // Set all layers in the group to invisible except the selected one
      group.layers.forEach((layerInfo, idx) => {
        const visible = idx === layerIndex;
        layerInfo.visible = visible;
        controller.setLayerVisibility(groupIndex, idx, visible);
      });
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
    setOverlayLayerRadio,
    initializeLayers
  };
}