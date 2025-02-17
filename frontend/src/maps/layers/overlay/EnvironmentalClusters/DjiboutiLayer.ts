import { BaseLayerOptions } from 'ol-layerswitcher';
import { environmentalClusterStyle } from '@/maps/styles/environmentalClusterLayerStyle';
import { computed, watch } from 'vue';
import { createPMTilesSource as createEnvironmentalClusterSource } from '@/maps/sources/DjiboutiEnvironmentalClustersSource';
import { useMapStore } from '@/stores/mapStore';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import VectorTileLayer from 'ol/layer/VectorTile';

const LayerTitle = 'Reef clusters';

export const createDjiboutiEnvironmentalClusterLayer = () => {
  const mapStore = useMapStore();
  const layer = new VectorTileLayer({
    declutter: true,
    _pmtiles: true,
    source: createEnvironmentalClusterSource(),
    title: LayerTitle,
    visible: false,
    base: false,
    renderMode: 'vector',
    updateWhileAnimating: true,
    updateWhileInteracting: true,
  } as BaseLayerOptions);

  // Create a computed style function that will react to store changes
  const computedStyle = computed(() => {
    return (feature: Feature<Geometry>, resolution: number) =>
      environmentalClusterStyle(
        feature,
        mapStore.selectedEnvironmentalClusterClassName,
        resolution
      );
  });

  watch(
    () => mapStore.selectedEnvironmentalClusterClassName,
    () => {
      // Set up watcher for style changes
      layer.setStyle((feature, resolution) =>
        computedStyle.value(feature, resolution)
      );
      layer.changed();
    },
    { immediate: true }
  );
  // Watch for changes in visibleClasses and trigger a redraw
  watch(
    () => mapStore.visibleClasses,
    () => {
      layer.changed();
      layer.getSource()?.changed();
    },
    { deep: true }
  );

  return layer;
};
