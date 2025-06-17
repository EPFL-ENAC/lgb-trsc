import { ref, onMounted, onUnmounted } from 'vue';
import BaseLayer from 'ol/layer/Base';
import LayerGroup from 'ol/layer/Group';
import { useMapController } from './useMapController';
import { BaseLayerOptions } from 'ol-layerswitcher';

export interface LayerInfo {
  title: string;
  showInLayerSwitcher?: boolean;
  layer: BaseLayer;
}

export interface CustomGroupLayerOptions extends LayerGroup {
  inputType?: 'base' | 'checkbox' | 'radio';
  showForcountryOnly?: boolean;
}

export interface LayerGroupInfo {
  title: string;
  inputType?: 'radio' | 'checkbox';
  showInLayerSwitcher?: boolean;
  visible: boolean;
  layers: LayerInfo[];
  group: CustomGroupLayerOptions;
}

export function useLayerManager() {
  const baseMaps = ref<LayerInfo[]>([]);
  const overlayGroups = ref<LayerGroupInfo[]>([]);

  const getOverlayMaps = (): never[] | BaseLayer[] => {
    const controller = useMapController();
    if (!controller) {
      console.error(
        'MapController is not available. Unable to initialize layers.'
      );
      return [];
    }
    return controller.getOverlayMaps();
  };

  const initializeLayers = () => {
    const controller = useMapController();
    if (!controller) {
      console.error(
        'MapController is not available. Unable to initialize layers.'
      );
      return;
    }

    // Initialize base maps
    baseMaps.value = controller.getBaseMaps().map((layer: BaseLayer) => ({
      title: layer.get('title') || 'Untitled',
      showInLayerSwitcher: layer.get('showInLayerSwitcher'),
      layer,
    }));

    // Initialize overlay groups
    overlayGroups.value = controller
      .getOverlayMaps()
      .filter((baseLayer: BaseLayer) => {
        const value = baseLayer.getProperties();
        return value.showInLayerSwitcher === undefined;
      })
      .map((baseLayer: BaseLayer) => {
        const group = baseLayer as LayerGroup;
        const layers = (
          group instanceof LayerGroup ? group.getLayers().getArray() : [group]
        )
          .map((layer: BaseLayer) => ({
            title: layer.get('title') || 'Untitled',
            inputType: layer.get('inputType'),
            visible: layer.getVisible(),
            showInLayerSwitcher: layer.get('showInLayerSwitcher'),
            layer,
          }))
          .filter((layer: LayerInfo) => {
            return layer.showInLayerSwitcher !== false;
          });

        return {
          title: group.get('title') || 'Untitled',
          inputType: group.get('inputType'),
          showInLayerSwitcher: group.get('showInLayerSwitcher'),
          visible: group.getVisible(),
          layers,
          group,
        };
      });
  };

  const setBaseMapVisible = (layerTitle: string) => {
    const controller = useMapController();
    if (!controller) {
      console.error(
        'MapController is not available. Unable to initialize layers.'
      );
      return;
    }

    baseMaps.value.forEach((layerInfo) => {
      const visible = layerInfo.title === layerTitle;
      layerInfo.layer.setVisible(visible);
    });
  };

  const toggleOverlayGroup = (groupIndex: number, visible: boolean) => {
    const controller = useMapController();
    if (!controller) {
      console.error(
        'MapController is not available. Unable to initialize layers.'
      );
      return;
    }
    const group = overlayGroups.value[groupIndex];
    if (group) {
      group.group.setVisible(visible);
      group.layers.forEach((layerInfo) => {
        layerInfo.layer.setVisible(visible);
      });
    }
  };
  const toggleOverlayGroupVisibility = (groupIndex: number) => {
    const controller = useMapController();
    if (!controller) {
      console.error(
        'MapController is not available. Unable to initialize layers.'
      );
      return;
    }
    const overlayGroup = overlayGroups.value[groupIndex];
    if (overlayGroup) {
      const currentVisibility = overlayGroup.group.getVisible();
      overlayGroup.group.setVisible(!currentVisibility);
      overlayGroup.layers.forEach((layerInfo, index) => {
        if (index === 0 && overlayGroup.inputType === 'radio') {
          // If the group is a radio group, we want to toggle only the first layer
          // and not the group itself
          // This is a workaround for the radio group behavior
          // where the first layer is always visible
          // and the group visibility is not toggled
          // Skip the first layer
          layerInfo.layer.setVisible(!currentVisibility);
          return;
        } else if (overlayGroup.inputType === 'radio') {
          // If the group is a radio group, we want to toggle only the selected layer
          // and not the group itself
          // This is a workaround for the radio group behavior
          // where the first layer is always visible
          // and the group visibility is not toggled
          // Skip the first layer
          layerInfo.layer.setVisible(false);
        }
        if (overlayGroup.inputType === 'checkbox') {
          // If the group is a checkbox group, we want to toggle all layers
          layerInfo.layer.setVisible(!currentVisibility);
        }
      });
    }
  };

  const toggleOverlayLayer = (
    groupIndex: number,
    layerIndex: number,
    visible: boolean
  ) => {
    const controller = useMapController();
    if (!controller) {
      console.error(
        'MapController is not available. Unable to initialize layers.'
      );
      return;
    }

    if (overlayGroups.value[groupIndex]?.layers[layerIndex]) {
      (
        overlayGroups.value[groupIndex].layers[layerIndex] as BaseLayerOptions
      ).visible = visible;
      controller.setLayerVisibility(groupIndex, layerIndex, visible);
    }
  };

  const setOverlayLayerRadio = (groupIndex: number, layerIndex: number) => {
    const controller = useMapController();
    if (!controller) {
      console.error(
        'MapController is not available. Unable to initialize layers.'
      );
      return;
    }

    const group = overlayGroups.value[groupIndex];
    if (group) {
      // Set all layers in the group to invisible except the selected one
      group.layers.forEach((layerInfo, idx) => {
        const visible = idx === layerIndex;
        layerInfo.layer.setVisible(visible);
      });
    }
  };
  onMounted(() => {
    initializeLayers();
  });

  onUnmounted(() => {
    baseMaps.value = [];
    overlayGroups.value = [];
  });

  return {
    baseMaps,
    overlayGroups,
    setBaseMapVisible,
    toggleOverlayLayer,
    toggleOverlayGroup,
    toggleOverlayGroupVisibility,
    getOverlayMaps,
    setOverlayLayerRadio,
    initializeLayers,
    refreshLayers: initializeLayers, // Alias for refreshing layers
  };
}
