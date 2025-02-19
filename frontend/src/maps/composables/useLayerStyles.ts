import { ref, computed } from 'vue';
import {
  samplingSiteByYearColorMap,
  samplingSiteByProjectColorMap,
  samplingSiteByHardCoralCoverColorMap,
  geomorphicColorMap,
  benthicColorMap,
  bathymetricColorMap,
  reefExtentColorMap,
  boundaryColorMap,
  marineProtectedAreaColorMap,
  environmentalClusterColorMap,
} from '@/maps/config/layerColors';
import { Style, Fill, Stroke, Circle as CircleStyle } from 'ol/style';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import { useMapStore } from '@/stores/mapStore';

// Create a singleton state for layer styles
const visibleClasses = ref<{ [key: string]: boolean }>({
  // Initialize Geomorphic classes
  ...Object.fromEntries(
    Object.keys(geomorphicColorMap.colorMap).map((key) => [key, true])
  ),
  // Initialize Benthic classes
  ...Object.fromEntries(
    Object.keys(benthicColorMap.colorMap).map((key) => [key, true])
  ),
  // Initialize Bathymetric classes
  ...Object.fromEntries(
    Object.keys(bathymetricColorMap.colorMap).map((key) => [key, true])
  ),
  // Initialize Reef Extent classes
  ...Object.fromEntries(
    Object.keys(reefExtentColorMap.colorMap).map((key) => [key, true])
  ),
  // Initialize Boundary classes
  ...Object.fromEntries(
    Object.keys(boundaryColorMap.colorMap).map((key) => [key, true])
  ),
  // Initialize Marine Protected Area classes
  ...Object.fromEntries(
    Object.keys(marineProtectedAreaColorMap.colorMap).map((key) => [key, true])
  ),
  // Initialize Environmental Clusters classes
  ...Object.fromEntries(
    Object.keys(environmentalClusterColorMap.colorMap).map((key) => [key, true])
  ),
  // Initialize Sampling Site classes
  ...Object.fromEntries(
    Object.keys(samplingSiteByYearColorMap.colorMap).map((key) => [key, true])
  ),
  ...Object.fromEntries(
    Object.keys(samplingSiteByProjectColorMap.colorMap).map((key) => [
      key,
      true,
    ])
  ),
  ...Object.fromEntries(
    Object.keys(samplingSiteByHardCoralCoverColorMap.colorMap).map((key) => [
      key,
      true,
    ])
  ),
});

export type dottedStroke = 'dotted' | 'default' | '3D' | 'selectedExpedition';

// Add this helper function at the top level of the file
const createCommonStyle = (
  colorMap: Record<string, string>,
  featureClass: string,
  dottedStroke = false,
  dottedStrokeType: dottedStroke = 'default'
) => {
  const dottedStyle = {
    dotted: new Stroke({
      color: colorMap[featureClass] || '#64c9c9',
      width: 2,
      lineDash: [2, 2],
    }),
    default: new Stroke({
      color: colorMap[featureClass] || 'rgba(0, 0, 0, 0.3)',
      width: 1,
    }),
    '3D': new Stroke({
      color: colorMap[featureClass] || 'blue',
      width: 4,
    }),
    'selectedExpedition': new Stroke({
      color: colorMap[featureClass] || 'red',
      width: 10,
    }),
  } as const;

  return new Style({
    fill: new Fill({
      color: colorMap[featureClass] || 'rgba(128, 128, 128, 0.5)',
    }),
    image: new CircleStyle({
      radius: dottedStrokeType === 'selectedExpedition' ? 10: 4,
      fill: new Fill({
        color: colorMap[featureClass] || 'blue',
      }),
      stroke: new Stroke({
        color: 'white',
        width: 1,
      }),
    }),
    stroke: dottedStroke ? dottedStyle[dottedStrokeType] : dottedStyle.default,
  });
};

export const createFeatureStyle = (
  feature: Feature<Geometry>,
  colorMap: Record<string, string>,
  dotted = false,
  featureName = 'class',
  dottedStrokeType: 'dotted' | 'default' | '3D'| 'selectedExpedition' = 'default',
  filter?: Record<string, string>
) => {
  const featureClass =
    feature.get(featureName) || (feature.get('name') as string);
  
  // Add this line to the top of the function
  const propertyName = Object.keys(filter || {})[0];
  if (feature.get(propertyName) !== filter?.[propertyName]) {
    return new Style({});
  }
  const { selectedExpedition } = useMapStore();
  if (selectedExpedition && feature.get('event_id') === selectedExpedition.event_id) {
    return createCommonStyle(colorMap, featureClass, dotted, 'selectedExpedition');
  }
  if (!visibleClasses.value[featureClass]) {
    return new Style({});
  }
  return createCommonStyle(colorMap, featureClass, dotted, dottedStrokeType);
};

export function useLayerStyles() {
  const setClassVisibility = (className: string, isVisible: boolean) => {
    visibleClasses.value[className] = isVisible;
  };

  const setAllClassesVisibility = (
    layerType: 'Geomorphic' | 'Benthic',
    isVisible: boolean
  ) => {
    const colorMap =
      {
        Geomorphic: geomorphicColorMap.colorMap,
        Benthic: benthicColorMap.colorMap,
        Bathymetric: bathymetricColorMap.colorMap,
        ReefExtent: reefExtentColorMap.colorMap,
        Boundary: boundaryColorMap.colorMap,
        MarineProtectedArea: marineProtectedAreaColorMap.colorMap,
        EnvironmentalClusters: environmentalClusterColorMap.colorMap,
      }[layerType] || {};

    Object.keys(colorMap).forEach((className) => {
      visibleClasses.value[className] = isVisible;
    });
  };

  const createGeomorphicStyle = (feature: Feature<Geometry>) =>
    createFeatureStyle(feature, geomorphicColorMap.colorMap);
  const createBenthicStyle = (feature: Feature<Geometry>) =>
    createFeatureStyle(feature, benthicColorMap.colorMap);
  // const createBathymetricStyle = (feature: Feature<Geometry>) => createFeatureStyle(feature, bathymetricColorMap);
  const createMarineProtectedStyle = (feature: Feature<Geometry>) =>
    createFeatureStyle(
      feature,
      marineProtectedAreaColorMap.colorMap,
      true,
      'class',
      'dotted'
    );
  const createBoundaryStyle = (feature: Feature<Geometry>) =>
    createFeatureStyle(
      feature,
      boundaryColorMap.colorMap,
      true,
      'class',
      'dotted'
    );
  const createReefExtentStyle = (feature: Feature<Geometry>) =>
    createFeatureStyle(feature, reefExtentColorMap.colorMap);

  const createEnvironmentalClustersStyle = (
    feature: Feature<Geometry>,
    className: string,
    resolution: number
  ) => {
    const featureClass: string =
      feature.get(className) || (feature.get('name') as string);

    const colorMap = environmentalClusterColorMap.colorMap as Record<
        string,
        string
      >;
      
    if (!visibleClasses.value[featureClass]) {
      return new Style({});
    }

    const radius = Math.max(6, Math.pow(resolution, 0.45) / 2);
    return new Style({
      image: new CircleStyle({
        radius: radius,
        fill: new Fill({
          color: colorMap[featureClass] || 'blue',
        }),
      }),
    });
  };

  return {
    visibleClasses: computed(() => visibleClasses.value),
    setClassVisibility,
    setAllClassesVisibility,
    createGeomorphicStyle,
    createBenthicStyle,
    // createBathymetricStyle,
    createMarineProtectedStyle,
    createEnvironmentalClustersStyle,
    createBoundaryStyle,
    createReefExtentStyle,
  };
}
