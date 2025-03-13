import { BaseLayerOptions } from 'ol-layerswitcher';
import { geoMorphicStyle } from '@/maps/styles/geomorphicLayerStyle';
import { benthicStyle } from '@/maps/styles/benthicLayerStyle';
import { reefExtentStyle } from '@/maps/styles/reefExtentLayerStyle';
import { boundaryStyle } from '@/maps/styles/boundaryLayerStyle';
import { marineProtectedAreaStyle } from '@/maps/styles/marineProtectedAreaLayerStyle';
import VectorLayer from 'ol/layer/Vector';
import { computed, watch } from 'vue';
import { createPMTilesSource as createGeomorphicSource } from '@/maps/sources/DjiboutiGeomorphicSource';
import { createPMTilesSource as createBenthicSource } from '@/maps/sources/DjiboutiBenthicSource';
import { createPMTilesSource as createBoundarySource } from '@/maps/sources/DjiboutiBoundarySource';
import { createPMTilesSource as createReefExtentSource } from '@/maps/sources/DjiboutiReefExtentSource';
import { useMapStore } from '@/stores/mapStore';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import VectorTileLayer from 'ol/layer/VectorTile';
import { createPMTilesSource as createDjiboutiMarineProtectedAreaSource } from '@/maps/sources/DjiboutiMarineProtectedAreaSource';

const LayerTitle = 'Geomorphic';

export const createDjiboutiGeomorphicLayer = () => {
  const mapStore = useMapStore();
  const layer = new VectorTileLayer({
    declutter: true,
    _pmtiles: true,
    source: createGeomorphicSource(),
    title: LayerTitle,
    visible: false,
    base: false,
    renderMode: 'vector',
    updateWhileAnimating: true,
    updateWhileInteracting: true,
  } as BaseLayerOptions);

  // Create a computed style function that will react to store changes
  const computedStyle = computed(() => {
    return (feature: Feature<Geometry>) => geoMorphicStyle(feature);
  });

  // Set up watcher for style changes
  layer.setStyle((feature) =>
    computedStyle.value(feature as Feature<Geometry>)
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

export const createDjiboutiBenthicLayer = () => {
  const mapStore = useMapStore();
  const layer = new VectorTileLayer({
    declutter: true,
    _pmtiles: true,
    source: createBenthicSource(),
    title: 'Benthic',
    visible: false,
    base: false,
    renderMode: 'vector',
    updateWhileAnimating: true,
    updateWhileInteracting: true,
  } as BaseLayerOptions);

  // Create a computed style function that will react to store changes
  const computedStyle = computed(() => {
    return (feature: Feature<Geometry>) => benthicStyle(feature);
  });

  // Set up watcher for style changes
  layer.setStyle((feature) =>
    computedStyle.value(feature as Feature<Geometry>)
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

// export const createDjiboutiMarineProtectedAreaLayer = () =>
//   new VectorLayer({
//     declutter: true,
//     _pmtiles: true,
//     source: createDjiboutiMarineProtectedAreaSource(),
//     title: 'Protected Area',
//     visible: true,
//     base: false,
//     style: marineProtectedAreaStyle,
//   } as BaseLayerOptions);

export const createDjiboutiMarineProtectedAreaLayer = () => {
  const mapStore = useMapStore();
  const layer = new VectorLayer({
    declutter: true,
    _pmtiles: true,
    source: createDjiboutiMarineProtectedAreaSource(),
    title: 'Protected Area',
    visible: false,
    base: false,
    renderMode: 'vector',
    updateWhileAnimating: true,
    updateWhileInteracting: true,
  } as BaseLayerOptions);

  // Create a computed style function that will react to store changes
  const computedStyle = computed(() => {
    return (feature: Feature<Geometry>) => marineProtectedAreaStyle(feature);
  });

  // Set up watcher for style changes
  layer.setStyle((feature) =>
    computedStyle.value(feature as Feature<Geometry>)
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

export const createDjiboutiBoundaryLayer = () =>
  new VectorLayer({
    declutter: true,
    _pmtiles: true,
    source: createBoundarySource(),
    title: 'Boundary',
    visible: false,
    base: false,
    style: boundaryStyle,
  } as BaseLayerOptions);

// export const createDjiboutiReefExtentLayer = () =>
//   new VectorTileLayer({
//     declutter: true,
//     _pmtiles: true,
//     source: createReefExtentSource(),
//     title: 'Reef Extent',
//     visible: false,
//     base: false,
//     style: reefExtentStyle,
//   } as BaseLayerOptions);

export const createDjiboutiReefExtentLayer = () => {
  const mapStore = useMapStore();
  const layer = new VectorTileLayer({
    declutter: true,
    _pmtiles: true,
    source: createReefExtentSource(),
    title: 'Reef Extent',
    visible: false,
    base: false,
    renderMode: 'vector',
    updateWhileAnimating: true,
    updateWhileInteracting: true,
  } as BaseLayerOptions);

  // Create a computed style function that will react to store changes
  const computedStyle = computed(() => {
    return (feature: Feature<Geometry>) => reefExtentStyle(feature);
  });

  // Set up watcher for style changes
  layer.setStyle((feature) =>
    computedStyle.value(feature as Feature<Geometry>)
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
