import { ref, computed } from 'vue';
import { geomorphicColorMap, benthicColorMap, bathymetricColorMap, reefExtentColorMap, boundaryColorMap, marineProtectedAreaColorMap } from '@/maps/config/layerColors';
import { Style, Fill, Stroke } from 'ol/style';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import { map } from 'lodash';
import { useMapController } from './useMapController';

// Create a singleton state for layer styles
const visibleClasses = ref<{ [key: string]: boolean }>({
  // Initialize Geomorphic classes
  ...Object.fromEntries(Object.keys(geomorphicColorMap).map(key => [key, true])),
  // Initialize Benthic classes
  ...Object.fromEntries(Object.keys(benthicColorMap).map(key => [key, true])),
  // Initialize Bathymetric classes
  ...Object.fromEntries(Object.keys(bathymetricColorMap).map(key => [key, true])),
  // Initialize Reef Extent classes
  ...Object.fromEntries(Object.keys(reefExtentColorMap).map(key => [key, true])),
  // Initialize Boundary classes
  ...Object.fromEntries(Object.keys(boundaryColorMap).map(key => [key, true])),
  // Initialize Marine Protected Area classes
  ...Object.fromEntries(Object.keys(marineProtectedAreaColorMap).map(key => [key, true])),
});

// Add this helper function at the top level of the file
const createCommonStyle = (colorMap: Record<string, string>, featureClass: string, dottedStroke = false) => {
  return new Style({
    fill: new Fill({
      color: colorMap[featureClass] || 'rgba(128, 128, 128, 0.5)',
    }),
    stroke: new Stroke(
      dottedStroke 
        ? {
            color: '#64c9c9',
            width: 2,
            lineDash: [2, 2]
          }
        : {
            color: 'rgba(0, 0, 0, 0.3)',
            width: 1
          }
    )
  });
};

const createFeatureStyle = (feature: Feature<Geometry>, colorMap: Record<string, string>, dotted = false) => {
  const featureClass = feature.get('class') || feature.get('name') as string;
  if (!visibleClasses.value[featureClass]) {
    return new Style({});
  }
  return createCommonStyle(colorMap, featureClass, dotted);
};

export function useLayerStyles() {
  const setClassVisibility = (className: string, isVisible: boolean) => {
    visibleClasses.value[className] = isVisible;
    const mapController = useMapController();
    mapController?.refreshMap();
  };

  const setAllClassesVisibility = (layerType: 'Geomorphic' | 'Benthic', isVisible: boolean) => {
    const colorMap = {
      'Geomorphic': geomorphicColorMap,
      'Benthic': benthicColorMap,
      'Bathymetric': bathymetricColorMap,
      'ReefExtent': reefExtentColorMap,
      'Boundary': boundaryColorMap,
      'MarineProtectedArea': marineProtectedAreaColorMap
    }[layerType] || {};

    Object.keys(colorMap).forEach(className => {
      visibleClasses.value[className] = isVisible;
    });
  };

  const createGeomorphicStyle = (feature: Feature<Geometry>) => createFeatureStyle(feature, geomorphicColorMap);
  const createBenthicStyle = (feature: Feature<Geometry>) => createFeatureStyle(feature, benthicColorMap);
  // const createBathymetricStyle = (feature: Feature<Geometry>) => createFeatureStyle(feature, bathymetricColorMap);
  const createMarineProtectedStyle = (feature: Feature<Geometry>) => createFeatureStyle(feature, marineProtectedAreaColorMap, true);
  const createBoundaryStyle = (feature: Feature<Geometry>) => createFeatureStyle(feature, boundaryColorMap, true);
  const createReefExtentStyle = (feature: Feature<Geometry>) => createFeatureStyle(feature, reefExtentColorMap);

  return {
    visibleClasses: computed(() => visibleClasses.value),
    setClassVisibility,
    setAllClassesVisibility,
    createGeomorphicStyle,
    createBenthicStyle,
    // createBathymetricStyle,
    createMarineProtectedStyle,
    createBoundaryStyle,
    createReefExtentStyle,
  };
}